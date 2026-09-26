import {
  Contestant,
  Episode,
  Poll,
  Post,
  Debate,
  PollRoundupItem,
  ReportItem,
  NotificationItem,
  PredictionLeaderboardEntry,
  PredictionCommunityStat,
  User,
  SpecialPowerInfo,
  NominationGivenRecord,
  NominatedByRecord
} from "@/types";

export interface SpecialPowerRecord {
  power: string;
  holder: string;
  holder_slug: string;
  description: string;
  outcome: string;
  category: "defense" | "attack" | "immunity" | "modifier";
}

export interface NominationWeekRecord {
  week: number;
  theme: string;
  captain: string;
  captain_nominations?: string;
  public_vote_nominees: string[];
  evicted: { name: string; day: number; reason: string; avatar_url: string }[];
  re_entered?: { name: string; day: number; reason: string; avatar_url: string }[];
  walked?: { name: string; day: number; reason: string; avatar_url: string }[];
  notes: string[];
}

export const INITIAL_USER: User = {
  id: "usr_001",
  email_private: "nithin.dev@example.com",
  username: "nithin24",
  display_name: "Nithin",
  avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
  bio: "Bigg Boss 10 Dasavatharam observer. Tracking 10 Special Powers, weekly nominations, and live community pulse.",
  role: "user",
  age_confirmed: true,
  joined_date: "2026-09-06",
  followed_contestants: ["c_thrigun", "c_varshini", "c_mukesh"],
  blocked_users: [],
  predictions_count: 18,
  accuracy_rate: 83,
  reputation_score: 94
};

export const BB10_SPECIAL_POWERS: SpecialPowerRecord[] = [
  {
    power: "Takeover",
    holder: "Thrigun (Adith Eswaran)",
    holder_slug: "thrigun",
    description: "The power holder can cancel another housemate's power and take over its strategic advantage.",
    outcome: "Active in Reserve - Kept hidden under secret power rules",
    category: "modifier"
  },
  {
    power: "Eviction-Free",
    holder: "Jhansi",
    holder_slug: "jhansi",
    description: "The power holder can activate the shield to stay safe from that week's elimination.",
    outcome: "Active - Eligible to trigger when placed in danger",
    category: "immunity"
  },
  {
    power: "Resurrection",
    holder: "Nihar Mukesh Gowda",
    holder_slug: "nihar-mukesh-gowda",
    description: "The power holder can revive an already used special power and return it to its original owner.",
    outcome: "Active in Reserve - Holding as Week 4 House Captain",
    category: "modifier"
  },
  {
    power: "Grab Any Win",
    holder: "Varshini Sounderajan",
    holder_slug: "varshini-sounderajan",
    description: "The power holder can snatch another housemate's task victory immediately after they cross the finish line.",
    outcome: "Active - Carrying Week 1 washroom duty penalty imposed by Shalini",
    category: "attack"
  },
  {
    power: "Switch",
    holder: "Krishnudu",
    holder_slug: "krishnudu",
    description: "The power holder can swap housemates' positions in the house, but cannot be used during eviction.",
    outcome: "Lost / Unused - Evicted on Day 14 before activating",
    category: "modifier"
  },
  {
    power: "House Duty Penalty",
    holder: "Shalini Damera Patel",
    holder_slug: "shalini-damera-patel",
    description: "Can assign an unchangeable house duty to any housemate, which must continue until they exit the house.",
    outcome: "Used in Week 1 - Imposed perpetual washroom duty on Varshini",
    category: "attack"
  },
  {
    power: "Curse of Nomination",
    holder: "Sudheer Reddy",
    holder_slug: "sudheer-reddy",
    description: "Can directly nominate any housemate into the eviction zone in the next nomination cycle.",
    outcome: "Won on Day 7 - Housemates stripped it from Srishti; Sudheer won the task",
    category: "attack"
  },
  {
    power: "Save Shield",
    holder: "Auto Ramprasad",
    holder_slug: "auto-ramprasad",
    description: "The power holder can save himself or another nominated housemate from the eviction ballot.",
    outcome: "Active - Preserved for emergency survival",
    category: "defense"
  },
  {
    power: "Captain's Roadblock",
    holder: "Temper Vamsi",
    holder_slug: "temper-vamsi",
    description: "Can block a selected housemate from competing in the Captaincy race for 2 consecutive weeks.",
    outcome: "Active in Reserve",
    category: "attack"
  },
  {
    power: "Double Vote (2X)",
    holder: "Naresh",
    holder_slug: "naresh",
    description: "Can designate a housemate to receive double votes against them during nominations. Every vote counts twice.",
    outcome: "Active in Reserve",
    category: "attack"
  }
];

export const BB10_NOMINATION_WEEKS: NominationWeekRecord[] = [
  {
    week: 1,
    theme: "Mahapariksha (The Great Trial)",
    captain: "None",
    public_vote_nominees: [
      "Aman Masud", "Chaitra Rai", "Charan Mahadev", "Debjani Modak", "Jhansi",
      "Krishnudu", "Nihar Mukesh Gowda", "Naresh", "Auto Ramprasad", "Rohit Naidu Patnam",
      "Shalini Damera Patel", "Shiva Srishti Vyakaranam", "Sudheer Reddy",
      "Thrigun", "Temper Vamsi", "Varshini Sounderajan"
    ],
    evicted: [
      { name: "Charan Mahadev", day: 4, reason: "Evicted by housemates vote (9-4 vs Ramprasad)", avatar_url: "https://b374dd683233.blob.upstash.io/CHARAN.jpg" },
      { name: "Chaitra Rai", day: 5, reason: "Evicted by internal 4-way housemates vote (3-1)", avatar_url: "https://b374dd683233.blob.upstash.io/CHAITRA%20RAI.jpg" }
    ],
    notes: [
      "On Day 1, Bigg Boss announced all 16 contestants face the public vote to earn official housemate status.",
      "Rohit and Vamsi earned official housemate status on Day 3 by winning the task.",
      "Ramprasad earned official housemate status on Day 5 by winning the task.",
      "On Day 4, Charan and Ramprasad faced a surprise house eviction vote. Charan received 9 votes and was evicted.",
      "On Day 5, Aman, Chaitra, Sudheer, and Varshini voted among themselves. Chaitra received 3 votes and was evicted."
    ]
  },
  {
    week: 2,
    theme: "Power of People",
    captain: "Jhansi (Won Captaincy task Day 12)",
    public_vote_nominees: [
      "Debjani Modak", "Jhansi", "Krishnudu", "Nihar Mukesh Gowda", "Auto Ramprasad",
      "Rohit Naidu Patnam", "Shalini Damera Patel", "Shiva Srishti Vyakaranam",
      "Sudheer Reddy", "Thrigun", "Varshini Sounderajan"
    ],
    re_entered: [
      { name: "Charan Mahadev", day: 11, reason: "Overwhelming public vote brought him back under Power of People twist", avatar_url: "https://b374dd683233.blob.upstash.io/CHARAN.jpg" }
    ],
    evicted: [
      { name: "Krishnudu", day: 14, reason: "Fewest public votes in 11-way eviction ballot", avatar_url: "https://b374dd683233.blob.upstash.io/KRISHNUDU.jpg" }
    ],
    notes: [
      "Nominations were determined by the Pole & Axe race. Winners picked Silver Axe (1 nomination) or Golden Axe (2 nominations). Losers automatically took 1 nomination vote.",
      "Sudheer won Golden Axe vs Jhansi -> nominated Thrigun & Shalini.",
      "Debjani won Silver Axe vs Krishnudu -> nominated Thrigun.",
      "Rohit won Golden Axe vs Varshini -> nominated Thrigun & Jhansi.",
      "Naresh won Silver Axe vs Shalini -> nominated Shalini.",
      "Thrigun won Golden Axe vs Srishti -> nominated Sudheer & Rohit.",
      "Aman won Golden Axe vs Mukesh -> nominated Ramprasad & Jhansi.",
      "Vamsi won Golden Axe vs Ramprasad -> nominated Debjani & Mukesh.",
      "Public voted overwhelmingly to bring back evicted housemate Charan on Day 11."
    ]
  },
  {
    week: 3,
    theme: "Temptation vs Tension",
    captain: "Nihar Mukesh Gowda (Day 19 with Apoorva)",
    public_vote_nominees: [
      "Aman Masud", "Charan Mahadev", "Jhansi", "Shalini Damera Patel",
      "Sudheer Reddy", "Thrigun", "Temper Vamsi", "Varshini Sounderajan"
    ],
    walked: [
      { name: "Mithilesh Reddy", day: 20, reason: "Accepted ₹15 Lakhs cash temptation from prize money and walked out", avatar_url: "https://b374dd683233.blob.upstash.io/MYDHILI.jpg" }
    ],
    evicted: [],
    notes: [
      "Mukesh voted Star Housemate on Day 14. On Day 15, he accepted the Temptation to take Captain Jhansi's immunity for himself.",
      "Envelope race nominations: Ramprasad won vs Charan (nominated Vamsi, passed 1 to Rohit who nominated Sudheer); Varshini won vs Debjani (nominated Shalini, passed 1 to Sudheer who nominated Aman); Charan won vs Vamsi (nominated Jhansi, passed 1 to Debjani who nominated Thrigun); Mukesh won vs Vamsi (nominated Charan); Shalini won vs Naresh (nominated Varshini, passed 1 to Srishti who nominated Sudheer).",
      "Apoorva and Mithilesh entered from Agnipariksha 2 on Day 19 as Wildcards. Apoorva entered via twist; Mithilesh won tiebreaker task vs Ramakrishna.",
      "Mukesh & Apoorva won the Captaincy task on Day 19. Mukesh became House Captain; Apoorva won immunity for Week 5.",
      "On Day 20, Bigg Boss offered ₹15 Lakhs briefcase cash temptation. Mithilesh accepted and walked out!"
    ]
  },
  {
    week: 4,
    theme: "Dasavatharam (The Ten Forms)",
    captain: "Nihar Mukesh Gowda",
    captain_nominations: "Immunity granted to Apoorva",
    public_vote_nominees: [
      "Thrigun", "Varshini Sounderajan", "Charan Mahadev", "Jhansi",
      "Temper Vamsi", "Sudheer Reddy", "Aman Masud", "Shalini Damera Patel"
    ],
    evicted: [],
    notes: [
      "Week 4 eviction ballot is live across Star Maa and JioHotstar.",
      "Nihar Mukesh Gowda holds House Captaincy; Apoorva holds Immunity.",
      "8 housemates are currently facing the community eviction vote."
    ]
  }
];

