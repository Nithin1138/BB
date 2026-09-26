import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { User, UserSettings, ChatRoom, ChatMessage, DirectMessage, UpcomingEvent } from "@/types";

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
      const rows = await sql`
        SELECT 
          u.id, 
          u.role, 
          u.status,
          p.username, 
          p.display_name, 
          p.avatar_url, 
          p.bio,
          u.created_at
        FROM users u
        LEFT JOIN profiles p ON p.user_id = u.id
        WHERE u.id = ${id}
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
        age_confirmed: true,
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

  async upsert(user: {
    auth_provider_id: string;
    email: string;
    username: string;
    display_name: string;
    avatar_url: string;
    role?: 'user' | 'moderator' | 'admin';
    bio?: string;
  }): Promise<User | null> {
    if (!sql) return null;
    try {
      // 1. Upsert users table
      const userRows = await sql`
        INSERT INTO users (auth_provider_id, email_private, role, status)
        VALUES (${user.auth_provider_id}, ${user.email}, ${user.role || 'user'}, 'active')
        ON CONFLICT (auth_provider_id) 
        DO UPDATE SET updated_at = NOW()
        RETURNING id, role, status, created_at
      `;
      const userId = userRows[0].id as string;

      // 2. Upsert profiles table
      await sql`
        INSERT INTO profiles (user_id, username, display_name, avatar_url, bio)
        VALUES (${userId}, ${user.username}, ${user.display_name}, ${user.avatar_url}, ${user.bio || ''})
        ON CONFLICT (user_id) 
        DO UPDATE SET 
          display_name = EXCLUDED.display_name,
          avatar_url = EXCLUDED.avatar_url,
          bio = EXCLUDED.bio,
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
        email_private: user.email,
        username: user.username,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        bio: user.bio || "",
        role: user.role || "user",
        age_confirmed: true,
        joined_date: new Date(userRows[0].created_at as string).toISOString(),
        accuracy_rate: 85,
        predictions_count: 0,
        followed_contestants: [],
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
