import { LegendSkill, MemoryLocation, SkillChallenge, LeaderboardUser, AcademyCourse, SquadMember, SquadAssignment, ScoutCardMetrics, ClubhouseTournament } from '../types';

export const LEGEND_SKILLS: LegendSkill[] = [
  {
    id: 'joey-rainbow-flick',
    name: "Joey's Signature Irish Rainbow Flick",
    player: 'Joey Chad',
    category: 'Dribbling',
    difficulty: 'Pro',
    description: "Joey's iconic trick to flick the ball over an approaching defender's head with rapid heel-to-calf roll.",
    joeyNotes: "The key is the pressure from the back ankle. Dip your shoulders forward right as you roll up!",
    thumbnailUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800',
    keyCues: [
      'Trap ball between back heel and front instep',
      'Roll ball sharply up back calf muscle',
      'Jump and lean torso slightly forward',
      'Snap back heel upward to loft ball over defender'
    ]
  },
  {
    id: 'messi-la-croqueta',
    name: "Messi's Instant La Croqueta",
    player: 'Lionel Messi',
    category: 'Dribbling',
    difficulty: 'Intermediate',
    description: "Rapid weight-shift transfer from inside right foot to inside left foot to glide past diving tackles.",
    joeyNotes: "Joey mastered this at age 14 during the trial match against Leinster Academy.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    keyCues: [
      'Bait defender into committing foot',
      'Push ball laterally with inside of right foot',
      'Receive immediately with inside of left foot without extra touch',
      'Explode forward past defender'
    ]
  },
  {
    id: 'ronaldinho-elastico',
    name: "Ronaldinho's Flip-Flap (Elastico)",
    player: 'Ronaldinho',
    category: 'Dribbling',
    difficulty: 'Legend',
    description: "Deceptive ankle flick outwards to trick defender one way, then rapidly snapping back inwards.",
    joeyNotes: "Requires ultra-flexible ankle joints. Keep your knees loose and drop your center of mass.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
    keyCues: [
      'Push ball diagonally outwards with outside pinky toe',
      'Without lifting foot off ground, bend ankle inwards',
      'Snap inside of foot across ball',
      "Accelerate inside the defender's hips"
    ]
  },
  {
    id: 'zidane-roulette',
    name: "Zidane's 360 Spin Roulette",
    player: 'Zinedine Zidane',
    category: 'Dribbling',
    difficulty: 'Pro',
    description: "Full body 360 spin drag-back to shield ball using your body frame while bypassing two defenders.",
    joeyNotes: "Joey's favorite midfield escape move when under intense press.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    keyCues: [
      'Place sole of lead foot on top of ball',
      'Spin back toward defender, shielding ball with torso',
      'Drag ball back with second foot sole',
      'Complete 360 rotation into open pitch'
    ]
  },
  {
    id: 'beckham-curler',
    name: "Beckham's Trajectory Free Kick",
    player: 'David Beckham',
    category: 'Shooting',
    difficulty: 'Pro',
    description: "High-curling whip over 5-man defensive wall into top corner of the net.",
    joeyNotes: "Notice how the plant foot points 45 degrees away from target to allow maximum hip turn arc.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80&w=800',
    keyCues: [
      'Plant non-kicking foot 20cm away angled 45° outward',
      'Wrap big toe under bottom-side of ball',
      'Swing arms wide for momentum rotational torque',
      'Follow through across opposite shoulder'
    ]
  }
];

export const MEMORY_LOCATIONS: MemoryLocation[] = [
  {
    id: 'dublin-grassroots',
    title: "Joey's First Grassroots Park Pitch",
    locationName: "St. Patrick's Park, Dublin",
    lat: 53.3382,
    lng: -6.2715,
    year: '2012 - 2016',
    description: "Where 7-year-old Joey spent 4 hours every evening kicking his scuffed ball against the brick wall.",
    joeyHighlight: "Scored 42 goals in his first under-10 season on this muddy pitch.",
    arTriggerPrompt: "Point camera at grass line to see 8-year-old Joey's 3D hologram dribbling past cones.",
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
    tributeCount: 1420,
    category: 'Childhood Field'
  },
  {
    id: 'leinster-academy',
    title: "Leinster Youth Trial Ground",
    locationName: "Leinster Sports Complex",
    lat: 53.3101,
    lng: -6.2235,
    year: '2019',
    description: "The fateful trial where Joey was scouted after performing a hat-trick and a 30-yard volley.",
    joeyHighlight: "Signed his first youth squad contract surrounded by his family.",
    arTriggerPrompt: "Scan stadium arch to view the reenactment of Joey's 30-yard top-corner strike.",
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    tributeCount: 980,
    category: 'Trial Ground'
  },
  {
    id: 'national-arena',
    title: "National Youth Stadium",
    locationName: "Aviva Stadium Grounds",
    lat: 53.3352,
    lng: -6.2285,
    year: '2022',
    description: "Where Joey captained his national youth team to victory, earning Man of the Match honors.",
    joeyHighlight: "Created 6 golden chances in a single semi-final match.",
    arTriggerPrompt: "Look toward center circle to launch AR trophy ceremony celebration.",
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=800',
    tributeCount: 2310,
    category: 'International Arena'
  }
];

