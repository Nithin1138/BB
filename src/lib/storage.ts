import {
  Contestant,
  Episode,
  Poll,
  Post,
  Comment,
  Debate,
  PollRoundupItem,
  ReportItem,
  NotificationItem,
  Prediction,
  PredictionCommunityStat,
  PredictionLeaderboardEntry,
  User,
  VoteRecord
} from "@/types";
import {
  INITIAL_CONTESTANTS,
  INITIAL_DEBATE,
  INITIAL_EPISODE,
  INITIAL_LEADERBOARD,
  INITIAL_NOTIFICATIONS,
  INITIAL_POLL,
  INITIAL_POSTS,
  INITIAL_PREDICTION_STATS,
  INITIAL_REPORTS,
  INITIAL_ROUNDUPS,
  INITIAL_USER
} from "./mock-data";

const STORAGE_KEYS = {
  USER: "bbpulse_user_v1",
  CONTESTANTS: "bbpulse_contestants_v1",
  POLL: "bbpulse_poll_v1",
  VOTES: "bbpulse_votes_v1",
  POSTS: "bbpulse_posts_v1",
  COMMENTS: "bbpulse_comments_v1",
  DEBATE: "bbpulse_debate_v1",
  PREDICTIONS: "bbpulse_user_predictions_v1",
  PREDICTION_STATS: "bbpulse_pred_stats_v1",
  LEADERBOARD: "bbpulse_leaderboard_v1",
  ROUNDUPS: "bbpulse_roundups_v1",
  REPORTS: "bbpulse_reports_v1",
  NOTIFICATIONS: "bbpulse_notifications_v1",
  REACTIONS: "bbpulse_reactions_v1",
};

// Safe localStorage helper
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
}

