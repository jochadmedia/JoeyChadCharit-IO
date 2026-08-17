export type NavigationTab =
  | 'coach'
  | 'skillswap'
  | 'ar_memory'
  | 'challenges'
  | 'academy'
  | 'charity'
  | 'team_hq'
  | 'scout_radar'
  | 'clubhouse_tv'
  | 'prematch_radar'
  | 'junior_growth'
  | 'players'
  | 'teams'
  | 'matches'
  | 'profile';

export interface SquadMember {
  id: string;
  name: string;
  position: string;
  avatar: string;
  drillsCompleted: number;
  lastActive: string;
  xpPoints: number;
  status: 'Active' | 'Needs Reminder' | 'Top Performer';
}

export interface SquadAssignment {
  id: string;
  title: string;
  category: string;
  assignedBy: string;
  dueDate: string;
  repsGoal: string;
  completedCount: number;
  totalSquad: number;
}

export interface ScoutCardMetrics {
  overallRating: number;
  playerLevel: string;
  attributes: {
    dribblingCadence: number;
    burstAgility: number;
    plantFootStability: number;
    turnVelocity: number;
    weakFootMechanics: number;
    visionScanning: number;
  };
  scoutSummary: string;
  joeyBenchmarkDiff: string;
  recommendedDrills: string[];
}

export interface ClubhouseTournament {
  id: string;
  clubName: string;
  location: string;
  activeMatch: {
    playerA: string;
    playerB: string;
    scoreA: number;
    scoreB: number;
    timeRemaining: string;
  };
  sponsorMatchPool: number;
}

export interface TacticalPrepResult {
  opponentStyle: string;
  pitchCondition: string;
  position: string;
  tacticalEscapeRoutes: {
    title: string;
    description: string;
    keyMovementCue: string;
  }[];
  mindsetAudioTitle: string;
  warmupSequence: string[];
}

export interface DrillResponse {
  responseTitle: string;
  drillSummary: string;
  steps: string[];
  keyTechniques: string[];
  recommendedReps: string;
  proTip: string;
  videoFocusCue?: string;
}

export interface LegendSkill {
  id: string;
  name: string;
  player: string;
  category: 'Dribbling' | 'Shooting' | 'Passing' | 'Defending' | 'Juggling';
  difficulty: 'Beginner' | 'Intermediate' | 'Pro' | 'Legend';
  description: string;
  joeyNotes: string;
  videoUrl?: string;
  thumbnailUrl: string;
  keyCues: string[];
}

export interface SkillSwapAnalysis {
  score: number;
  overallFeedback: string;
  positives: string[];
  improvements: string[];
  proComparison: string;
}

export interface MemoryLocation {
  id: string;
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  year: string;
  description: string;
  joeyHighlight: string;
  arTriggerPrompt: string;
  image: string;
  tributeCount: number;
  category: 'Childhood Field' | 'Trial Ground' | 'Academy Pitch' | 'International Arena';
}

export interface TributeMessage {
  id: string;
  author: string;
  locationId: string;
  message: string;
  timestamp: string;
  likes: number;
}

export interface SkillChallenge {
  id: string;
  title: string;
  category: string;
  points: number;
  charityUnlockAmount: number; // e.g. $10 donated upon completion
  badgeName: string;
  description: string;
  targetCount: string;
  joeyRecord: string;
  completed: boolean;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  country: string;
  points: number;
  challengesCompleted: number;
  charityRaised: number;
}

export interface AcademyCourse {
  id: string;
  title: string;
  instructor: string;
  category: 'Dribbling' | 'Shooting' | 'Defending' | 'Goalkeeping' | 'Mental Game';
  durationMinutes: number;
  lessonsCount: number;
  level: string;
  thumbnail: string;
  description: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    description: string;
    completed: boolean;
  }[];
}

export interface CharityDonation {
  id: string;
  name: string;
  amount: number;
  message: string;
  date: string;
}

export interface CharityStats {
  totalRaised: number;
  goal: number;
  donorCount: number;
  featuredCharity: string;
  recentDonations: CharityDonation[];
}