export const SKILL_CHALLENGES: SkillChallenge[] = [
  {
    id: 'c1',
    title: "The Joey 100-Touch Wall Pass",
    category: "Passing & Control",
    points: 150,
    charityUnlockAmount: 15,
    badgeName: "Precision Passing Wall",
    description: "Alternate left and right foot 1-touch passes against a wall for 60 seconds without losing rhythm.",
    targetCount: "100 passes in 60s",
    joeyRecord: "134 passes in 60s (Age 16)",
    completed: false
  },
  {
    id: 'c2',
    title: "Rainbow Flick Clearance Challenge",
    category: "Dribbling Trick",
    points: 250,
    charityUnlockAmount: 25,
    badgeName: "Irish Rainbow Master",
    description: "Perform 3 consecutive successful Rainbow Flicks over a stationary marker, trapping the ball clean.",
    targetCount: "3 Clean Rainbows",
    joeyRecord: "5 in a row in trial match",
    completed: true
  },
  {
    id: 'c3',
    title: "Crossbar Challenge Precision",
    category: "Shooting Accuracy",
    points: 300,
    charityUnlockAmount: 30,
    badgeName: "Bar Sniper",
    description: "Strike the crossbar 3 times from 18 yards out in 5 attempts.",
    targetCount: "3/5 Crossbars",
    joeyRecord: "4/5 Crossbars from 20 yards",
    completed: false
  },
  {
    id: 'c4',
    title: "50-Juggle Knees & Shoulders",
    category: "Ball Control",
    points: 200,
    charityUnlockAmount: 20,
    badgeName: "Air Master",
    description: "Juggle ball 50 times using feet, knees, shoulders, and head without letting it hit the pitch.",
    targetCount: "50 Juggles",
    joeyRecord: "1,240 consecutive juggles",
    completed: false
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  { rank: 1, name: "Connor Walsh", avatar: "⚽", country: "Ireland", points: 2850, challengesCompleted: 14, charityRaised: 380 },
  { rank: 2, name: "Mateo Silva", avatar: "🔥", country: "Spain", points: 2640, challengesCompleted: 12, charityRaised: 320 },
  { rank: 3, name: "Sophie Taylor", avatar: "⭐", country: "UK", points: 2410, challengesCompleted: 11, charityRaised: 290 },
  { rank: 4, name: "Lucas Vance", avatar: "⚡", country: "USA", points: 2190, challengesCompleted: 10, charityRaised: 250 },
  { rank: 5, name: "Niamh Kelly", avatar: "🏆", country: "Ireland", points: 1980, challengesCompleted: 9, charityRaised: 210 }
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'course-1',
    title: "Joey's Mindset & Dribbling Mastery",
    instructor: "Joey Chad & Guest Pros",
    category: "Dribbling",
    durationMinutes: 45,
    lessonsCount: 5,
    level: "All Levels",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800",
    description: "Comprehensive 5-part video series breaking down body deception, first-touch acceleration, and Joey's signature turns.",
    lessons: [
      { id: 'l1', title: "1. The Mental Mindset: Reading Defender's Hips", duration: "8 mins", description: "How to anticipate tackle commitments before touched", completed: true },
      { id: 'l2', title: "2. The Irish Stepover & Sudden Exit", duration: "10 mins", description: "Joey's explosive directional change drill", completed: true },
      { id: 'l3', title: "3. Tight-Space Shielding under High Press", duration: "9 mins", description: "Body angle and arm positioning secrets", completed: false },
      { id: 'l4', title: "4. Executing the Rainbow Flick in Match Scenarios", duration: "11 mins", description: "When and where to use high-risk skill moves", completed: false },
      { id: 'l5', title: "5. Joey's Daily Agility Drill Routine", duration: "7 mins", description: "Cone setup for maximum footwork velocity", completed: false }
    ]
  },
  {
    id: 'course-2',
    title: "Precision Finishing & Trajectory Curler",
    instructor: "Elite Striker Coach",
    category: "Shooting",
    durationMinutes: 60,
    lessonsCount: 6,
    level: "Intermediate / Advanced",
    thumbnail: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80&w=800",
    description: "Master ball contact mechanics, bend, power placement, and top-corner free kick execution.",
    lessons: [
      { id: 'l21', title: "1. Ankle Locking & Ball Contact Zones", duration: "9 mins", description: "Instep vs lace striking techniques", completed: false },
      { id: 'l22', title: "2. The Bending Curler: Plant Foot Alignment", duration: "12 mins", description: "Wrapping around ball for dip and spin", completed: false },
      { id: 'l23', title: "3. 1v1 Against Goalkeeper: Cold Finish", duration: "10 mins", description: "Eyes on keeper hips vs corner targets", completed: false }
    ]
  },
  {
    id: 'course-3',
    title: "Tactical Vision & Spatial Awareness",
    instructor: "Academy Director",
    category: "Mental Game",
    durationMinutes: 50,
    lessonsCount: 4,
    level: "All Levels",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    description: "Develop 360-degree pitch radar, scanning frequency, and intelligent off-ball movement.",
    lessons: [
      { id: 'l31', title: "1. The 3-Second Scanning Habit", duration: "11 mins", description: "Checking shoulders before receiving pass", completed: false },
      { id: 'l32', title: "2. Finding Half-Spaces Between Lines", duration: "14 mins", description: "Exploiting midfield gaps", completed: false }
    ]
  },
  {
    id: 'course-4',
    title: "Pro Goalkeeping: Reflexes & Distribution",
    instructor: "National Team Keeper Coach",
    category: "Goalkeeping",
    durationMinutes: 40,
    lessonsCount: 4,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
    description: "Master set position, reflex saves, high cross catching, and rapid counter-attack throwing distribution.",
    lessons: [
      { id: 'l41', title: "1. Set Stance & Weight Distribution", duration: "8 mins", description: "Balls of feet positioning for lateral reaction", completed: false },
      { id: 'l42', title: "2. Diving Footwork & Soft Hand Catching", duration: "12 mins", description: "Absorbing high-velocity strikes safely", completed: false },
      { id: 'l43', title: "3. Side-Winder Volley Distribution", duration: "10 mins", description: "Launching 40-yard counter attacks", completed: false }
    ]
  },
  {
    id: 'course-5',
    title: "Modern Defending & 1v1 Containment",
    instructor: "Former Pro Center Back",
    category: "Defending",
    durationMinutes: 45,
    lessonsCount: 4,
    level: "All Levels",
    thumbnail: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800",
    description: "Learn body jockey stance, forcing wingers onto weak feet, timing slide tackles, and aerial headers.",
    lessons: [
      { id: 'l51', title: "1. The Jockey Stance & Distance Control", duration: "10 mins", description: "Never dive in early against explosive wingers", completed: false },
      { id: 'l52', title: "2. Clean Tackling & Ball Retrieval", duration: "11 mins", description: "Hooks and poke tackles without fouling", completed: false }
    ]
  }
];

