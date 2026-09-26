import {
  Contestant,
  Debate,
  Episode,
  NotificationItem,
  Poll,
  PollRoundupItem,
  Post,
  Prediction,
  PredictionCommunityStat,
  PredictionLeaderboardEntry,
  ReportItem,
  Season,
  ShareCardConfig,
  User,
  VoteRecord
} from "@/types";
import { StorageService } from "./storage";

export const SeasonService = {
  async getCurrentSeason(): Promise<Season> {
    return {
      id: "s_telugu_v1",
      name: "Bigg Boss Telugu Season 10 (Dasavatharam)",
      language: "Telugu",
      status: "active",
      current_week: 4,
      start_date: "2026-09-01",
      end_date: "2026-12-15"
    };
  }
};

export const ContestantService = {
  async getContestants(): Promise<Contestant[]> {
    return StorageService.getContestants();
  },

  async getContestantBySlug(slug: string): Promise<Contestant | undefined> {
    return StorageService.getContestantBySlug(slug);
  },

  async getRisingContestants(): Promise<Contestant[]> {
    const all = StorageService.getContestants();
    return [...all].sort((a, b) => b.pulse_change - a.pulse_change).slice(0, 3);
  },

  async getFallingContestants(): Promise<Contestant[]> {
    const all = StorageService.getContestants();
    return [...all].sort((a, b) => a.pulse_change - b.pulse_change).slice(0, 3);
  },

  async getMostDiscussedContestants(): Promise<Contestant[]> {
    const all = StorageService.getContestants();
    return [...all].sort((a, b) => b.discussion_count - a.discussion_count).slice(0, 3);
  }
};

export const PollService = {
  async getActivePoll(): Promise<Poll> {
    return StorageService.getActivePoll();
  },

  async getUserVote(userId: string, pollId: string): Promise<VoteRecord | null> {
    return StorageService.getUserVote(userId, pollId);
  },

  async submitVote(userId: string, pollId: string, optionId: string): Promise<{ success: boolean; message: string; updatedPoll?: Poll }> {
    return StorageService.submitVote(userId, pollId, optionId);
  }
};

export const DiscussionService = {
  async getDiscussionFeed(category?: string, filter: 'latest' | 'trending' | 'following' = 'latest'): Promise<Post[]> {
    let posts = StorageService.getPosts();
    const user = StorageService.getUser();

    // Filter out blocked users
    posts = posts.filter(p => !user.blocked_users.includes(p.author_username));

    if (category && category !== 'all') {
      posts = posts.filter(p => p.category === category);
    }

    if (filter === 'trending') {
      return [...posts].sort((a, b) => (b.agree_count + b.comment_count) - (a.agree_count + a.comment_count));
    } else if (filter === 'following') {
      return posts.filter(p => p.contestant_id && user.followed_contestants.includes(p.contestant_id));
    }

    return posts;
  },

  async getPostById(id: string): Promise<Post | undefined> {
    return StorageService.getPostById(id);
  },

  async createPost(post: Omit<Post, "id" | "created_at" | "agree_count" | "disagree_count" | "comment_count" | "status">): Promise<Post> {
    return StorageService.createPost(post);
  },

  async reactToPost(userId: string, postId: string, reaction: 'agree' | 'disagree'): Promise<{ agreeCount: number; disagreeCount: number }> {
    return StorageService.toggleReaction(userId, 'post', postId, reaction);
  },

  async getUserReaction(userId: string, postId: string): Promise<'agree' | 'disagree' | null> {
    return StorageService.getUserReaction(userId, 'post', postId);
  }
};

export const DebateService = {
  async getTodayDebate(): Promise<Debate> {
    return StorageService.getDebate();
  },

  async submitResponse(userId: string, username: string, userAvatar: string, stance: 'agree' | 'disagree', comment: string): Promise<Debate> {
    return StorageService.submitDebateResponse(userId, username, userAvatar, stance, comment);
  }
};

export const PredictionService = {
  async getCommunityPredictions(): Promise<PredictionCommunityStat[]> {
    return StorageService.getPredictionStats();
  },

  async getUserPredictions(userId: string): Promise<Prediction[]> {
    return StorageService.getUserPredictions(userId);
  },

  async submitPrediction(userId: string, contestantId: string, contestantName: string, contestantAvatar: string): Promise<Prediction> {
    return StorageService.submitPrediction(userId, contestantId, contestantName, contestantAvatar);
  },

  async getLeaderboard(): Promise<PredictionLeaderboardEntry[]> {
    return StorageService.getLeaderboard();
  }
};

export const EpisodeService = {
  async getEpisode(): Promise<Episode> {
    return StorageService.getEpisode();
  }
};

export const RoundupService = {
  async getRoundups(): Promise<PollRoundupItem[]> {
    return StorageService.getRoundups();
  },

  async submitRoundup(data: Omit<PollRoundupItem, "id" | "status" | "date_checked">): Promise<PollRoundupItem> {
    return StorageService.submitRoundup(data);
  },

  async approveRoundup(id: string): Promise<void> {
    return StorageService.approveRoundup(id);
  }
};

export const ModerationService = {
  async getReports(): Promise<ReportItem[]> {
    return StorageService.getReports();
  },

  async createReport(report: Omit<ReportItem, "id" | "status" | "created_at">): Promise<ReportItem> {
    return StorageService.submitReport(report);
  },

  async resolveReport(id: string, action: string): Promise<void> {
    return StorageService.resolveReport(id, action);
  },

  async blockUser(targetUsername: string): Promise<string[]> {
    return StorageService.blockUser(targetUsername);
  },

  async unblockUser(targetUsername: string): Promise<string[]> {
    return StorageService.unblockUser(targetUsername);
  }
};

export const NotificationService = {
  async getNotifications(userId: string): Promise<NotificationItem[]> {
    return StorageService.getNotifications(userId);
  },

  async markAsRead(id: string): Promise<void> {
    return StorageService.markNotificationAsRead(id);
  }
};

export const UserService = {
  async getCurrentUser(): Promise<User> {
    return StorageService.getUser();
  },

  async updateUser(user: User): Promise<void> {
    StorageService.setUser(user);
  },

  async toggleFollow(userId: string, contestantId: string): Promise<string[]> {
    return StorageService.toggleFollowContestant(userId, contestantId);
  }
};
