export type UserRole = 'user' | 'moderator' | 'admin';

export interface User {
  id: string;
  email_private: string;
  username: string; // e.g. "nithin24"
  display_name: string;
  avatar_url: string;
  bio?: string;
  role: UserRole;
  age_confirmed: boolean;
  joined_date: string;
  followed_contestants: string[];
  blocked_users: string[];
  predictions_count: number;
  accuracy_rate: number;
  reputation_score?: number;
}

export interface Season {
  id: string;
  name: string;
  language: 'Telugu';
  status: 'active' | 'completed';
  current_week: number;
  start_date: string;
  end_date: string;
}

export interface ContestantMilestone {
  date: string;
  episode: number;
  title: string;
  description: string;
  signal_type: 'entry' | 'nomination' | 'task_win' | 'dispute' | 'captaincy' | 'high_pulse';
}

export interface SpecialPowerInfo {
  name: string;
  category?: string;
  description: string;
  outcome: string;
  holder?: string;
}

export interface NominationGivenRecord {
  week: number;
  targets: string[];
  note?: string;
}

export interface NominatedByRecord {
  week: number;
  nominators: string[];
  note?: string;
}

export interface Contestant {
  id: string;
  season_id: string;
  name: string;
  telugu_name?: string;
  slug: string;
  avatar_url: string;
  profession: string;
  short_bio: string;
  status: 'active' | 'nominated' | 'evicted' | 'captain' | 'walked';
  day_entered?: number;
  day_exited?: number | null;
  exit_reason?: string;
  is_wildcard?: boolean;
  is_commoner?: boolean;
  special_power?: SpecialPowerInfo;
  nominations_given?: NominationGivenRecord[];
  nominated_by?: NominatedByRecord[];
  pulse_score: number; // 0-100
  pulse_change: number; // percentage change today, e.g. +8 or -5
  trend_direction: 'up' | 'down' | 'stable';
  nomination_count: number;
  days_in_house: number;
  sparkline: number[]; // 7-day values
  quote: string;
  discussion_count: number;
  poll_support_pct: number;
  risk_score: number; // 0-100
  milestones: ContestantMilestone[];
  wikipedia_url?: string;
}

export interface EpisodeEvent {
  id: string;
  episode_id: string;
  time_in_episode: string;
  title: string;
  event_type: 'nomination' | 'task' | 'argument' | 'reaction' | 'debate' | 'prediction';
  description: string;
  contestant_ids: string[];
}

export interface Episode {
  id: string;
  season_id: string;
  episode_number: number;
  title: string;
  air_date: string;
  status: 'completed' | 'live' | 'upcoming';
  duration: string;
  summary: string;
  events: EpisodeEvent[];
  highlights: string[];
}

export interface PollOption {
  id: string;
  poll_id: string;
  contestant_id: string;
  contestant_name: string;
  contestant_avatar: string;
  vote_count: number;
  percentage: number;
}

export interface Poll {
  id: string;
  season_id: string;
  title: string;
  description: string;
  week_number: number;
  status: 'active' | 'closed';
  start_at: string;
  closes_at: string;
  total_votes: number;
  options: PollOption[];
  integrity_note?: string;
}

export interface VoteRecord {
  id: string;
  poll_id: string;
  user_id: string;
  option_id: string;
  created_at: string;
  integrity_status: 'valid' | 'flagged';
}

export type PostCategory = 'opinion' | 'episode' | 'nomination' | 'task' | 'debate' | 'meme' | 'prediction';

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  author_username: string;
  author_name: string;
  author_avatar: string;
  parent_id?: string;
  body: string;
  created_at: string;
  agree_count: number;
  disagree_count: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  user_id: string;
  author_username: string;
  author_name: string;
  author_avatar: string;
  author?: {
    id?: string;
    username: string;
    display_name?: string;
    name?: string;
    avatar_url?: string;
    is_verified?: boolean;
    reputation_score?: number;
  };
  season_id?: string;
  contestant_id?: string;
  contestant_name?: string;
  episode_id?: string;
  category: PostCategory;
  title: string;
  body: string;
  image_url?: string;
  poll_data?: {
    question: string;
    options: { text: string; votes: number }[];
  };
  created_at: string;
  agree_count: number;
  disagree_count: number;
  upvotes?: number;
  comment_count: number;
  status: 'published' | 'reported' | 'removed' | 'locked';
}