export const SQUAD_MEMBERS: SquadMember[] = [
  { id: 'sm1', name: 'Sean Murphy', position: 'Attacking Midfielder', avatar: '⚽', drillsCompleted: 14, lastActive: '10 mins ago', xpPoints: 890, status: 'Top Performer' },
  { id: 'sm2', name: 'Liam O\'Connor', position: 'Winger / Striker', avatar: '🔥', drillsCompleted: 12, lastActive: '1 hour ago', xpPoints: 760, status: 'Active' },
  { id: 'sm3', name: 'Clara Hughes', position: 'Central Midfielder', avatar: '⭐', drillsCompleted: 15, lastActive: 'Just now', xpPoints: 920, status: 'Top Performer' },
  { id: 'sm4', name: 'Mateo Silva', position: 'Fullback', avatar: '🛡️', drillsCompleted: 8, lastActive: '1 day ago', xpPoints: 510, status: 'Active' },
  { id: 'sm5', name: 'Alex Ross', position: 'Goalkeeper', avatar: '🧤', drillsCompleted: 4, lastActive: '3 days ago', xpPoints: 280, status: 'Needs Reminder' },
  { id: 'sm6', name: 'David Byrne', position: 'Center Back', avatar: '💪', drillsCompleted: 10, lastActive: '5 hours ago', xpPoints: 640, status: 'Active' }
];

