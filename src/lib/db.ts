import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { User, UserSettings, ChatRoom, ChatMessage, DirectMessage, UpcomingEvent, Poll, PollOption } from "@/types";

// Regex to validate standard UUID format
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Parse and validate database connection URL
function getSanitizedDbUrl(): string | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  // If user has asterisks or placeholder, it cannot open a live socket
  if (url.includes("***") || url.includes("YOUR_PASSWORD")) {
    return null;
  }
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

const dbUrl = getSanitizedDbUrl();

export const isDbConfigured = Boolean(dbUrl);

// Create the Neon serverless client if a valid URL is available
export const sql: NeonQueryFunction<false, false> | null = dbUrl ? neon(dbUrl) : null;

// ============================================================================
// 1. USER ACCOUNTS & PROFILES REPOSITORY
// ============================================================================
export const UserRepository = {
  async findById(id: string): Promise<User | null> {
    if (!sql) return null;
    try {
      const isUuid = UUID_REGEX.test(id);
      const rows = isUuid
        ? await sql`
            SELECT 
              u.id, 
              u.email_private,
              u.role, 
              u.status,
              p.username, 
              p.display_name, 
              p.avatar_url, 
              p.bio,
              p.age_confirmed,
              u.created_at
            FROM users u
            LEFT JOIN profiles p ON p.user_id = u.id
            WHERE u.id = ${id}
            LIMIT 1
          `
        : await sql`
            SELECT 
              u.id, 
              u.email_private,
              u.role, 
              u.status,
              p.username, 
              p.display_name, 
              p.avatar_url, 
              p.bio,
              p.age_confirmed,
              u.created_at
            FROM users u
            LEFT JOIN profiles p ON p.user_id = u.id
            WHERE u.auth_provider_id = ${id} OR LOWER(u.email_private) = LOWER(${id})
            LIMIT 1
          `;
      if (!rows || rows.length === 0) return null;
      const r = rows[0];
      return {
        id: r.id as string,
        email_private: (r.email_private as string) || "user@example.com",
        username: (r.username as string) || "user",
        display_name: (r.display_name as string) || "BBPulse User",
        avatar_url: (r.avatar_url as string) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        bio: (r.bio as string) || "",
        role: (r.role as User['role']) || "user",
        age_confirmed: Boolean(r.age_confirmed),
        joined_date: new Date(r.created_at as string).toISOString(),
        accuracy_rate: 85,
        predictions_count: 0,
        followed_contestants: [],
        blocked_users: []
      };
    } catch (err) {
      console.error("[NeonDB] UserRepository.findById error:", err);
      return null;
    }
  },

  async findByEmail(email: string): Promise<User | null> {
    if (!sql) return null;
    try {
      const cleanEmail = email.toLowerCase().trim();
      const rows = await sql`
        SELECT 
          u.id, 
          u.email_private,
          u.role, 
          u.status,
          p.username, 
          p.display_name, 
          p.avatar_url, 
          p.bio,
          p.age_confirmed,
          u.created_at
        FROM users u
        LEFT JOIN profiles p ON p.user_id = u.id
        WHERE LOWER(u.email_private) = ${cleanEmail}
        LIMIT 1
      `;
      if (!rows || rows.length === 0) return null;
      const r = rows[0];
      return {
        id: r.id as string,
        email_private: (r.email_private as string) || cleanEmail,
        username: (r.username as string) || "user",
        display_name: (r.display_name as string) || "BBPulse User",
        avatar_url: (r.avatar_url as string) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        bio: (r.bio as string) || "",
        role: (r.role as User['role']) || "user",
        age_confirmed: Boolean(r.age_confirmed),
        joined_date: new Date(r.created_at as string).toISOString(),
        accuracy_rate: 85,
        predictions_count: 0,
        followed_contestants: [],
        blocked_users: []
      };
    } catch (err) {
      console.error("[NeonDB] UserRepository.findByEmail error:", err);
      return null;
    }
  },

  async upsert(user: {
    auth_provider_id: string;
    email: string;
    username: string;
    display_name: string;
    avatar_url: string;
    role?: 'user' | 'moderator' | 'admin';
    bio?: string;
    age_confirmed?: boolean;
    favorite_contestant_id?: string;
  }): Promise<User | null> {
    if (!sql) return null;
    try {
      const cleanEmail = user.email.toLowerCase().trim();

      // 1. Check if user already exists by auth_provider_id or email
      const existing = await sql`
        SELECT id FROM users 
        WHERE auth_provider_id = ${user.auth_provider_id} OR LOWER(email_private) = ${cleanEmail}
        LIMIT 1
      `;

      let userId: string;
      let createdAt: string = new Date().toISOString();

      if (existing && existing.length > 0) {
        userId = existing[0].id as string;
        await sql`
          UPDATE users 
          SET 
            auth_provider_id = ${user.auth_provider_id},
            email_private = ${cleanEmail},
            role = COALESCE(${user.role}, role),
            updated_at = NOW()
          WHERE id = ${userId}
        `;
      } else {
        const userRows = await sql`
          INSERT INTO users (auth_provider_id, email_private, role, status)
          VALUES (${user.auth_provider_id}, ${cleanEmail}, ${user.role || 'user'}, 'active')
          RETURNING id, created_at
        `;
        userId = userRows[0].id as string;
        createdAt = userRows[0].created_at as string;
      }

      // 2. Upsert profiles table
      await sql`
        INSERT INTO profiles (user_id, username, display_name, avatar_url, bio, age_confirmed)
        VALUES (
          ${userId}, 
          ${user.username}, 
          ${user.display_name}, 
          ${user.avatar_url}, 
          ${user.bio || ''},
          ${user.age_confirmed ?? true}
        )
        ON CONFLICT (user_id) 
        DO UPDATE SET 
          username = EXCLUDED.username,
          display_name = EXCLUDED.display_name,
          avatar_url = EXCLUDED.avatar_url,
          bio = EXCLUDED.bio,
          age_confirmed = EXCLUDED.age_confirmed,
          updated_at = NOW()
      `;

      // 3. Ensure default settings row exists
      await sql`
        INSERT INTO user_settings (user_id)
        VALUES (${userId})
        ON CONFLICT (user_id) DO NOTHING
      `;

      return {
        id: userId,
        email_private: cleanEmail,
        username: user.username,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        bio: user.bio || "",
        role: user.role || "user",
        age_confirmed: true,
        joined_date: new Date(createdAt).toISOString(),
        accuracy_rate: 85,
        predictions_count: 0,
        followed_contestants: user.favorite_contestant_id ? [user.favorite_contestant_id] : [],
        blocked_users: []
      };
    } catch (err) {
      console.error("[NeonDB] UserRepository.upsert error:", err);
      return null;
    }
  }
};

