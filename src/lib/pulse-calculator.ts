import { Contestant, PulseSnapshot } from "@/types";

/**
 * BBPulse Transparent Community Metric Engine (V1)
 *
 * Formula:
 * - 35% Community Poll
 * - 20% Verified Public Poll Observations
 * - 20% In-app Discussion Sentiment
 * - 15% Normalized Engagement
 * - 10% Trend Movement
 *
 * Note: Unofficial BBPulse community metric based on transparent rule-based calculations.
 */

export interface PulseWeights {
  communityPoll: number; // 0.35
  roundupObservations: number; // 0.20
  discussionSentiment: number; // 0.20
  normalizedEngagement: number; // 0.15
  trendMovement: number; // 0.10
}

export const DEFAULT_PULSE_WEIGHTS: PulseWeights = {
  communityPoll: 0.35,
  roundupObservations: 0.20,
  discussionSentiment: 0.20,
  normalizedEngagement: 0.15,
  trendMovement: 0.10,
};

export function calculateContestantPulse(
  pollScore: number, // 0 - 100
  roundupScore: number, // 0 - 100
  sentimentScore: number, // 0 - 100
  engagementScore: number, // 0 - 100
  trendScore: number, // 0 - 100
  weights: PulseWeights = DEFAULT_PULSE_WEIGHTS
): {
  finalPulse: number;
  breakdown: {
    pollContribution: number;
    roundupContribution: number;
    sentimentContribution: number;
    engagementContribution: number;
    trendContribution: number;
  };
} {
  const pollContribution = Number((pollScore * weights.communityPoll).toFixed(1));
  const roundupContribution = Number((roundupScore * weights.roundupObservations).toFixed(1));
  const sentimentContribution = Number((sentimentScore * weights.discussionSentiment).toFixed(1));
  const engagementContribution = Number((engagementScore * weights.normalizedEngagement).toFixed(1));
  const trendContribution = Number((trendScore * weights.trendMovement).toFixed(1));

  const finalPulse = Math.round(
    pollContribution +
    roundupContribution +
    sentimentContribution +
    engagementContribution +
    trendContribution
  );

  return {
    finalPulse: Math.min(100, Math.max(0, finalPulse)),
    breakdown: {
      pollContribution,
      roundupContribution,
      sentimentContribution,
      engagementContribution,
      trendContribution,
    }
  };
}

/**
 * Calculates BBPulse Risk Score (0-100)
 * Secondary community estimate based on:
 * - Low poll support (inverses to higher risk)
 * - Nomination status (+15 base if currently nominated)
 * - Negative sentiment proportion in discussion
 * - Downward trend velocity
 *
 * Community Prediction remains primary in visual hierarchy.
 */
export function calculateRiskScore(
  pollSupportPct: number,
  isNominated: boolean,
  negativeSentimentPct: number,
  pulseTrendDirection: 'up' | 'down' | 'stable'
): number {
  let score = 0;

  // 1. Inverted poll support (0% support = 50 risk pts; 40% support = 5 risk pts)
  const pollRisk = Math.max(0, 50 - (pollSupportPct * 1.1));
  score += pollRisk;

  // 2. Nomination factor
  if (isNominated) {
    score += 25;
  } else {
    score += 5; // non-nominated still has slight baseline risk
  }

  // 3. Discussion friction / negative sentiment
  score += (negativeSentimentPct * 0.25);

  // 4. Trend trajectory
  if (pulseTrendDirection === 'down') {
    score += 10;
  } else if (pulseTrendDirection === 'up') {
    score -= 10;
  }

  return Math.min(96, Math.max(8, Math.round(score)));
}