export interface DebateResponse {
  id: string;
  debate_id: string;
  user_id: string;
  username: string;
  user_avatar: string;
  stance: 'agree' | 'disagree';
  comment: string;
  created_at: string;
  featured?: boolean;
}

export interface Debate {
  id: string;
  season_id: string;
  episode_id: string;
  title: string;
  question: string;
  context: string;
  status: 'active' | 'closed';
  agree_percentage: number;
  disagree_percentage: number;
  agree_count: number;
  disagree_count: number;
  why_agree: string[];
  why_disagree: string[];
  responses: DebateResponse[];
}

export interface Prediction {
  id: string;
  user_id: string;
  season_id: string;
  week_number: number;
  contestant_id: string;
  contestant_name: string;
  contestant_avatar: string;
  prediction_type: 'at_risk' | 'safe' | 'captain';
  created_at: string;
  status: 'pending' | 'correct' | 'incorrect';
}

export interface PredictionCommunityStat {
  contestant_id: string;
  contestant_name: string;
  contestant_avatar: string;
  community_pct: number;
  risk_score: number; // 0-100 BBPulse score
  total_predictions: number;
  trend: 'up' | 'down' | 'stable';
}

export interface PredictionLeaderboardEntry {
  rank: number;
  username: string;
  avatar_url: string;
  accuracy: number; // e.g. 88
  predictions_count: number;
  correct_count: number;
  current_streak: number;
}

export interface PulseSnapshot {
  contestant_id: string;
  contestant_name: string;
  date: string;
  poll_score: number; // 35%
  roundup_score: number; // 20%
  sentiment_score: number; // 20%
  engagement_score: number; // 15%
  trend_score: number; // 10%
  final_pulse: number;
}

export interface PollRoundupItem {
  id: string;
  season_id?: string;
  source_name: string;
  source_type: 'fan_portal' | 'media_poll' | 'public_forum';
  date_checked: string;
  source_url: string;
  screenshot_url?: string;
  status: 'verified' | 'pending' | 'rejected';
  results: {
    contestant_name: string;
    percentage: number;
  }[];
  notes?: string;
  submitted_by?: string;
}

export type PollRoundup = PollRoundupItem;

export interface ReportItem {
  id: string;
  reporter_id: string;
  reporter_username: string;
  target_type: 'post' | 'comment' | 'user';
  target_id: string;
  target_author: string;
  content_snippet: string;
  reason: 'Spam' | 'Harassment' | 'Personal attack' | 'Defamatory content' | 'Sexual content' | 'Inappropriate content' | 'Other' | string;
  description?: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  created_at: string;
  action_taken?: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  type: 'poll_closing' | 'reply' | 'debate_open' | 'prediction_result' | 'contestant_update';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link: string;
}

export interface ShareCardConfig {
  type: 'vote' | 'trend' | 'debate' | 'prediction' | 'contestant';
  headline: string;
  main_metric: string;
  secondary_metric?: string;
  contestant_name?: string;
  contestant_avatar?: string;
  disclaimer: string;
  url: string;
}

export interface UserSettings {
  id?: string;
  user_id: string;
  theme: 'light' | 'dark' | 'system';
  email_notifications: boolean;
  in_app_notifications: boolean;
  poll_reminder: boolean;
  episode_reminder: boolean;
  show_predictions_publicly: boolean;
  language: 'en' | 'te';
  created_at?: string;
  updated_at?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  slug: string;
  description?: string;
  room_type: 'live_episode' | 'general' | 'contestant' | 'debate';
  contestant_id?: string;
  is_active: boolean;
  created_at?: string;
  member_count?: number;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  username?: string;
  display_name?: string;
  avatar_url?: string;
  message: string;
  is_flagged?: boolean;
  created_at: string;
}

export interface DirectMessage {
  id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
  receiver_id: string;
  receiver_name?: string;
  receiver_avatar?: string;
  subject?: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface UpcomingEvent {
  id: string;
  season_id?: string;
  title: string;
  event_type: 'eviction' | 'weekend_episode' | 'captaincy_task' | 'nomination_cycle' | 'wildcard_entry' | 'special_task';
  scheduled_time: string; // ISO string
  description: string;
  venue_or_broadcast: string;
  importance: 'critical' | 'high' | 'normal';
  status: 'scheduled' | 'live' | 'completed' | 'postponed';
  action_url?: string;
  created_at?: string;
}