// ============================================================================
// 2. USER SETTINGS REPOSITORY
// ============================================================================
export const UserSettingsRepository = {
  async getByUserId(userId: string): Promise<UserSettings | null> {
    if (!sql) return null;
    try {
      const rows = await sql`
        SELECT * FROM user_settings 
        WHERE user_id = ${userId}
        LIMIT 1
      `;
      if (!rows || rows.length === 0) return null;
      const r = rows[0];
      return {
        id: r.id as string,
        user_id: r.user_id as string,
        theme: r.theme as 'light' | 'dark' | 'system',
        email_notifications: Boolean(r.email_notifications),
        in_app_notifications: Boolean(r.in_app_notifications),
        poll_reminder: Boolean(r.poll_reminder),
        episode_reminder: Boolean(r.episode_reminder),
        show_predictions_publicly: Boolean(r.show_predictions_publicly),
        language: r.language as 'en' | 'te',
        created_at: r.created_at ? new Date(r.created_at as string).toISOString() : undefined,
        updated_at: r.updated_at ? new Date(r.updated_at as string).toISOString() : undefined
      };
    } catch (err) {
      console.error("[NeonDB] UserSettingsRepository.getByUserId error:", err);
      return null;
    }
  },

  async update(userId: string, settings: Partial<UserSettings>): Promise<boolean> {
    if (!sql) return false;
    try {
      await sql`
        INSERT INTO user_settings (
          user_id, 
          theme, 
          email_notifications, 
          in_app_notifications, 
          poll_reminder, 
          episode_reminder, 
          show_predictions_publicly, 
          language,
          updated_at
        ) VALUES (
          ${userId},
          ${settings.theme || 'system'},
          ${settings.email_notifications ?? true},
          ${settings.in_app_notifications ?? true},
          ${settings.poll_reminder ?? true},
          ${settings.episode_reminder ?? true},
          ${settings.show_predictions_publicly ?? true},
          ${settings.language || 'en'},
          NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          theme = COALESCE(${settings.theme}, user_settings.theme),
          email_notifications = COALESCE(${settings.email_notifications}, user_settings.email_notifications),
          in_app_notifications = COALESCE(${settings.in_app_notifications}, user_settings.in_app_notifications),
          poll_reminder = COALESCE(${settings.poll_reminder}, user_settings.poll_reminder),
          episode_reminder = COALESCE(${settings.episode_reminder}, user_settings.episode_reminder),
          show_predictions_publicly = COALESCE(${settings.show_predictions_publicly}, user_settings.show_predictions_publicly),
          language = COALESCE(${settings.language}, user_settings.language),
          updated_at = NOW()
      `;
      return true;
    } catch (err) {
      console.error("[NeonDB] UserSettingsRepository.update error:", err);
      return false;
    }
  }
};