export const SQUAD_ASSIGNMENTS: SquadAssignment[] = [
  { id: 'sa1', title: '100-Touch Wall Pass Cadence', category: 'Passing & First Touch', assignedBy: 'Coach Murphy', dueDate: 'This Friday, 6:00 PM', repsGoal: '3 Sets x 100 Reps', completedCount: 5, totalSquad: 6 },
  { id: 'sa2', title: 'Joey\'s Rainbow Flick & Sudden Exit', category: '1v1 Dribbling', assignedBy: 'Coach Murphy', dueDate: 'Next Tuesday', repsGoal: '20 Successful Attempts', completedCount: 3, totalSquad: 6 },
  { id: 'sa3', title: '3-Second Pre-Pass Scanning Habit', category: 'Tactical Vision', assignedBy: 'Academy Director', dueDate: 'Sunday Matchday', repsGoal: 'Watch Module + Quiz', completedCount: 4, totalSquad: 6 }
];

export const DEFAULT_SCOUT_METRICS: ScoutCardMetrics = {
  overallRating: 88,
  playerLevel: 'Regional Youth Candidate',
  attributes: {
    dribblingCadence: 91,
    burstAgility: 89,
    plantFootStability: 84,
    turnVelocity: 88,
    weakFootMechanics: 82,
    visionScanning: 86
  },
  scoutSummary: 'Exceptional rapid directional changes and tight-space footwork reminiscent of Joey Chad’s 2017 academy tape. High dribbling cadence with sharp plant-foot deceleration.',
  joeyBenchmarkDiff: '+3% Faster Turn Velocity than 2016 Joey Baseline',
  recommendedDrills: [
    'Joey\'s Irish Stepover & Sudden Exit',
    '3-Cone Rapid Deceleration Test',
    'Weak-Foot Inside Curve Strike'
  ]
};

export const CLUBHOUSE_TOURNAMENT: ClubhouseTournament = {
  id: 'ct1',
  clubName: 'Dublin Grassroots Football Clubhouse',
  location: 'Pitch #1 Clubhouse Screen',
  activeMatch: {
    playerA: 'Sean Murphy (U16s)',
    playerB: 'Liam O\'Connor (U16s)',
    scoreA: 42,
    scoreB: 39,
    timeRemaining: '00:18'
  },
  sponsorMatchPool: 500
};

export const JUNIOR_GROWTH_TRACKS = [
  {
    id: 'jg-u8',
    ageGroup: 'U8 (Ages 6-8)',
    focus: 'Fun Footwork & Ball Familiarity',
    maxDailyMins: 30,
    modules: [
      { id: 'm1', title: 'The Dino Dribble', duration: '10 mins', icon: '🦕', desc: 'Soft touches using small toe taps' },
      { id: 'm2', title: 'Ankle & Balance Fun', duration: '10 mins', icon: '🏃', desc: 'Growth-plate friendly balance jumps' },
      { id: 'm3', title: 'Joey\'s High Five Audio', duration: '5 mins', icon: '🎧', desc: 'Building joy and sportsmanship' }
    ]
  },
  {
    id: 'jg-u12',
    ageGroup: 'U12 (Ages 9-12)',
    focus: 'Technique Foundation & Agility',
    maxDailyMins: 45,
    modules: [
      { id: 'm4', title: 'Cone Weave & Body Feints', duration: '15 mins', icon: '⚡', desc: 'Rhythmic acceleration and deceleration' },
      { id: 'm5', title: 'Growth Plate Safe Stretching', duration: '10 mins', icon: '🧘', desc: 'Hamstring & Achilles mobility' },
      { id: 'm6', title: 'Pre-Match Confidence Story', duration: '10 mins', icon: '🌟', desc: 'Overcoming pre-game jitters' }
    ]
  },
  {
    id: 'jg-u14',
    ageGroup: 'U14 (Ages 13-14)',
    focus: 'Speed Cadence & Tactical Awareness',
    maxDailyMins: 60,
    modules: [
      { id: 'm7', title: 'Scanning & Spatial Awareness', duration: '20 mins', icon: '🎯', desc: 'Checking shoulders prior to receiving' },
      { id: 'm8', title: '1v1 Containment Footwork', duration: '15 mins', icon: '🛡️', desc: 'Jockey stance and distance control' },
      { id: 'm9', title: 'Youth Mental Resilience Guide', duration: '10 mins', icon: '💪', desc: 'Dealing with mistakes on the pitch' }
    ]
  }
];