export const StorageService = {
  // User Profile & Session
  getUser(): User {
    return safeGet<User>(STORAGE_KEYS.USER, INITIAL_USER);
  },
  setUser(user: User): void {
    safeSet(STORAGE_KEYS.USER, user);
  },
  clearUser(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {
      console.error("Error clearing user:", e);
    }
  },

  // Contestants
  getContestants(): Contestant[] {
    return safeGet<Contestant[]>(STORAGE_KEYS.CONTESTANTS, INITIAL_CONTESTANTS);
  },
  getContestantBySlug(slug: string): Contestant | undefined {
    const contestants = this.getContestants();
    return contestants.find(c => c.slug === slug || c.id === slug);
  },
  updateContestant(updated: Contestant): void {
    const contestants = this.getContestants().map(c => c.id === updated.id ? updated : c);
    safeSet(STORAGE_KEYS.CONTESTANTS, contestants);
  },

  // Polls & Voting
  getActivePoll(): Poll {
    return safeGet<Poll>(STORAGE_KEYS.POLL, INITIAL_POLL);
  },
  getPoll(): Poll {
    return this.getActivePoll();
  },
  getVotes(): VoteRecord[] {
    return safeGet<VoteRecord[]>(STORAGE_KEYS.VOTES, []);
  },
  getUserVote(userId: string, pollId: string): VoteRecord | null {
    const votes = safeGet<VoteRecord[]>(STORAGE_KEYS.VOTES, []);
    return votes.find(v => v.user_id === userId && v.poll_id === pollId) || null;
  },
  submitVote(userId: string, pollId: string, optionId: string): { success: boolean; message: string; updatedPoll?: Poll } {
    const existing = this.getUserVote(userId, pollId);
    if (existing) {
      return { success: false, message: "You have already cast your community vote for this cycle." };
    }

    const poll = this.getActivePoll();
    const targetOption = poll.options.find(o => o.id === optionId);
    if (!targetOption) {
      return { success: false, message: "Selected contestant option not found." };
    }

    // Increment vote
    targetOption.vote_count += 1;
    poll.total_votes += 1;

    // Recalculate percentages
    poll.options.forEach(opt => {
      opt.percentage = Number(((opt.vote_count / poll.total_votes) * 100).toFixed(1));
    });

    // Save vote record
    const votes = safeGet<VoteRecord[]>(STORAGE_KEYS.VOTES, []);
    votes.push({
      id: "vote_" + Date.now(),
      poll_id: pollId,
      user_id: userId,
      option_id: optionId,
      created_at: new Date().toISOString(),
      integrity_status: "valid"
    });

    safeSet(STORAGE_KEYS.VOTES, votes);
    safeSet(STORAGE_KEYS.POLL, poll);

    return { success: true, message: `Your vote for ${targetOption.contestant_name} has been counted!`, updatedPoll: poll };
  },

  // Discussions & Posts
  getPosts(): Post[] {
    return safeGet<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  },
  getPostById(id: string): Post | undefined {
    return this.getPosts().find(p => p.id === id);
  },
  createPost(newPost: Omit<Post, "id" | "created_at" | "agree_count" | "disagree_count" | "comment_count" | "status">): Post {
    const posts = this.getPosts();
    const created: Post = {
      ...newPost,
      id: "post_" + Date.now(),
      created_at: "Just now",
      agree_count: 0,
      disagree_count: 0,
      comment_count: 0,
      status: "published"
    };
    posts.unshift(created);
    safeSet(STORAGE_KEYS.POSTS, posts);
    return created;
  },
  toggleReaction(userId: string, targetType: 'post' | 'comment', targetId: string, reactionType: 'agree' | 'disagree'): { agreeCount: number; disagreeCount: number } {
    const reactions = safeGet<Record<string, 'agree' | 'disagree'>>(STORAGE_KEYS.REACTIONS, {});
    const key = `${userId}_${targetType}_${targetId}`;
    const previousReaction = reactions[key];

    const posts = this.getPosts();
    const post = posts.find(p => p.id === targetId);

    if (post && targetType === 'post') {
      if (previousReaction === reactionType) {
        // Toggle off
        delete reactions[key];
        if (reactionType === 'agree') post.agree_count = Math.max(0, post.agree_count - 1);
        if (reactionType === 'disagree') post.disagree_count = Math.max(0, post.disagree_count - 1);
      } else {
        // Switching or new
        if (previousReaction === 'agree') post.agree_count = Math.max(0, post.agree_count - 1);
        if (previousReaction === 'disagree') post.disagree_count = Math.max(0, post.disagree_count - 1);

        reactions[key] = reactionType;
        if (reactionType === 'agree') post.agree_count += 1;
        if (reactionType === 'disagree') post.disagree_count += 1;
      }
      safeSet(STORAGE_KEYS.POSTS, posts);
      safeSet(STORAGE_KEYS.REACTIONS, reactions);
      return { agreeCount: post.agree_count, disagreeCount: post.disagree_count };
    }

    return { agreeCount: 0, disagreeCount: 0 };
  },
  getUserReaction(userId: string, targetType: 'post' | 'comment', targetId: string): 'agree' | 'disagree' | null {
    const reactions = safeGet<Record<string, 'agree' | 'disagree'>>(STORAGE_KEYS.REACTIONS, {});
    const key = `${userId}_${targetType}_${targetId}`;
    return reactions[key] || null;
  },

  // Today's Debate
  getDebate(): Debate {
    return safeGet<Debate>(STORAGE_KEYS.DEBATE, INITIAL_DEBATE);
  },
  submitDebateResponse(userId: string, username: string, userAvatar: string, stance: 'agree' | 'disagree', comment: string): Debate {
    const debate = this.getDebate();
    const newResponse = {
      id: "dr_" + Date.now(),
      debate_id: debate.id,
      user_id: userId,
      username,
      user_avatar: userAvatar,
      stance,
      comment,
      created_at: "Just now",
      featured: false
    };

    debate.responses.unshift(newResponse);
    if (stance === 'agree') debate.agree_count += 1;
    if (stance === 'disagree') debate.disagree_count += 1;

    const total = debate.agree_count + debate.disagree_count;
    debate.agree_percentage = Math.round((debate.agree_count / total) * 100);
    debate.disagree_percentage = 100 - debate.agree_percentage;

    safeSet(STORAGE_KEYS.DEBATE, debate);
    return debate;
  },

  // Predictions
  getUserPredictions(userId: string): Prediction[] {
    const all = safeGet<Prediction[]>(STORAGE_KEYS.PREDICTIONS, []);
    return all.filter(p => p.user_id === userId);
  },
  submitPrediction(userId: string, contestantId: string, contestantName: string, contestantAvatar: string): Prediction {
    const predictions = safeGet<Prediction[]>(STORAGE_KEYS.PREDICTIONS, []);
    const newPrediction: Prediction = {
      id: "pred_" + Date.now(),
      user_id: userId,
      season_id: "s_telugu_v1",
      week_number: 4,
      contestant_id: contestantId,
      contestant_name: contestantName,
      contestant_avatar: contestantAvatar,
      prediction_type: "at_risk",
      created_at: "Just now",
      status: "pending"
    };

    predictions.unshift(newPrediction);
    safeSet(STORAGE_KEYS.PREDICTIONS, predictions);
    return newPrediction;
  },
  getPredictionStats(): PredictionCommunityStat[] {
    return safeGet<PredictionCommunityStat[]>(STORAGE_KEYS.PREDICTION_STATS, INITIAL_PREDICTION_STATS);
  },
  getLeaderboard(): PredictionLeaderboardEntry[] {
    return safeGet<PredictionLeaderboardEntry[]>(STORAGE_KEYS.LEADERBOARD, INITIAL_LEADERBOARD);
  },

  // Episodes
  getEpisode(): Episode {
    return INITIAL_EPISODE;
  },

  // External Poll Roundups
  getRoundups(): PollRoundupItem[] {
    return safeGet<PollRoundupItem[]>(STORAGE_KEYS.ROUNDUPS, INITIAL_ROUNDUPS);
  },
  submitRoundup(item: Omit<PollRoundupItem, "id" | "status" | "date_checked">): PollRoundupItem {
    const roundups = this.getRoundups();
    const created: PollRoundupItem = {
      ...item,
      id: "rnd_" + Date.now(),
      date_checked: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    roundups.unshift(created);
    safeSet(STORAGE_KEYS.ROUNDUPS, roundups);
    return created;
  },
  approveRoundup(id: string): void {
    const roundups = this.getRoundups().map(r => r.id === id ? { ...r, status: 'verified' as const } : r);
    safeSet(STORAGE_KEYS.ROUNDUPS, roundups);
  },

  // Moderation Reports
  getReports(): ReportItem[] {
    return safeGet<ReportItem[]>(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
  },
  submitReport(report: Omit<ReportItem, "id" | "status" | "created_at">): ReportItem {
    const reports = this.getReports();
    const created: ReportItem = {
      ...report,
      id: "rep_" + Date.now(),
      status: "pending",
      created_at: "Just now"
    };
    reports.unshift(created);
    safeSet(STORAGE_KEYS.REPORTS, reports);
    return created;
  },
  resolveReport(id: string, action: string): void {
    const reports = this.getReports().map(r => r.id === id ? { ...r, status: 'resolved' as const, action_taken: action } : r);
    safeSet(STORAGE_KEYS.REPORTS, reports);
  },

  // Notifications
  getNotifications(userId: string): NotificationItem[] {
    return safeGet<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },
  markNotificationAsRead(id: string): void {
    const notifs = this.getNotifications("").map(n => n.id === id ? { ...n, read: true } : n);
    safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },

  // User Actions: Follow & Block
  toggleFollowContestant(userId: string, contestantId: string): string[] {
    const user = this.getUser();
    const exists = user.followed_contestants.includes(contestantId);
    if (exists) {
      user.followed_contestants = user.followed_contestants.filter(id => id !== contestantId);
    } else {
      user.followed_contestants.push(contestantId);
    }
    this.setUser(user);
    return user.followed_contestants;
  },
  blockUser(targetUsername: string): string[] {
    const user = this.getUser();
    if (!user.blocked_users.includes(targetUsername)) {
      user.blocked_users.push(targetUsername);
      this.setUser(user);
    }
    return user.blocked_users;
  },
  unblockUser(targetUsername: string): string[] {
    const user = this.getUser();
    user.blocked_users = user.blocked_users.filter(u => u !== targetUsername);
    this.setUser(user);
    return user.blocked_users;
  },
  getBlockedUsers(): string[] {
    return this.getUser().blocked_users || [];
  }
};