// ============================================================================
// 3. CHAT ROOMS & LIVE MESSAGES REPOSITORY
// ============================================================================
export const ChatRepository = {
  async getRooms(): Promise<ChatRoom[]> {
    if (!sql) return [];
    try {
      const rows = await sql`
        SELECT 
          r.id, 
          r.name, 
          r.slug, 
          r.description, 
          r.room_type, 
          r.contestant_id, 
          r.is_active, 
          r.created_at,
          COUNT(m.id)::int as message_count
        FROM chat_rooms r
        LEFT JOIN chat_messages m ON m.room_id = r.id
        WHERE r.is_active = TRUE
        GROUP BY r.id
        ORDER BY r.created_at ASC
      `;
      return rows.map(r => ({
        id: r.id as string,
        name: r.name as string,
        slug: r.slug as string,
        description: (r.description as string) || "",
        room_type: r.room_type as 'live_episode' | 'general' | 'contestant' | 'debate',
        contestant_id: (r.contestant_id as string) || undefined,
        is_active: Boolean(r.is_active),
        created_at: new Date(r.created_at as string).toISOString(),
        member_count: Number(r.message_count) || 0
      }));
    } catch (err) {
      console.error("[NeonDB] ChatRepository.getRooms error:", err);
      return [];
    }
  },

  async getMessages(roomId: string, limit = 50): Promise<ChatMessage[]> {
    if (!sql) return [];
    try {
      const rows = await sql`
        SELECT 
          m.id, 
          m.room_id, 
          m.user_id, 
          m.message, 
          m.is_flagged, 
          m.created_at,
          p.username, 
          p.display_name, 
          p.avatar_url
        FROM chat_messages m
        JOIN profiles p ON p.user_id = m.user_id
        WHERE m.room_id = ${roomId} AND m.is_flagged = FALSE
        ORDER BY m.created_at ASC
        LIMIT ${limit}
      `;
      return rows.map(r => ({
        id: r.id as string,
        room_id: r.room_id as string,
        user_id: r.user_id as string,
        username: (r.username as string) || "fan",
        display_name: (r.display_name as string) || "BBPulse Fan",
        avatar_url: (r.avatar_url as string) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        message: r.message as string,
        is_flagged: Boolean(r.is_flagged),
        created_at: new Date(r.created_at as string).toISOString()
      }));
    } catch (err) {
      console.error("[NeonDB] ChatRepository.getMessages error:", err);
      return [];
    }
  },

  async postMessage(roomId: string, userId: string, message: string): Promise<ChatMessage | null> {
    if (!sql) return null;
    try {
      const rows = await sql`
        INSERT INTO chat_messages (room_id, user_id, message)
        VALUES (${roomId}, ${userId}, ${message})
        RETURNING id, room_id, user_id, message, is_flagged, created_at
      `;
      if (!rows || rows.length === 0) return null;
      const r = rows[0];

      // Fetch user profile info
      const profile = await sql`
        SELECT username, display_name, avatar_url FROM profiles WHERE user_id = ${userId} LIMIT 1
      `;
      const p = profile && profile.length > 0 ? profile[0] : null;

      return {
        id: r.id as string,
        room_id: r.room_id as string,
        user_id: r.user_id as string,
        username: p ? (p.username as string) : "fan",
        display_name: p ? (p.display_name as string) : "BBPulse Fan",
        avatar_url: p ? (p.avatar_url as string) : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        message: r.message as string,
        is_flagged: Boolean(r.is_flagged),
        created_at: new Date(r.created_at as string).toISOString()
      };
    } catch (err) {
      console.error("[NeonDB] ChatRepository.postMessage error:", err);
      return null;
    }
  }
};