export const INITIAL_CONTESTANTS: Contestant[] = [
  {
    id: "c_thrigun",
    season_id: "s_telugu_v10",
    name: "Thrigun (Adith Eswaran)",
    telugu_name: "త్రిగుణ్ (ఆదిత్ ఈశ్వరన్)",
    slug: "thrigun",
    avatar_url: "https://b374dd683233.blob.upstash.io/THRIGUN.jpg",
    profession: "Film Actor",
    short_bio: "Acclaimed actor known for lead and supporting roles in Katha, Chennai Love Story, and PSV Garuda Vega. Strategic, composed, and holder of the Takeover special power.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Takeover",
      description: "Can cancel another housemate's power and take over its advantage.",
      outcome: "Active - Kept secret in reserve",
      holder: "Thrigun"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev"], note: "Voted during Day 4 mid-week eviction" },
      { week: 2, targets: ["Sudheer Reddy", "Rohit Naidu Patnam"], note: "Won Golden Axe vs Srishti" },
      { week: 4, targets: ["Apoorva"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Sudheer Reddy", "Debjani Modak", "Rohit Naidu Patnam"], note: "Received 3 direct axe nominations" },
      { week: 3, nominators: ["Debjani Modak (via Charan)"], note: "Envelope pass nomination" }
    ],
    pulse_score: 78,
    pulse_change: 6.4,
    trend_direction: "up",
    nomination_count: 3,
    days_in_house: 24,
    sparkline: [62, 65, 68, 70, 72, 75, 78],
    quote: "In this house, staying grounded while others play to the gallery is the real strength.",
    discussion_count: 2450,
    poll_support_pct: 26.5,
    risk_score: 16,
    wikipedia_url: "https://en.wikipedia.org/wiki/Thrigun",
    milestones: [
      { date: "Day 1", episode: 1, title: "Grand Entry & Power Key", description: "Entered house on Day 1 and won the opening Power Key trial.", signal_type: "entry" },
      { date: "Day 2", episode: 2, title: "Won Takeover Power", description: "Awarded the game-changing Takeover power among the 10 Special Powers.", signal_type: "task_win" },
      { date: "Day 6", episode: 6, title: "Earned Official Status", description: "Earned full housemate status through overwhelming public vote in Week 1.", signal_type: "high_pulse" },
      { date: "Day 11", episode: 11, title: "Defended Captaincy Spot", description: "Challenged by returning housemate Charan; won the showdown to keep captaincy contendership.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_varshini",
    season_id: "s_telugu_v10",
    name: "Varshini Sounderajan",
    telugu_name: "వర్షిణి సౌందరరాజన్",
    slug: "varshini-sounderajan",
    avatar_url: "https://b374dd683233.blob.upstash.io/VARSHINI.jpg",
    profession: "Actress & Television Host",
    short_bio: "Celebrated anchor and actress famous for Pelli Gola web series and Dhee championship. Fearless, outspoken, and holder of the Grab Any Win power.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Grab Any Win",
      description: "Can snatch another housemate's task victory immediately after they win.",
      outcome: "Active - Subject to Week 1 Washroom Duty penalty by Shalini",
      holder: "Varshini Sounderajan"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev", "Chaitra Rai"], note: "Voted in Day 4 and Day 5 mid-week evictions" },
      { week: 3, targets: ["Shalini Damera Patel"], note: "Won envelope race vs Debjani, passed 1 to Sudheer" },
      { week: 4, targets: ["Ramakrishna"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Rohit Naidu Patnam (Golden Axe)"], note: "Lost axe race to Rohit" },
      { week: 3, nominators: ["Shalini Damera Patel"], note: "Envelope race nomination" }
    ],
    pulse_score: 72,
    pulse_change: 4.8,
    trend_direction: "up",
    nomination_count: 3,
    days_in_house: 24,
    sparkline: [56, 59, 61, 64, 67, 70, 72],
    quote: "You can assign me house penalties or nominations, but you cannot shake my spirit.",
    discussion_count: 2180,
    poll_support_pct: 21.0,
    risk_score: 22,
    wikipedia_url: "https://en.wikipedia.org/wiki/Varshini_Sounderajan",
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entry & Power Key", description: "Entered house with high energy and won opening Power Key.", signal_type: "entry" },
      { date: "Day 2", episode: 2, title: "Grab Any Win Power", description: "Revealed as holder of the Grab Any Win special power.", signal_type: "task_win" },
      { date: "Day 5", episode: 5, title: "Imposed Washroom Penalty", description: "Shalini used House Duty Penalty on Varshini, assigning perpetual washroom duty.", signal_type: "dispute" },
      { date: "Day 16", episode: 16, title: "Envelope Race Victory", description: "Defeated Debjani in envelope sprint to seize Week 3 nominations control.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_mukesh",
    season_id: "s_telugu_v10",
    name: "Nihar Mukesh Gowda",
    telugu_name: "నిహార్ ముఖేష్ గౌడ",
    slug: "nihar-mukesh-gowda",
    avatar_url: "https://b374dd683233.blob.upstash.io/MUKESH.jpg",
    profession: "Television Lead Actor",
    short_bio: "Television heartthrob known for Guppedantha Manasu and Kannadathi. Current House Captain of Week 4 after winning the captaincy task with Apoorva.",
    status: "captain",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Resurrection",
      description: "Can revive an already used special power and return it to its original owner.",
      outcome: "Active in Reserve - Currently serving as House Captain",
      holder: "Nihar Mukesh Gowda"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev"], note: "Voted during Day 4 mid-week eviction" },
      { week: 3, targets: ["Charan Mahadev"], note: "Won envelope race vs Vamsi" },
      { week: 4, targets: ["Ramakrishna"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Aman Masud (Golden Axe)", "Temper Vamsi (Golden Axe)"], note: "Lost axe race to Aman" }
    ],
    pulse_score: 75,
    pulse_change: 8.5,
    trend_direction: "up",
    nomination_count: 2,
    days_in_house: 24,
    sparkline: [58, 60, 63, 67, 69, 71, 75],
    quote: "Temptation without courage is useless; I took immunity on Day 15 and backed it up by winning Captaincy.",
    discussion_count: 1940,
    poll_support_pct: 18.5,
    risk_score: 10,
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entry", description: "Entered on Day 1 as one of the prime celebrity housemates.", signal_type: "entry" },
      { date: "Day 14", episode: 14, title: "Star Housemate Honor", description: "Voted Star Housemate by majority house vote in Week 2.", signal_type: "high_pulse" },
      { date: "Day 15", episode: 15, title: "Temptation Immunity Seizure", description: "Accepted temptation to strip Captain Jhansi's immunity for himself.", signal_type: "dispute" },
      { date: "Day 19", episode: 19, title: "Won Week 4 Captaincy", description: "Partnered with Apoorva to win final captaincy task; sworn in as House Captain.", signal_type: "captaincy" }
    ]
  },
  {
    id: "c_jhansi",
    season_id: "s_telugu_v10",
    name: "Jhansi",
    telugu_name: "ఝాన్సీ",
    slug: "jhansi",
    avatar_url: "https://b374dd683233.blob.upstash.io/JHANSI.jpg",
    profession: "Folk Singer (Commoner - Agnipariksha 2)",
    short_bio: "Soulful Telangana folk singer who qualified through Agnipariksha 2. Became the first House Captain in Week 2 and holds the coveted Eviction-Free special power.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: true,
    special_power: {
      name: "Eviction-Free",
      description: "Can activate power to stay safe from that week's elimination.",
      outcome: "Active - Available to trigger during eviction crunch",
      holder: "Jhansi"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev"], note: "Voted in Day 4 mid-week eviction" },
      { week: 3, targets: [], note: "Decider in Charan vs Ramprasad envelope race" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Sudheer Reddy", "Rohit Naidu Patnam", "Aman Masud"], note: "Lost axe race to Sudheer" },
      { week: 3, nominators: ["Charan Mahadev"], note: "Nominated after Mukesh stripped her captaincy immunity" }
    ],
    pulse_score: 69,
    pulse_change: 3.2,
    trend_direction: "up",
    nomination_count: 3,
    days_in_house: 24,
    sparkline: [52, 57, 61, 63, 66, 68, 69],
    quote: "My songs carry the soil of Telangana; this house cannot dampen my voice.",
    discussion_count: 1650,
    poll_support_pct: 12.0,
    risk_score: 28,
    milestones: [
      { date: "Day 1", episode: 1, title: "Agnipariksha 2 Entry", description: "Entered house after winning selection in Bigg Boss Agnipariksha 2.", signal_type: "entry" },
      { date: "Day 2", episode: 2, title: "Eviction-Free Power", description: "Earned the rare Eviction-Free shield.", signal_type: "task_win" },
      { date: "Day 12", episode: 12, title: "First House Captain", description: "Defeated Ramprasad in captaincy trial to become Week 2 House Captain.", signal_type: "captaincy" },
      { date: "Day 15", episode: 15, title: "Immunity Stripped by Twist", description: "Mukesh seized her captaincy immunity as part of Temptation vs Tension twist.", signal_type: "dispute" }
    ]
  },
  {
    id: "c_ramprasad",
    season_id: "s_telugu_v10",
    name: "Auto Ramprasad",
    telugu_name: "ఆటో రాంప్రసాద్",
    slug: "auto-ramprasad",
    avatar_url: "https://b374dd683233.blob.upstash.io/RAM%20PRASAD.jpg",
    profession: "Comedian & Television Actor",
    short_bio: "Jabardasth comedy icon celebrated for lightning spontaneous punches. Survived Day 4 high-risk eviction and holds the Save Shield power.",
    status: "active",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Save Shield",
      description: "The power holder can save himself or another nominated housemate from the eviction ballot.",
      outcome: "Active - Unused in reserve",
      holder: "Auto Ramprasad"
    },
    nominations_given: [
      { week: 3, targets: ["Temper Vamsi"], note: "Won envelope race vs Charan, passed 1 to Rohit" },
      { week: 4, targets: ["Mithilesh Reddy"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Aman Masud", "Rohit Naidu Patnam", "Shalini Damera Patel", "Shiva Srishti Vyakaranam"], note: "Faced Day 4 mid-week eviction; saved 9-4 vs Charan" },
      { week: 2, nominators: ["Aman Masud", "Temper Vamsi"], note: "Lost axe race to Vamsi" }
    ],
    pulse_score: 66,
    pulse_change: 2.1,
    trend_direction: "up",
    nomination_count: 2,
    days_in_house: 24,
    sparkline: [54, 57, 59, 61, 63, 65, 66],
    quote: "Punchlines are for the stage; in this house, patience is the ultimate defense.",
    discussion_count: 1480,
    poll_support_pct: 8.5,
    risk_score: 25,
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entrance", description: "Brought instant laughs to the Bigg Boss stage.", signal_type: "entry" },
      { date: "Day 4", episode: 4, title: "Survived Mid-Week Eviction", description: "Faced Charan in surprise house vote; survived with 9-4 majority.", signal_type: "high_pulse" },
      { date: "Day 5", episode: 5, title: "Won Housemate Status", description: "Won physical task to earn official housemate badge.", signal_type: "task_win" },
      { date: "Day 16", episode: 16, title: "Envelope Race Victory", description: "Outsprinted Charan to seize envelope nominations.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_vamsi",
    season_id: "s_telugu_v10",
    name: "Temper Vamsi",
    telugu_name: "టెంపర్ వంశీ",
    slug: "temper-vamsi",
    avatar_url: "https://b374dd683233.blob.upstash.io/TEMPER%20VAMSHI.jpg",
    profession: "Film Actor & Action Artist",
    short_bio: "Dynamic powerhouse actor from Pushpa: The Rise, Saaho, Double iSmart, and Bharat Ane Nenu. Fierce task contender holding the Captain's Roadblock power.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Captain's Roadblock",
      description: "Can block a selected housemate from the captaincy race for 2 consecutive weeks.",
      outcome: "Active in Reserve",
      holder: "Temper Vamsi"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev"], note: "Voted in Day 4 mid-week eviction" },
      { week: 2, targets: ["Debjani Modak", "Nihar Mukesh Gowda"], note: "Won Golden Axe vs Ramprasad" },
      { week: 4, targets: ["Ramakrishna"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 3, nominators: ["Auto Ramprasad"], note: "Envelope race nomination" }
    ],
    pulse_score: 64,
    pulse_change: -1.5,
    trend_direction: "down",
    nomination_count: 2,
    days_in_house: 24,
    sparkline: [60, 62, 65, 67, 66, 65, 64],
    quote: "Action speaks louder than group lobbying. When tasks begin, talkers step aside.",
    discussion_count: 1390,
    poll_support_pct: 6.8,
    risk_score: 34,
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entrance", description: "Entered house on Day 1 with high physical confidence.", signal_type: "entry" },
      { date: "Day 3", episode: 3, title: "Earned Early Housemate Badge", description: "Won physical trial with Rohit on Day 3 to become official housemates.", signal_type: "task_win" },
      { date: "Day 8", episode: 8, title: "Golden Axe Win", description: "Defeated Ramprasad in pole & axe sprint to capture Golden Axe.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_sudheer",
    season_id: "s_telugu_v10",
    name: "Sudheer Reddy",
    telugu_name: "సుధీర్ రెడ్డి",
    slug: "sudheer-reddy",
    avatar_url: "https://b374dd683233.blob.upstash.io/SUDHEER.jpg",
    profession: "Digital Creator & Anchor",
    short_bio: "Analytical media personality and digital content creator. Won the Curse of Nomination power in a dramatic Day 7 task after housemates revoked it from Srishti.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Curse of Nomination",
      description: "Can directly nominate any housemate into danger during the next nomination process.",
      outcome: "Won on Day 7 after house stripped Srishti's power",
      holder: "Sudheer Reddy"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev", "Chaitra Rai"], note: "Voted in Day 4 and Day 5 mid-week evictions" },
      { week: 2, targets: ["Thrigun", "Shalini Damera Patel"], note: "Won Golden Axe vs Jhansi" },
      { week: 3, targets: ["Aman Masud"], note: "Received nomination pass from Varshini" },
      { week: 4, targets: ["Apoorva"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Chaitra Rai"], note: "Faced Day 5 mid-week 4-way vote" },
      { week: 2, nominators: ["Thrigun"], note: "Golden axe nomination" },
      { week: 3, nominators: ["Rohit Naidu Patnam", "Shiva Srishti Vyakaranam"], note: "Received 2 envelope pass nominations" }
    ],
    pulse_score: 61,
    pulse_change: -2.8,
    trend_direction: "down",
    nomination_count: 3,
    days_in_house: 24,
    sparkline: [58, 62, 65, 66, 64, 63, 61],
    quote: "Content creators understand audience pulse better than anybody else; watch how the game flips.",
    discussion_count: 1720,
    poll_support_pct: 5.4,
    risk_score: 42,
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entrance", description: "Entered house with sharp analytical commentary.", signal_type: "entry" },
      { date: "Day 5", episode: 5, title: "Survived Day 5 Eviction", description: "Survived the tense 4-way internal vote that evicted Chaitra.", signal_type: "high_pulse" },
      { date: "Day 7", episode: 7, title: "Captured Curse of Nomination", description: "Won the high-stakes task to claim Srishti's revoked nomination curse.", signal_type: "task_win" },
      { date: "Day 8", episode: 8, title: "Golden Axe Victory", description: "Defeated Jhansi in axe sprint to secure two direct nominations.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_charan",
    season_id: "s_telugu_v10",
    name: "Charan Mahadev",
    telugu_name: "చరణ్ మహాదేవ్",
    slug: "charan-mahadev",
    avatar_url: "https://b374dd683233.blob.upstash.io/CHARAN.jpg",
    profession: "Radio Jockey (Commoner - Agnipariksha 2)",
    short_bio: "Radio Jockey who suffered a shock Day 4 house eviction, only for the Telugu public to vote him back into the house on Day 11 under the Power of People twist.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: true,
    nominations_given: [
      { week: 3, targets: ["Jhansi"], note: "Won envelope race vs Vamsi, passed 1 to Debjani who nominated Thrigun" },
      { week: 4, targets: ["Apoorva"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Debjani", "Jhansi", "Mukesh", "Naresh", "Sudheer", "Thrigun", "Vamsi", "Varshini", "Krishnudu"], note: "Evicted Day 4 with 9 house votes" },
      { week: 3, nominators: ["Nihar Mukesh Gowda"], note: "Envelope race nomination" }
    ],
    pulse_score: 65,
    pulse_change: 9.2,
    trend_direction: "up",
    nomination_count: 2,
    days_in_house: 17,
    sparkline: [40, 42, 45, 50, 58, 62, 65],
    quote: "The housemates threw me out in 4 days, but the Telugu audience brought me back on Day 11.",
    discussion_count: 2210,
    poll_support_pct: 14.5,
    risk_score: 24,
    milestones: [
      { date: "Day 1", episode: 1, title: "Agnipariksha 2 Entry", description: "Qualified as commoner through Bigg Boss Agnipariksha 2.", signal_type: "entry" },
      { date: "Day 4", episode: 4, title: "Shock Mid-Week Eviction", description: "Evicted by 9-4 house vote against Ramprasad in surprise eviction.", signal_type: "dispute" },
      { date: "Day 11", episode: 11, title: "Historic Public Re-Entry", description: "Voted back into the house by public vote under Power of People twist.", signal_type: "high_pulse" },
      { date: "Day 16", episode: 16, title: "Won Envelope Sprint", description: "Outsprinted Vamsi to control Week 3 nomination envelope.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_debjani",
    season_id: "s_telugu_v10",
    name: "Debjani Modak",
    telugu_name: "దేబ్జాని మోదక్",
    slug: "debjani-modak",
    avatar_url: "https://b374dd683233.blob.upstash.io/DHEBJANI.jpg",
    profession: "Television Actress",
    short_bio: "Graceful television star known for Ennenno Janmala Bandham, Rasathi, and Vaanathai Pola. Plays with steady patience and dignity.",
    status: "active",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev"], note: "Day 4 mid-week eviction vote" },
      { week: 2, targets: ["Thrigun"], note: "Won Silver Axe vs Krishnudu" },
      { week: 3, targets: ["Thrigun"], note: "Received nomination chance from Charan" },
      { week: 4, targets: ["Ramakrishna"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Temper Vamsi (Golden Axe)"], note: "Nominated in Week 2" }
    ],
    pulse_score: 58,
    pulse_change: 1.4,
    trend_direction: "up",
    nomination_count: 2,
    days_in_house: 24,
    sparkline: [50, 52, 54, 55, 56, 57, 58],
    quote: "Dignity and clarity are far more enduring than synthetic drama.",
    discussion_count: 1140,
    poll_support_pct: 4.8,
    risk_score: 30,
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entry", description: "Entered house with artistic elegance.", signal_type: "entry" },
      { date: "Day 6", episode: 6, title: "Earned Housemate Badge", description: "Earned status via public vote on Day 6.", signal_type: "task_win" },
      { date: "Day 8", episode: 8, title: "Silver Axe Victory", description: "Defeated Krishnudu in axe race to claim Silver Axe.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_naresh",
    season_id: "s_telugu_v10",
    name: "Naresh",
    telugu_name: "నరేష్",
    slug: "naresh",
    avatar_url: "https://b374dd683233.blob.upstash.io/NARESH.jpg",
    profession: "Comedian (Jabardasth)",
    short_bio: "Jabardasth comedy artist who defuses tense living room moments with sharp humor. Holds the Double Vote (2X) power.",
    status: "active",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Double Vote (2X)",
      description: "Can select a housemate to receive double votes against them during nominations.",
      outcome: "Active in Reserve",
      holder: "Naresh"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev"], note: "Day 4 mid-week eviction vote" },
      { week: 2, targets: ["Shalini Damera Patel"], note: "Won Silver Axe vs Shalini" },
      { week: 4, targets: ["Ramakrishna"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" }
    ],
    pulse_score: 55,
    pulse_change: 0.8,
    trend_direction: "stable",
    nomination_count: 1,
    days_in_house: 24,
    sparkline: [52, 53, 54, 55, 54, 55, 55],
    quote: "Make them laugh in the morning so they hesitate when holding the nomination slate at night.",
    discussion_count: 980,
    poll_support_pct: 3.2,
    risk_score: 35,
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entry", description: "Brought comedic energy to opening day.", signal_type: "entry" },
      { date: "Day 7", episode: 7, title: "Earned Housemate Status", description: "Earned official housemate status on Day 7.", signal_type: "task_win" },
      { date: "Day 8", episode: 8, title: "Won Silver Axe", description: "Defeated Shalini in axe sprint to win Silver Axe nomination.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_aman",
    season_id: "s_telugu_v10",
    name: "Aman Masud",
    telugu_name: "అమాన్ మసూద్",
    slug: "aman-masud",
    avatar_url: "https://b374dd683233.blob.upstash.io/AMAN.jpg",
    profession: "Actor & Model (Commoner - Agnipariksha 2)",
    short_bio: "Agnipariksha 2 commoner who established himself as a fierce physical performer, winning the Golden Axe in Week 2 against Mukesh.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: true,
    nominations_given: [
      { week: 1, targets: ["Auto Ramprasad", "Chaitra Rai"], note: "Voted in Day 4 and Day 5 mid-week votes" },
      { week: 2, targets: ["Auto Ramprasad", "Jhansi"], note: "Won Golden Axe vs Mukesh" },
      { week: 4, targets: ["Mithilesh Reddy"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 3, nominators: ["Sudheer Reddy (via Varshini)"], note: "Envelope pass nomination" }
    ],
    pulse_score: 59,
    pulse_change: 1.2,
    trend_direction: "up",
    nomination_count: 2,
    days_in_house: 24,
    sparkline: [51, 53, 55, 57, 58, 58, 59],
    quote: "Commoner tag is just an entry label; my mindset inside the arena is 100% contender.",
    discussion_count: 1240,
    poll_support_pct: 4.2,
    risk_score: 38,
    milestones: [
      { date: "Day 1", episode: 1, title: "Agnipariksha 2 Entry", description: "Entered house after topping Agnipariksha 2 fitness trials.", signal_type: "entry" },
      { date: "Day 8", episode: 8, title: "Golden Axe Win Over Mukesh", description: "Outran celebrity actor Mukesh in pole sprint to claim Golden Axe.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_shalini",
    season_id: "s_telugu_v10",
    name: "Shalini Damera Patel",
    telugu_name: "శాలిని దామెర పటేల్",
    slug: "shalini-damera-patel",
    avatar_url: "https://b374dd683233.blob.upstash.io/SHALINI.jpg",
    profession: "Social Media Personality (Commoner)",
    short_bio: "Youth digital influencer from Agnipariksha 2 who made the boldest early move by using House Duty Penalty on Varshini.",
    status: "nominated",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: true,
    special_power: {
      name: "House Duty Penalty",
      description: "Can assign a perpetual house duty to any housemate until they exit.",
      outcome: "Used in Week 1 - Assigned washroom duty to Varshini",
      holder: "Shalini Damera Patel"
    },
    nominations_given: [
      { week: 1, targets: ["Auto Ramprasad"], note: "Day 4 mid-week eviction vote" },
      { week: 3, targets: ["Varshini Sounderajan"], note: "Won envelope race vs Naresh, passed 1 to Srishti" },
      { week: 4, targets: ["Mithilesh Reddy"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Sudheer Reddy (Golden Axe)", "Naresh (Silver Axe)"], note: "Received 2 axe nominations" },
      { week: 3, nominators: ["Varshini Sounderajan"], note: "Envelope race nomination" }
    ],
    pulse_score: 57,
    pulse_change: -3.1,
    trend_direction: "down",
    nomination_count: 3,
    days_in_house: 24,
    sparkline: [58, 61, 62, 63, 60, 58, 57],
    quote: "I don't shy away from conflict or duty penalties; I stand by every decision I take.",
    discussion_count: 1530,
    poll_support_pct: 3.5,
    risk_score: 45,
    milestones: [
      { date: "Day 1", episode: 1, title: "Agnipariksha 2 Entry", description: "Qualified through Agnipariksha 2 selection.", signal_type: "entry" },
      { date: "Day 2", episode: 2, title: "House Duty Penalty Power", description: "Awarded the House Duty Penalty power.", signal_type: "task_win" },
      { date: "Day 5", episode: 5, title: "Penalized Varshini", description: "Assigned perpetual washroom duty to Varshini.", signal_type: "dispute" }
    ]
  },
  {
    id: "c_srishti",
    season_id: "s_telugu_v10",
    name: "Shiva Srishti Vyakaranam",
    telugu_name: "శివ సృష్టి వ్యాకరణం",
    slug: "shiva-srishti-vyakaranam",
    avatar_url: "https://b374dd683233.blob.upstash.io/SRISHTI.jpg",
    profession: "Fashion Model (Commoner - Agnipariksha 2)",
    short_bio: "Agnipariksha 2 fashion model who bounced back with resilience after housemates voted to strip her Curse of Nomination power on Day 7.",
    status: "active",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: true,
    nominations_given: [
      { week: 1, targets: ["Auto Ramprasad"], note: "Day 4 mid-week eviction vote" },
      { week: 3, targets: ["Sudheer Reddy"], note: "Received nomination chance from Shalini" },
      { week: 4, targets: ["Mithilesh Reddy"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Thrigun (Golden Axe)"], note: "Lost axe race to Thrigun" }
    ],
    pulse_score: 52,
    pulse_change: 0.5,
    trend_direction: "stable",
    nomination_count: 2,
    days_in_house: 24,
    sparkline: [48, 50, 52, 51, 52, 52, 52],
    quote: "Taking away my power on Day 7 only made me more determined to survive without shields.",
    discussion_count: 890,
    poll_support_pct: 2.1,
    risk_score: 40,
    milestones: [
      { date: "Day 1", episode: 1, title: "Agnipariksha 2 Entry", description: "Selected into Bigg Boss 10 through Agnipariksha 2.", signal_type: "entry" },
      { date: "Day 7", episode: 7, title: "Power Revoked by House Vote", description: "Housemates voted to strip her Curse of Nomination power.", signal_type: "dispute" }
    ]
  },
  {
    id: "c_rohit",
    season_id: "s_telugu_v10",
    name: "Rohit Naidu Patnam",
    telugu_name: "రోహిత్ నాయుడు పట్నం",
    slug: "rohit-naidu-patnam",
    avatar_url: "https://b374dd683233.blob.upstash.io/ROHIT.jpg",
    profession: "Social Media Personality (Commoner)",
    short_bio: "Agnipariksha 2 commoner who won official housemate status on Day 3 by clinching the physical trial alongside Vamsi.",
    status: "active",
    day_entered: 1,
    day_exited: null,
    is_wildcard: false,
    is_commoner: true,
    nominations_given: [
      { week: 1, targets: ["Auto Ramprasad"], note: "Day 4 mid-week eviction vote" },
      { week: 2, targets: ["Thrigun", "Jhansi"], note: "Won Golden Axe vs Varshini" },
      { week: 3, targets: ["Sudheer Reddy"], note: "Received nomination chance from Ramprasad" },
      { week: 4, targets: ["Mithilesh Reddy"], note: "Secret house entry vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Thrigun (Golden Axe)"], note: "Nominated in Week 2" }
    ],
    pulse_score: 51,
    pulse_change: -0.4,
    trend_direction: "stable",
    nomination_count: 2,
    days_in_house: 24,
    sparkline: [47, 49, 52, 53, 52, 51, 51],
    quote: "I won official housemate status on Day 3 through sheer sweat; no shortcuts.",
    discussion_count: 760,
    poll_support_pct: 1.8,
    risk_score: 44,
    milestones: [
      { date: "Day 1", episode: 1, title: "Agnipariksha 2 Entry", description: "Entered house via Agnipariksha 2 selection.", signal_type: "entry" },
      { date: "Day 3", episode: 3, title: "Earned Early Status", description: "Won physical trial with Vamsi to earn housemate status.", signal_type: "task_win" },
      { date: "Day 8", episode: 8, title: "Golden Axe Win Over Varshini", description: "Defeated Varshini in pole sprint to claim Golden Axe.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_apoorva",
    season_id: "s_telugu_v10",
    name: "Apoorva",
    telugu_name: "అపూర్వ",
    slug: "apoorva",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    profession: "Model & Television Anchor (Wildcard)",
    short_bio: "Agnipariksha 2 wildcard entrant on Day 19 who entered via the Temptation vs Tension twist, then partnered with Mukesh to win Week 5 immunity in the captaincy trial.",
    status: "active",
    day_entered: 19,
    day_exited: null,
    is_wildcard: true,
    is_commoner: false,
    special_power: {
      name: "Week 5 Immunity",
      description: "Holds immunity from nominations for Week 5 after winning the Captaincy task with Mukesh.",
      outcome: "Active - Safe from Week 5 nominations",
      holder: "Apoorva"
    },
    nominations_given: [
      { week: 4, targets: ["Aman Masud", "Shiva Srishti Vyakaranam"], note: "Eliminated Aman & Srishti from captaincy race" }
    ],
    nominated_by: [
      { week: 4, nominators: ["Charan Mahadev", "Sudheer Reddy", "Thrigun"], note: "Secret house entry vote" }
    ],
    pulse_score: 68,
    pulse_change: 11.4,
    trend_direction: "up",
    nomination_count: 0,
    days_in_house: 6,
    sparkline: [45, 48, 52, 57, 62, 65, 68],
    quote: "I entered with the lowest house votes and walked out with Week 5 immunity in 24 hours.",
    discussion_count: 1890,
    poll_support_pct: 11.2,
    risk_score: 12,
    milestones: [
      { date: "Day 18", episode: 18, title: "Entered as Potential Housemate", description: "Entered with Mithilesh and Ramakrishna from Agnipariksha 2.", signal_type: "entry" },
      { date: "Day 19", episode: 19, title: "Temptation Twist Entry", description: "Granted official housemate status despite lowest secret house votes.", signal_type: "high_pulse" },
      { date: "Day 19", episode: 19, title: "Won Week 5 Immunity", description: "Partnered with Mukesh to win the captaincy task, securing immunity.", signal_type: "task_win" }
    ]
  },
  {
    id: "c_mithilesh",
    season_id: "s_telugu_v10",
    name: "Mithilesh Reddy",
    telugu_name: "మిథిలేష్ రెడ్డి",
    slug: "mithilesh-reddy",
    avatar_url: "https://b374dd683233.blob.upstash.io/MYDHILI.jpg",
    profession: "Model & Social Media Personality (Wildcard)",
    short_bio: "Agnipariksha 2 wildcard entrant on Day 19 who defeated Ramakrishna in a tiebreaker, then stunned the entire house by accepting ₹15 Lakhs cash temptation to walk on Day 20.",
    status: "walked",
    day_entered: 19,
    day_exited: 20,
    exit_reason: "Walked on Day 20 with ₹15 Lakhs cash temptation deducted from prize money",
    is_wildcard: true,
    is_commoner: true,
    nominations_given: [],
    nominated_by: [
      { week: 4, nominators: ["Aman", "Ramprasad", "Rohit", "Shalini", "Srishti"], note: "Secret house entry vote (5 votes, tied with Ramakrishna)" }
    ],
    pulse_score: 50,
    pulse_change: 0,
    trend_direction: "stable",
    nomination_count: 0,
    days_in_house: 2,
    sparkline: [40, 42, 45, 52, 54, 50, 50],
    quote: "When the briefcase opens with 15 Lakhs guaranteed cash on Day 20, a smart strategist knows when to cash out.",
    discussion_count: 2840,
    poll_support_pct: 0,
    risk_score: 0,
    milestones: [
      { date: "Day 18", episode: 18, title: "Entered as Potential Housemate", description: "Entered house alongside Apoorva and Ramakrishna.", signal_type: "entry" },
      { date: "Day 19", episode: 19, title: "Won Housemate Spot", description: "Defeated Ramakrishna in high-intensity tiebreaker task to enter house.", signal_type: "task_win" },
      { date: "Day 20", episode: 20, title: "Walked with ₹15 Lakhs", description: "Accepted ₹15 Lakhs briefcase temptation and exited the house voluntarily.", signal_type: "dispute" }
    ]
  },
  {
    id: "c_krishnudu",
    season_id: "s_telugu_v10",
    name: "Krishnudu",
    telugu_name: "కృష్ణుడు",
    slug: "krishnudu",
    avatar_url: "https://b374dd683233.blob.upstash.io/KRISHNUDU.jpg",
    profession: "Film Actor",
    short_bio: "Beloved Telugu cinema actor famous for Happy Days, Villagelo Vinayakudu, and Ala Modalaindi. Held the Switch special power but was evicted on Day 14.",
    status: "evicted",
    day_entered: 1,
    day_exited: 14,
    exit_reason: "Evicted on Day 14 after receiving fewest public votes in Week 2",
    is_wildcard: false,
    is_commoner: false,
    special_power: {
      name: "Switch",
      description: "Can swap housemates' positions in the house, but cannot be used during eviction.",
      outcome: "Lost / Unused - Evicted before triggering",
      holder: "Krishnudu"
    },
    nominations_given: [
      { week: 1, targets: ["Charan Mahadev"], note: "Day 4 mid-week eviction vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Bigg Boss (All Contestants)"], note: "Mahapariksha trial" },
      { week: 2, nominators: ["Debjani Modak (Silver Axe)"], note: "Lost axe race to Debjani; evicted Day 14" }
    ],
    pulse_score: 42,
    pulse_change: -8.0,
    trend_direction: "down",
    nomination_count: 2,
    days_in_house: 14,
    sparkline: [55, 52, 50, 48, 45, 43, 42],
    quote: "I played with love and pure intent; the audience verdict is always respected.",
    discussion_count: 1420,
    poll_support_pct: 0,
    risk_score: 100,
    wikipedia_url: "https://en.wikipedia.org/wiki/Krishnudu",
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entry", description: "Warm reception on launch night.", signal_type: "entry" },
      { date: "Day 2", episode: 2, title: "Switch Power", description: "Awarded the Switch special power.", signal_type: "task_win" },
      { date: "Day 14", episode: 14, title: "Evicted Day 14", description: "Received fewest public votes in 11-way Week 2 ballot.", signal_type: "dispute" }
    ]
  },
  {
    id: "c_chaitra",
    season_id: "s_telugu_v10",
    name: "Chaitra Rai",
    telugu_name: "చైత్ర రాయ్",
    slug: "chaitra-rai",
    avatar_url: "https://b374dd683233.blob.upstash.io/CHAITRA%20RAI.jpg",
    profession: "Television Actress",
    short_bio: "Renowned television actress famous for lead dual roles in Attarintlo Akka Chellelu and Radha Ramana. Evicted in surprise Day 5 internal vote.",
    status: "evicted",
    day_entered: 1,
    day_exited: 5,
    exit_reason: "Evicted on Day 5 during surprise mid-week housemates vote (3-1)",
    is_wildcard: false,
    is_commoner: false,
    nominations_given: [
      { week: 1, targets: ["Sudheer Reddy"], note: "Day 5 mid-week 4-way vote" }
    ],
    nominated_by: [
      { week: 1, nominators: ["Aman Masud", "Sudheer Reddy", "Varshini Sounderajan"], note: "Evicted 3-1 by housemates on Day 5" }
    ],
    pulse_score: 35,
    pulse_change: -12.0,
    trend_direction: "down",
    nomination_count: 1,
    days_in_house: 5,
    sparkline: [52, 48, 44, 38, 35, 35, 35],
    quote: "Five days was too short for the housemates to understand who I really am.",
    discussion_count: 1680,
    poll_support_pct: 0,
    risk_score: 100,
    milestones: [
      { date: "Day 1", episode: 1, title: "House Entry", description: "Entered house on premiere night.", signal_type: "entry" },
      { date: "Day 5", episode: 5, title: "Shock Day 5 Eviction", description: "Voted out by Aman, Sudheer, and Varshini in surprise 4-way vote.", signal_type: "dispute" }
    ]
  }
];

export const INITIAL_POLL: Poll = {
  id: "poll_bb10_week4",
  season_id: "s_telugu_v10",
  title: "Week 4 Community Eviction Poll (Dasavatharam)",
  description: "8 housemates face the public vote this week. Vote to save your favorite contender. (Audited Fan Ballot)",
  week_number: 4,
  status: "active",
  start_at: "2026-09-22T00:00:00Z",
  closes_at: "2026-09-27T23:59:59Z",
  total_votes: 28450,
  options: [
    { id: "opt_thrigun", poll_id: "poll_bb10_week4", contestant_id: "c_thrigun", contestant_name: "Thrigun (Adith Eswaran)", contestant_avatar: INITIAL_CONTESTANTS[0].avatar_url, vote_count: 8535, percentage: 30.0 },
    { id: "opt_varshini", poll_id: "poll_bb10_week4", contestant_id: "c_varshini", contestant_name: "Varshini Sounderajan", contestant_avatar: INITIAL_CONTESTANTS[1].avatar_url, vote_count: 6543, percentage: 23.0 },
    { id: "opt_charan", poll_id: "poll_bb10_week4", contestant_id: "c_charan", contestant_name: "Charan Mahadev", contestant_avatar: INITIAL_CONTESTANTS[7].avatar_url, vote_count: 4267, percentage: 15.0 },
    { id: "opt_jhansi", poll_id: "poll_bb10_week4", contestant_id: "c_jhansi", contestant_name: "Jhansi", contestant_avatar: INITIAL_CONTESTANTS[3].avatar_url, vote_count: 3414, percentage: 12.0 },
    { id: "opt_vamsi", poll_id: "poll_bb10_week4", contestant_id: "c_vamsi", contestant_name: "Temper Vamsi", contestant_avatar: INITIAL_CONTESTANTS[5].avatar_url, vote_count: 2276, percentage: 8.0 },
    { id: "opt_sudheer", poll_id: "poll_bb10_week4", contestant_id: "c_sudheer", contestant_name: "Sudheer Reddy", contestant_avatar: INITIAL_CONTESTANTS[6].avatar_url, vote_count: 1707, percentage: 6.0 },
    { id: "opt_aman", poll_id: "poll_bb10_week4", contestant_id: "c_aman", contestant_name: "Aman Masud", contestant_avatar: INITIAL_CONTESTANTS[10].avatar_url, vote_count: 996, percentage: 3.5 },
    { id: "opt_shalini", poll_id: "poll_bb10_week4", contestant_id: "c_shalini", contestant_name: "Shalini Damera Patel", contestant_avatar: INITIAL_CONTESTANTS[11].avatar_url, vote_count: 712, percentage: 2.5 }
  ],
  integrity_note: "One verified vote per BBPulse account. Sourced from Wikipedia Bigg Boss 10 Dasavatharam Week 4 nominations."
};

export const INITIAL_DEBATE: Debate = {
  id: "deb_bb10_mithilesh",
  season_id: "s_telugu_v10",
  episode_id: "ep_20",
  title: "Today's Debate: The ₹15 Lakhs Temptation Exit",
  question: "Was Mithilesh Reddy's decision to take ₹15 Lakhs cash briefcase on Day 20 a masterstroke or a betrayal?",
  context: "On Day 20, as part of the Temptation vs Tension twist, Bigg Boss offered ₹15 Lakhs cash from the prize money to leave immediately. Wildcard entrant Mithilesh accepted and walked out within 24 hours of winning the housemate spot.",
  status: "active",
  agree_percentage: 64,
  disagree_percentage: 36,
  agree_count: 2410,
  disagree_count: 1350,
  why_agree: [
    "A guaranteed ₹15 Lakhs cash in hand on Day 20 is mathematically superior to surviving 80 more days for an uncertain title.",
    "He played strictly within the official Temptation vs Tension rules announced by Bigg Boss.",
    "It proved he was a realistic strategist who prioritized tangible reward over house drama."
  ],
  why_disagree: [
    "He took away the housemate spot from Ramakrishna in the tiebreaker task only to quit 24 hours later.",
    "It reduced the total winner's prize money by a massive ₹15 Lakhs.",
    "Audience and fans expected him to fight for the trophy, not cash out at the first opportunity."
  ],
  responses: [
    {
      id: "dr_bb1",
      debate_id: "deb_bb10_mithilesh",
      user_id: "u_suresh",
      username: "suresh_vizag",
      user_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      stance: "agree",
      comment: "15 Lakhs tax-free guaranteed cash on Day 20 is genius. Most finalists don't even make that much after weeks of nominations stress.",
      created_at: "2h ago",
      featured: true
    },
    {
      id: "dr_bb2",
      debate_id: "deb_bb10_mithilesh",
      user_id: "u_harika",
      username: "harika_hyderabad",
      user_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      stance: "disagree",
      comment: "Feel terrible for Ramakrishna! He gave everything in that tiebreaker task. Mithilesh took his spot and abandoned it the next day.",
      created_at: "3h ago",
      featured: true
    }
  ]
};

export const INITIAL_EPISODE: Episode = {
  id: "ep_24",
  season_id: "s_telugu_v10",
  episode_number: 24,
  title: "Temptation vs Tension: The Captaincy & Briefcase Shock",
  air_date: "2026-09-25",
  status: "completed",
  duration: "1h 18m",
  summary: "Wildcards Apoorva and Mithilesh shake the house dynamics; Mukesh & Apoorva claim Week 4 captaincy and immunity, followed by Mithilesh's jaw-dropping ₹15 Lakhs briefcase exit.",
  highlights: [
    "Apoorva and Mithilesh enter house on Day 19 as Wildcards from Agnipariksha 2.",
    "Mukesh & Apoorva defeat Jhansi & Mithilesh in captaincy final.",
    "Mithilesh accepts ₹15 Lakhs temptation briefcase on Day 20 and walks out of Bigg Boss."
  ],
  events: [
    {
      id: "ev_1",
      episode_id: "ep_24",
      time_in_episode: "05:20",
      title: "Wildcard Induction Trial",
      event_type: "task",
      description: "Apoorva enters via Temptation twist; Mithilesh defeats Ramakrishna in tiebreaker challenge.",
      contestant_ids: ["c_apoorva", "c_mithilesh"]
    },
    {
      id: "ev_2",
      episode_id: "ep_24",
      time_in_episode: "25:40",
      title: "Captaincy Showdown",
      event_type: "task",
      description: "Mukesh and Apoorva win the final captaincy trial; Mukesh becomes House Captain.",
      contestant_ids: ["c_mukesh", "c_apoorva"]
    },
    {
      id: "ev_3",
      episode_id: "ep_24",
      time_in_episode: "48:15",
      title: "The ₹15 Lakhs Briefcase Offer",
      event_type: "reaction",
      description: "Bigg Boss places the ₹15 Lakhs cash briefcase in the living room; house goes silent in disbelief.",
      contestant_ids: ["c_mithilesh"]
    },
    {
      id: "ev_4",
      episode_id: "ep_24",
      time_in_episode: "62:30",
      title: "Mithilesh Walks Out",
      event_type: "debate",
      description: "Mithilesh accepts the briefcase and bids farewell to stunned housemates.",
      contestant_ids: ["c_mithilesh", "c_jhansi", "c_thrigun"]
    }
  ]
};

export const INITIAL_POSTS: Post[] = [
  {
    id: "post_1",
    user_id: "u_sravan",
    author_username: "sravan_hyderabad",
    author_name: "Sravan K",
    author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    season_id: "s_telugu_v10",
    contestant_id: "c_thrigun",
    contestant_name: "Thrigun (Adith Eswaran)",
    category: "opinion",
    title: "Why Thrigun's composure makes him the frontrunner for Bigg Boss 10 Dasavatharam",
    body: "In three weeks of intense trials and envelope nominations, Thrigun has never once raised his voice unnecessarily. He survived three consecutive nominations, held his Takeover power completely in secret, and defended his captaincy spot against Charan on Day 11.",
    created_at: "2h ago",
    agree_count: 512,
    disagree_count: 42,
    comment_count: 48,
    status: "published"
  },
  {
    id: "post_2",
    user_id: "u_venkat",
    author_username: "venkat_cinema",
    author_name: "Venkat R",
    author_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    season_id: "s_telugu_v10",
    contestant_id: "c_charan",
    contestant_name: "Charan Mahadev",
    category: "debate",
    title: "Charan Mahadev's return on Day 11 shows why public vote is the real boss",
    body: "The 9 housemates thought they buried Charan's journey on Day 4. Seven days later, the Telugu public voted him back with massive numbers under the Power of People twist. His envelope win in Week 3 was poetic justice.",
    created_at: "4h ago",
    agree_count: 438,
    disagree_count: 31,
    comment_count: 36,
    status: "published"
  },
  {
    id: "post_3",
    user_id: "u_chaitu",
    author_username: "chaitanya_guntur",
    author_name: "Chaitu",
    author_avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
    season_id: "s_telugu_v10",
    contestant_id: "c_varshini",
    contestant_name: "Varshini Sounderajan",
    category: "nomination",
    title: "Varshini's resilience after Shalini's washroom duty penalty",
    body: "Shalini used her House Duty Penalty to put Varshini on perpetual washroom duty in Week 1. Varshini didn't complain or create fake tears; she did the duty daily and won her envelope race in Week 3.",
    created_at: "5h ago",
    agree_count: 380,
    disagree_count: 24,
    comment_count: 22,
    status: "published"
  },
  {
    id: "post_4",
    user_id: "u_swathi",
    author_username: "swathi_vizag",
    author_name: "Swathi",
    author_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    season_id: "s_telugu_v10",
    contestant_id: "c_mukesh",
    contestant_name: "Nihar Mukesh Gowda",
    category: "task",
    title: "Mukesh Gowda's bold gameplay: Star Housemate to House Captain",
    body: "Taking Captain Jhansi's immunity on Day 15 was risky, but teaming up with wildcard Apoorva on Day 19 to win the captaincy trial proved Mukesh is playing to win, not just to survive.",
    created_at: "6h ago",
    agree_count: 295,
    disagree_count: 48,
    comment_count: 19,
    status: "published"
  }
];

export const INITIAL_PREDICTION_STATS: PredictionCommunityStat[] = [
  { contestant_id: "c_shalini", contestant_name: "Shalini Damera Patel", contestant_avatar: INITIAL_CONTESTANTS[11].avatar_url, community_pct: 42.5, risk_score: 74, total_predictions: 6420, trend: "up" },
  { contestant_id: "c_aman", contestant_name: "Aman Masud", contestant_avatar: INITIAL_CONTESTANTS[10].avatar_url, community_pct: 28.0, risk_score: 62, total_predictions: 4210, trend: "up" },
  { contestant_id: "c_sudheer", contestant_name: "Sudheer Reddy", contestant_avatar: INITIAL_CONTESTANTS[6].avatar_url, community_pct: 14.5, risk_score: 54, total_predictions: 2190, trend: "down" },
  { contestant_id: "c_vamsi", contestant_name: "Temper Vamsi", contestant_avatar: INITIAL_CONTESTANTS[5].avatar_url, community_pct: 7.2, risk_score: 38, total_predictions: 1120, trend: "down" },
  { contestant_id: "c_jhansi", contestant_name: "Jhansi", contestant_avatar: INITIAL_CONTESTANTS[3].avatar_url, community_pct: 4.1, risk_score: 28, total_predictions: 640, trend: "down" },
  { contestant_id: "c_charan", contestant_name: "Charan Mahadev", contestant_avatar: INITIAL_CONTESTANTS[7].avatar_url, community_pct: 2.1, risk_score: 22, total_predictions: 310, trend: "down" },
  { contestant_id: "c_varshini", contestant_name: "Varshini Sounderajan", contestant_avatar: INITIAL_CONTESTANTS[1].avatar_url, community_pct: 1.0, risk_score: 18, total_predictions: 150, trend: "down" },
  { contestant_id: "c_thrigun", contestant_name: "Thrigun (Adith Eswaran)", contestant_avatar: INITIAL_CONTESTANTS[0].avatar_url, community_pct: 0.6, risk_score: 14, total_predictions: 95, trend: "down" }
];

export const INITIAL_LEADERBOARD: PredictionLeaderboardEntry[] = [
  { rank: 1, username: "telugu_pulse_master", avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80", accuracy: 94, predictions_count: 28, correct_count: 26, current_streak: 7 },
  { rank: 2, username: "bb10_analyst_raj", avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", accuracy: 89, predictions_count: 26, correct_count: 23, current_streak: 5 },
  { rank: 3, username: "nithin24", avatar_url: INITIAL_USER.avatar_url, accuracy: 83, predictions_count: 18, correct_count: 15, current_streak: 4 },
  { rank: 4, username: "jhansi_folk_hyd", avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", accuracy: 79, predictions_count: 22, correct_count: 17, current_streak: 3 },
  { rank: 5, username: "thrigun_trends", avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", accuracy: 76, predictions_count: 20, correct_count: 15, current_streak: 2 }
];

export const INITIAL_ROUNDUPS: PollRoundupItem[] = [
  {
    id: "rnd_1",
    source_name: "Telugu Bigg Boss Portal Week 4 Poll",
    source_type: "fan_portal",
    date_checked: "2026-09-26",
    source_url: "https://example.com/telugu-fan-pulse-week4",
    status: "verified",
    results: [
      { contestant_name: "Thrigun", percentage: 29.5 },
      { contestant_name: "Varshini Sounderajan", percentage: 22.8 },
      { contestant_name: "Charan Mahadev", percentage: 16.2 },
      { contestant_name: "Jhansi", percentage: 12.5 },
      { contestant_name: "Temper Vamsi", percentage: 8.4 },
      { contestant_name: "Sudheer Reddy", percentage: 5.6 },
      { contestant_name: "Aman Masud", percentage: 3.1 },
      { contestant_name: "Shalini Damera Patel", percentage: 1.9 }
    ],
    notes: "Verified external fan portal survey. Sample size: 12,400 recorded votes.",
    submitted_by: "moderator_team"
  },
  {
    id: "rnd_2",
    source_name: "CineChowk Media BB10 Survey",
    source_type: "media_poll",
    date_checked: "2026-09-26",
    source_url: "https://example.com/cinechowk-bb10-survey",
    status: "verified",
    results: [
      { contestant_name: "Thrigun", percentage: 31.0 },
      { contestant_name: "Varshini Sounderajan", percentage: 24.2 },
      { contestant_name: "Charan Mahadev", percentage: 14.8 },
      { contestant_name: "Jhansi", percentage: 11.2 },
      { contestant_name: "Temper Vamsi", percentage: 7.9 },
      { contestant_name: "Sudheer Reddy", percentage: 5.8 },
      { contestant_name: "Aman Masud", percentage: 3.2 },
      { contestant_name: "Shalini Damera Patel", percentage: 1.9 }
    ],
    notes: "Editorial public survey. Verified independently.",
    submitted_by: "moderator_team"
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: "rep_101",
    reporter_id: "usr_99",
    reporter_username: "ravi_kumar_7",
    target_type: "post",
    target_id: "post_999",
    target_author: "anonymous_spammer",
    content_snippet: "Fake rumors about private life and family members of contestant...",
    reason: "Personal attack",
    description: "Contains unsubstantiated allegations violating community rule on in-show focus.",
    status: "pending",
    created_at: "45 min ago"
  },
  {
    id: "rep_102",
    reporter_id: "usr_88",
    reporter_username: "sneha_reddy",
    target_type: "comment",
    target_id: "com_442",
    target_author: "troll_user_44",
    content_snippet: "Repetitive copy-paste vote manipulation links across discussions.",
    reason: "Spam",
    description: "Posting external third-party survey links promising gifts.",
    status: "reviewing",
    created_at: "2h ago"
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_1",
    user_id: "usr_001",
    type: "poll_closing",
    title: "Week 4 Eviction Ballot Closes Tonight",
    message: "Community voting for Week 4 closes in 4 hours. See current leader standings for Thrigun and Varshini.",
    read: false,
    created_at: "30m ago",
    link: "/vote"
  },
  {
    id: "notif_2",
    user_id: "usr_001",
    type: "debate_open",
    title: "Mithilesh's ₹15L Exit Debate is Live",
    message: "'Was Mithilesh's ₹15 Lakhs cash exit justified?' 64% of fans agree.",
    read: false,
    created_at: "2h ago",
    link: "/discuss"
  },
  {
    id: "notif_3",
    user_id: "usr_001",
    type: "reply",
    title: "New reply on your post",
    message: "suresh_vizag agreed with your comment on Thrigun's task strategy.",
    read: true,
    created_at: "1d ago",
    link: "/discuss/post_1"
  }
];
