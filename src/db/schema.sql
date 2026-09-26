-- ==============================================================================
-- BBPulse: Production PostgreSQL Database Schema (Supabase compatible)
-- Fan intelligence + community platform for Bigg Boss Telugu
-- ==============================================================================

-- Native gen_random_uuid() is supported natively in modern PostgreSQL / Neon
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_provider_id TEXT UNIQUE NOT NULL,
  email_private TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'restricted', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(30) UNIQUE NOT NULL CHECK (username ~ '^[a-z0-9_]{3,20}$'),
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT NOT NULL,
  bio TEXT,
  age_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- 3. SEASONS
CREATE TABLE IF NOT EXISTS seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  language VARCHAR(20) NOT NULL DEFAULT 'Telugu',
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('upcoming', 'active', 'completed')),
  current_week INTEGER NOT NULL DEFAULT 1,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CONTESTANTS
CREATE TABLE IF NOT EXISTS contestants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  telugu_name VARCHAR(100),
  slug VARCHAR(100) NOT NULL UNIQUE,
  avatar_url TEXT NOT NULL,
  profession VARCHAR(100),
  short_bio TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'nominated', 'evicted', 'captain')),
  pulse_score NUMERIC(5, 2) NOT NULL DEFAULT 50.00,
  pulse_change NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
  quote TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contestants_season ON contestants(season_id);
CREATE INDEX IF NOT EXISTS idx_contestants_slug ON contestants(slug);

-- 5. CONTESTANT MILESTONES (Their Story Journey)
CREATE TABLE IF NOT EXISTS contestant_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contestant_id UUID NOT NULL REFERENCES contestants(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  signal_type VARCHAR(30) NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. EPISODES
CREATE TABLE IF NOT EXISTS episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title VARCHAR(150) NOT NULL,
  air_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'completed' CHECK (status IN ('upcoming', 'live', 'completed')),
  duration VARCHAR(30),
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(season_id, episode_number)
);

-- 7. EPISODE EVENTS (Chronological Story Moments)
CREATE TABLE IF NOT EXISTS episode_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id UUID NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
  time_in_episode VARCHAR(20),
  title VARCHAR(150) NOT NULL,
  event_type VARCHAR(30) NOT NULL CHECK (event_type IN ('nomination', 'task', 'argument', 'reaction', 'debate', 'prediction')),
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. POLLS (Community Polling)
CREATE TABLE IF NOT EXISTS polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  week_number INTEGER NOT NULL DEFAULT 1,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
  start_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closes_at TIMESTAMPTZ NOT NULL,
  integrity_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. POLL OPTIONS
CREATE TABLE IF NOT EXISTS poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  contestant_id UUID NOT NULL REFERENCES contestants(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  vote_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(poll_id, contestant_id)
);

-- 10. VOTES (1 Vote per User per Poll cycle)
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  ip_hash VARCHAR(64),
  integrity_status VARCHAR(20) NOT NULL DEFAULT 'valid' CHECK (integrity_status IN ('valid', 'flagged')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_votes_poll_id ON votes(poll_id);

-- 11. POSTS (Discussions)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  contestant_id UUID REFERENCES contestants(id) ON DELETE SET NULL,
  episode_id UUID REFERENCES episodes(id) ON DELETE SET NULL,
  category VARCHAR(30) NOT NULL CHECK (category IN ('opinion', 'episode', 'nomination', 'task', 'debate', 'meme', 'prediction')),
  title VARCHAR(250) NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'reported', 'removed', 'locked')),
  agree_count INTEGER NOT NULL DEFAULT 0,
  disagree_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_season ON posts(season_id);
CREATE INDEX IF NOT EXISTS idx_posts_contestant ON posts(contestant_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- 12. COMMENTS
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  agree_count INTEGER NOT NULL DEFAULT 0,
  disagree_count INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'removed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);

-- 13. REACTIONS (Agree / Disagree)
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('post', 'comment')),
  target_id UUID NOT NULL,
  reaction_type VARCHAR(20) NOT NULL CHECK (reaction_type IN ('agree', 'disagree')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);