// ============================================================================
// 4. DIRECT MESSAGES REPOSITORY
// ============================================================================
export const DirectMessageRepository = {
  async getInbox(userId: string): Promise<DirectMessage[]> {
    if (!sql) return [];
    try {
      const rows = await sql`
        SELECT 
          d.id, 
          d.sender_id, 
          d.receiver_id, 
          d.subject, 
          d.content, 
          d.is_read, 
          d.created_at,
          sp.display_name as sender_name,
          sp.avatar_url as sender_avatar,
          rp.display_name as receiver_name,
          rp.avatar_url as receiver_avatar
        FROM direct_messages d
        JOIN profiles sp ON sp.user_id = d.sender_id
        JOIN profiles rp ON rp.user_id = d.receiver_id
        WHERE d.receiver_id = ${userId} OR d.sender_id = ${userId}
        ORDER BY d.created_at DESC
        LIMIT 50
      `;
      return rows.map(r => ({
        id: r.id as string,
        sender_id: r.sender_id as string,
        sender_name: r.sender_name as string,
        sender_avatar: r.sender_avatar as string,
        receiver_id: r.receiver_id as string,
        receiver_name: r.receiver_name as string,
        receiver_avatar: r.receiver_avatar as string,
        subject: (r.subject as string) || undefined,
        content: r.content as string,
        is_read: Boolean(r.is_read),
        created_at: new Date(r.created_at as string).toISOString()
      }));
    } catch (err) {
      console.error("[NeonDB] DirectMessageRepository.getInbox error:", err);
      return [];
    }
  },

  async send(params: {
    senderId: string;
    receiverId: string;
    subject?: string;
    content: string;
  }): Promise<DirectMessage | null> {
    if (!sql) return null;
    try {
      const rows = await sql`
        INSERT INTO direct_messages (sender_id, receiver_id, subject, content)
        VALUES (${params.senderId}, ${params.receiverId}, ${params.subject || null}, ${params.content})
        RETURNING id, sender_id, receiver_id, subject, content, is_read, created_at
      `;
      if (!rows || rows.length === 0) return null;
      const r = rows[0];
      return {
        id: r.id as string,
        sender_id: r.sender_id as string,
        receiver_id: r.receiver_id as string,
        subject: (r.subject as string) || undefined,
        content: r.content as string,
        is_read: false,
        created_at: new Date(r.created_at as string).toISOString()
      };
    } catch (err) {
      console.error("[NeonDB] DirectMessageRepository.send error:", err);
      return null;
    }
  }
};

// ============================================================================
// 5. UPCOMING DETAILS & SCHEDULED EVENTS REPOSITORY
// ============================================================================
export const UpcomingRepository = {
  async getAll(limit = 20): Promise<UpcomingEvent[]> {
    if (!sql) return [];
    try {
      const rows = await sql`
        SELECT 
          id, 
          season_id, 
          title, 
          event_type, 
          scheduled_time, 
          description, 
          venue_or_broadcast, 
          importance, 
          status, 
          action_url, 
          created_at
        FROM upcoming_events
        WHERE status IN ('scheduled', 'live')
        ORDER BY scheduled_time ASC
        LIMIT ${limit}
      `;
      return rows.map(r => ({
        id: r.id as string,
        season_id: (r.season_id as string) || undefined,
        title: r.title as string,
        event_type: r.event_type as UpcomingEvent['event_type'],
        scheduled_time: new Date(r.scheduled_time as string).toISOString(),
        description: r.description as string,
        venue_or_broadcast: r.venue_or_broadcast as string,
        importance: r.importance as 'critical' | 'high' | 'normal',
        status: r.status as 'scheduled' | 'live' | 'completed' | 'postponed',
        action_url: (r.action_url as string) || undefined,
        created_at: new Date(r.created_at as string).toISOString()
      }));
    } catch (err) {
      console.error("[NeonDB] UpcomingRepository.getAll error:", err);
      return [];
    }
  },

  async create(event: {
    title: string;
    event_type: UpcomingEvent['event_type'];
    scheduled_time: string;
    description: string;
    venue_or_broadcast?: string;
    importance?: 'critical' | 'high' | 'normal';
    action_url?: string;
  }): Promise<UpcomingEvent | null> {
    if (!sql) return null;
    try {
      const rows = await sql`
        INSERT INTO upcoming_events (
          title, 
          event_type, 
          scheduled_time, 
          description, 
          venue_or_broadcast, 
          importance, 
          action_url
        ) VALUES (
          ${event.title},
          ${event.event_type},
          ${event.scheduled_time},
          ${event.description},
          ${event.venue_or_broadcast || 'Star Maa & Disney+ Hotstar'},
          ${event.importance || 'normal'},
          ${event.action_url || null}
        )
        RETURNING *
      `;
      if (!rows || rows.length === 0) return null;
      const r = rows[0];
      return {
        id: r.id as string,
        title: r.title as string,
        event_type: r.event_type as UpcomingEvent['event_type'],
        scheduled_time: new Date(r.scheduled_time as string).toISOString(),
        description: r.description as string,
        venue_or_broadcast: r.venue_or_broadcast as string,
        importance: r.importance as 'critical' | 'high' | 'normal',
        status: r.status as 'scheduled' | 'live' | 'completed' | 'postponed',
        action_url: (r.action_url as string) || undefined,
        created_at: new Date(r.created_at as string).toISOString()
      };
    } catch (err) {
      console.error("[NeonDB] UpcomingRepository.create error:", err);
      return null;
    }
  }
};

// ============================================================================
// 6. POLLS & VERIFIED VOTES REPOSITORY
// ============================================================================
export const PollRepository = {
  async getActivePoll(userIdOrEmail?: string): Promise<{
    poll: Poll;
    userVote: { optionId: string; contestantName: string; votedAt: string } | null;
  } | null> {
    if (!sql) return null;
    try {
      // 1. Fetch active poll
      const pollRows = await sql`
        SELECT 
          p.id, 
          p.season_id, 
          p.title, 
          p.description, 
          p.week_number, 
          p.status, 
          p.start_at, 
          p.closes_at, 
          p.integrity_note, 
          p.created_at
        FROM polls p
        WHERE p.status = 'active'
        ORDER BY p.week_number DESC, p.created_at DESC
        LIMIT 1
      `;
      if (!pollRows || pollRows.length === 0) return null;
      const p = pollRows[0];

      // 2. Fetch options with contestant details
      const optionRows = await sql`
        SELECT 
          po.id as option_id,
          po.poll_id,
          po.contestant_id,
          po.sort_order,
          po.vote_count,
          c.name as contestant_name,
          c.avatar_url as contestant_avatar,
          c.telugu_name,
          c.slug as contestant_slug
        FROM poll_options po
        JOIN contestants c ON c.id = po.contestant_id
        WHERE po.poll_id = ${p.id}
        ORDER BY po.sort_order ASC, po.vote_count DESC
      `;

      const totalVotes = optionRows.reduce((sum, opt) => sum + (Number(opt.vote_count) || 0), 0);

      const options: PollOption[] = optionRows.map(opt => {
        const count = Number(opt.vote_count) || 0;
        const percentage = totalVotes > 0 ? Number(((count / totalVotes) * 100).toFixed(1)) : 0;
        return {
          id: opt.option_id as string,
          poll_id: p.id as string,
          contestant_id: opt.contestant_id as string,
          contestant_name: opt.contestant_name as string,
          contestant_avatar: opt.contestant_avatar as string,
          vote_count: count,
          percentage
        };
      });

      const poll: Poll = {
        id: p.id as string,
        season_id: p.season_id as string,
        title: p.title as string,
        description: (p.description as string) || "",
        week_number: Number(p.week_number) || 4,
        status: p.status as Poll['status'],
        start_at: new Date(p.start_at as string).toISOString(),
        closes_at: new Date(p.closes_at as string).toISOString(),
        total_votes: totalVotes,
        options,
        integrity_note: (p.integrity_note as string) || "One verified vote per BBPulse account."
      };

      // 3. Check if user has already voted
      let userVote: { optionId: string; contestantName: string; votedAt: string } | null = null;
      if (userIdOrEmail) {
        const isUuid = UUID_REGEX.test(userIdOrEmail);
        const voteRows = isUuid
          ? await sql`
              SELECT v.option_id, v.created_at, c.name as contestant_name
              FROM votes v
              JOIN poll_options po ON po.id = v.option_id
              JOIN contestants c ON c.id = po.contestant_id
              WHERE v.poll_id = ${p.id} AND v.user_id = ${userIdOrEmail}
              LIMIT 1
            `
          : await sql`
              SELECT v.option_id, v.created_at, c.name as contestant_name
              FROM votes v
              JOIN poll_options po ON po.id = v.option_id
              JOIN contestants c ON c.id = po.contestant_id
              JOIN users u ON u.id = v.user_id
              WHERE v.poll_id = ${p.id} AND (u.auth_provider_id = ${userIdOrEmail} OR LOWER(u.email_private) = LOWER(${userIdOrEmail}))
              LIMIT 1
            `;

        if (voteRows && voteRows.length > 0) {
          userVote = {
            optionId: voteRows[0].option_id as string,
            contestantName: voteRows[0].contestant_name as string,
            votedAt: new Date(voteRows[0].created_at as string).toISOString()
          };
        }
      }

      return { poll, userVote };
    } catch (err) {
      console.error("[NeonDB] PollRepository.getActivePoll error:", err);
      return null;
    }
  },

  async submitVote(params: {
    pollId: string;
    userIdOrEmail: string;
    optionId: string;
    ipHash?: string;
  }): Promise<{
    success: boolean;
    error?: string;
    alreadyVoted?: boolean;
    poll?: Poll;
    userVote?: { optionId: string; contestantName: string; votedAt: string };
  }> {
    if (!sql) return { success: false, error: "Database not connected" };
    try {
      const isUuid = UUID_REGEX.test(params.userIdOrEmail);

      // 1. Resolve real user UUID in PostgreSQL
      let resolvedUserId: string | null = null;
      if (isUuid) {
        const userCheck = await sql`SELECT id FROM users WHERE id = ${params.userIdOrEmail} LIMIT 1`;
        if (userCheck && userCheck.length > 0) {
          resolvedUserId = userCheck[0].id as string;
        }
      } else {
        const userCheck = await sql`
          SELECT id FROM users 
          WHERE auth_provider_id = ${params.userIdOrEmail} OR LOWER(email_private) = LOWER(${params.userIdOrEmail})
          LIMIT 1
        `;
        if (userCheck && userCheck.length > 0) {
          resolvedUserId = userCheck[0].id as string;
        }
      }

      if (!resolvedUserId) {
        return {
          success: false,
          error: "Verified user account required to vote. Please sign in or verify your email."
        };
      }

      // 2. Check if user already voted in this poll
      const existingVote = await sql`
        SELECT v.option_id, v.created_at, c.name as contestant_name
        FROM votes v
        JOIN poll_options po ON po.id = v.option_id
        JOIN contestants c ON c.id = po.contestant_id
        WHERE v.poll_id = ${params.pollId} AND v.user_id = ${resolvedUserId}
        LIMIT 1
      `;
      if (existingVote && existingVote.length > 0) {
        return {
          success: false,
          alreadyVoted: true,
          error: "You have already cast your verified ballot for this eviction cycle.",
          userVote: {
            optionId: existingVote[0].option_id as string,
            contestantName: existingVote[0].contestant_name as string,
            votedAt: new Date(existingVote[0].created_at as string).toISOString()
          }
        };
      }

      // 3. Insert vote into votes table
      await sql`
        INSERT INTO votes (poll_id, user_id, option_id, ip_hash, integrity_status)
        VALUES (${params.pollId}, ${resolvedUserId}, ${params.optionId}, ${params.ipHash || null}, 'valid')
      `;

      // 4. Atomically increment vote_count in poll_options
      await sql`
        UPDATE poll_options
        SET vote_count = vote_count + 1
        WHERE id = ${params.optionId}
      `;

      // 5. Fetch updated poll state with calculated percentages
      const activeData = await this.getActivePoll(resolvedUserId);
      if (!activeData) {
        return { success: true };
      }

      return {
        success: true,
        poll: activeData.poll,
        userVote: activeData.userVote || {
          optionId: params.optionId,
          contestantName: activeData.poll.options.find(o => o.id === params.optionId)?.contestant_name || "Contestant",
          votedAt: new Date().toISOString()
        }
      };
    } catch (err: any) {
      console.error("[NeonDB] PollRepository.submitVote error:", err);
      if (err?.code === "23505") {
        return {
          success: false,
          alreadyVoted: true,
          error: "You have already cast your verified ballot for this eviction cycle."
        };
      }
      return { success: false, error: "Failed to record vote. Please try again." };
    }
  }
};