-- 14. DEBATES (Today's Debate)
CREATE TABLE IF NOT EXISTS debates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  episode_id UUID REFERENCES episodes(id) ON DELETE SET NULL,
  title VARCHAR(200) NOT NULL,
  question TEXT NOT NULL,
  context TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  agree_count INTEGER NOT NULL DEFAULT 0,
  disagree_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. DEBATE RESPONSES
CREATE TABLE IF NOT EXISTS debate_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debate_id UUID NOT NULL REFERENCES debates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stance VARCHAR(20) NOT NULL CHECK (stance IN ('agree', 'disagree')),
  comment TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(debate_id, user_id)
);

-- 16. PREDICTIONS (Community Prediction & Personal Tracking)
CREATE TABLE IF NOT EXISTS predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  contestant_id UUID NOT NULL REFERENCES contestants(id) ON DELETE CASCADE,
  prediction_type VARCHAR(30) NOT NULL DEFAULT 'at_risk' CHECK (prediction_type IN ('at_risk', 'safe', 'captain')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'correct', 'incorrect')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  UNIQUE(user_id, season_id, week_number, prediction_type)
);

-- 17. PULSE SNAPSHOTS (Formula: 35% Poll + 20% Public Roundup + 20% Sentiment + 15% Engagement + 10% Trend)
CREATE TABLE IF NOT EXISTS pulse_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contestant_id UUID NOT NULL REFERENCES contestants(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  poll_score NUMERIC(5, 2) NOT NULL,
  roundup_score NUMERIC(5, 2) NOT NULL,
  sentiment_score NUMERIC(5, 2) NOT NULL,
  engagement_score NUMERIC(5, 2) NOT NULL,
  trend_score NUMERIC(5, 2) NOT NULL,
  final_pulse NUMERIC(5, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(contestant_id, snapshot_date)
);

-- 18. POLL ROUNDUPS (Verified External Poll Observations)
CREATE TABLE IF NOT EXISTS poll_roundups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  source_name VARCHAR(150) NOT NULL,
  source_url TEXT NOT NULL,
  screenshot_url TEXT,
  source_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  submitted_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. REPORTS & MODERATION
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('post', 'comment', 'user')),
  target_id UUID NOT NULL,
  reason VARCHAR(50) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),
  action_taken TEXT
);

-- 20. USER FOLLOWS & BLOCKS
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('contestant', 'topic')),
  target_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);

CREATE TABLE IF NOT EXISTS blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, blocked_user_id)
);

-- 21. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  link TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read);

-- 22. USER SETTINGS (Preferences, Notifications, Theme, Privacy)
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  theme VARCHAR(20) NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  in_app_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  poll_reminder BOOLEAN NOT NULL DEFAULT TRUE,
  episode_reminder BOOLEAN NOT NULL DEFAULT TRUE,
  show_predictions_publicly BOOLEAN NOT NULL DEFAULT TRUE,
  language VARCHAR(20) NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'te')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- 23. CHAT ROOMS (Live Episode Chats, Contestant Fan Lounges, General Debate)
CREATE TABLE IF NOT EXISTS chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  room_type VARCHAR(30) NOT NULL DEFAULT 'general' CHECK (room_type IN ('live_episode', 'general', 'contestant', 'debate')),
  contestant_id UUID REFERENCES contestants(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_rooms_slug ON chat_rooms(slug);

-- 24. CHAT MESSAGES (Live & Group Community Chat Messages)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_room_created ON chat_messages(room_id, created_at DESC);

-- 25. DIRECT MESSAGES (Fan-to-Fan & Moderation Inquiries)
CREATE TABLE IF NOT EXISTS direct_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(200),
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_direct_messages_receiver ON direct_messages(receiver_id, is_read);
CREATE INDEX IF NOT EXISTS idx_direct_messages_sender ON direct_messages(sender_id);

-- 26. UPCOMING DETAILS & SCHEDULED EVENTS (Broadcasts, Evictions, Captaincy, Tasks)
CREATE TABLE IF NOT EXISTS upcoming_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('eviction', 'weekend_episode', 'captaincy_task', 'nomination_cycle', 'wildcard_entry', 'special_task')),
  scheduled_time TIMESTAMPTZ NOT NULL,
  description TEXT NOT NULL,
  venue_or_broadcast VARCHAR(150) NOT NULL DEFAULT 'Star Maa & Disney+ Hotstar',
  importance VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK (importance IN ('critical', 'high', 'normal')),
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'postponed')),
  action_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_upcoming_events_scheduled ON upcoming_events(scheduled_time ASC);
