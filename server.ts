import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import getPort from "get-port";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// In-memory Charity Data State
let charityState = {
  totalRaised: 128450,
  goal: 250000,
  donorCount: 3420,
  featuredCharity: "Joey Chad Youth Football & Mental Health Initiative",
  recentDonations: [
    { id: "1", name: "Liam O'Connor", amount: 100, message: "For Joey! Keep inspiring the next generation. ⚽", date: "2 mins ago" },
    { id: "2", name: "Dublin Football Academy", amount: 500, message: "Honored to support Joey's legacy.", date: "15 mins ago" },
    { id: "3", name: "Sarah Jenkins", amount: 50, message: "Mastered the rainbow flick today! Love this app.", date: "1 hour ago" },
    { id: "4", name: "Celtic Supporters Club", amount: 250, message: "Football forever. Rest in power Joey.", date: "3 hours ago" },
  ]
};

// In-memory Squad Assignments State
let squadAssignmentsState = [
  { id: 'sa1', title: '100-Touch Wall Pass Cadence', category: 'Passing & First Touch', assignedBy: 'Coach Murphy', dueDate: 'This Friday, 6:00 PM', repsGoal: '3 Sets x 100 Reps', completedCount: 5, totalSquad: 6 },
  { id: 'sa2', title: 'Joey\'s Rainbow Flick & Sudden Exit', category: '1v1 Dribbling', assignedBy: 'Coach Murphy', dueDate: 'Next Tuesday', repsGoal: '20 Successful Attempts', completedCount: 3, totalSquad: 6 },
  { id: 'sa3', title: '3-Second Pre-Pass Scanning Habit', category: 'Tactical Vision', assignedBy: 'Academy Director', dueDate: 'Sunday Matchday', repsGoal: 'Watch Module + Quiz', completedCount: 4, totalSquad: 6 }
];

// In-memory Memory Pitch Tributes State
let memoryTributesState = [
  { id: '1', author: 'Sean Murphy', locationId: 'dublin-grassroots', message: 'Rest in peace Joey. Saw you score 3 here in 2015. Unforgettable footwork!', timestamp: '2 hours ago', likes: 24 },
  { id: '2', author: 'Clara Hughes', locationId: 'dublin-grassroots', message: 'Inspiring my young lad every day to practice his rainbow flicks here.', timestamp: '5 hours ago', likes: 18 },
  { id: '3', author: 'Leinster Youth Club', locationId: 'leinster-academy', message: 'Joey’s shirt #7 hangs with pride in our clubhouse.', timestamp: '1 day ago', likes: 52 },
  { id: '4', author: 'Aviva National Fan', locationId: 'national-arena', message: 'That semi-final display was pure magic. Joey forever!', timestamp: '2 days ago', likes: 31 }
];

// API Routes

// 1. Charity Stats & Donation
app.get("/api/charity/stats", (req, res) => {
  res.json(charityState);
});

app.post("/api/charity/donate", (req, res) => {
  const { name, amount, message } = req.body;
  const numAmount = Number(amount) || 10;
  charityState.totalRaised += numAmount;
  charityState.donorCount += 1;
  const newDonation = {
    id: Date.now().toString(),
    name: name || "Anonymous Fan",
    amount: numAmount,
    message: message || "Supporting Joey's Legacy",
    date: "Just now"
  };
  charityState.recentDonations.unshift(newDonation);
  if (charityState.recentDonations.length > 15) {
    charityState.recentDonations.pop();
  }
  res.json({ success: true, updatedStats: charityState, donation: newDonation });
});

// 2. Joey AI Coach Natural Language Drills
app.post("/api/coach/query", async (req, res) => {
  const { query, playerLevel = "Intermediate", focusArea = "General" } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  if (!ai) {
    return res.json({
      responseTitle: `Mastering: ${query}`,
      drillSummary: `Hey! I'm Joey AI Coach. Let's break down "${query}" step-by-step so you can execute it with precision, power, and confidence on the pitch.`,
      steps: [
        "Position your plant foot roughly 15cm beside the ball pointing in your target direction.",
        "Keep your knees flexed 15 degrees to lower your center of gravity for instant explosive agility.",
        "Strike the ball smoothly using your foot's instep, focusing on clean follow-through towards your target.",
        "Immediately accelerate into open space following the release to maintain momentum."
      ],
      keyTechniques: [
        "Plant foot angle & balance",
        "Body weight distribution before contact",
        "Vision: scan pitch before receiving",
        "First-touch directional exit"
      ],
      recommendedReps: "3 sets of 10 repetitions with both dominant and non-dominant foot",
      proTip: "Joey always said: 'Speed of thought beats speed of foot. Look up before the ball reaches you!'",
      videoFocusCue: "Focus on the hip turn speed at 0:03 mark"
    });
  }

  try {
    const prompt = `You are Joey AI Coach, an expert, enthusiastic, and highly technical football coach representing the legacy of Joey Chad.
The user is asking: "${query}"
Player Skill Level: ${playerLevel}
Focus Area: ${focusArea}

Provide a detailed, structured, highly practical training response in JSON format matching this structure:
{
  "responseTitle": "Short catchy title for this skill or drill",
  "drillSummary": "Warm, encouraging 2-sentence breakdown from Joey AI Coach",
  "steps": ["Step 1 detailed instructions", "Step 2 detailed instructions", "Step 3 detailed instructions", "Step 4 detailed instructions"],
  "keyTechniques": ["Key cue 1", "Key cue 2", "Key cue 3", "Key cue 4"],
  "recommendedReps": "Suggested rep scheme or time (e.g., 4 sets x 12 reps)",
  "proTip": "Joey Chad signature tactical tip or mindset quote",
  "videoFocusCue": "What specific body movement to watch in slow motion video"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are Joey AI Football Coach. Return valid JSON only. Keep instructions concise, motivating, and tactically sound."
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini AI Coach Error:", error);
    res.status(500).json({
      error: "Failed to generate AI coaching drill",
      details: error.message
    });
  }
});

// 3. SkillSwap AI Video/Technique Analysis
app.post("/api/skillswap/analyze", async (req, res) => {
  const { targetSkill, userNotes } = req.body;

  if (!ai) {
    return res.json({
      score: 88,
      overallFeedback: `Impressive execution of ${targetSkill || "the technique"}! Your body positioning and ankle lock show great mechanics.`,
      positives: [
        "Excellent plant foot placement adjacent to the ball",
        "Good arm posture maintaining lateral balance",
        "Crisp power delivery through ball center"
      ],
      improvements: [
        "Follow-through could be extended by 10-15 degrees for maximum curve",
        "Keep head down until 1 second after contact"
      ],
      proComparison: "88% match with Joey's signature technique at age 19"
    });
  }

  try {
    const prompt = `Analyze this football technique attempt for: "${targetSkill || "Dribbling Move"}"
User Notes: "${userNotes || "Attempted on practice pitch"}"

Provide an AI Technique Analysis in JSON format with:
{
  "score": integer between 70 and 98,
  "overallFeedback": "2 sentence encouraging technical summary",
  "positives": ["3 specific mechanical strengths observed"],
  "improvements": ["2 specific mechanical corrections to practice"],
  "proComparison": "Comparison percentage and note with a pro or Joey's style"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an elite Football Video & Skill Analysis Engine. Return realistic JSON feedback."
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (err: any) {
    console.error("SkillSwap Analysis Error:", err);
    res.status(500).json({ error: "Failed to perform SkillSwap AI Analysis" });
  }
});

// 4. AI Pro Scout Radar Analysis
app.post("/api/scout/analyze", async (req, res) => {
  const { selectedFootage = "Agility Sprint", userNotes = "" } = req.body;

  if (!ai) {
    const baseScore = Math.floor(Math.random() * 5) + 88;
    return res.json({
      overallRating: baseScore,
      playerLevel: "Regional Youth Candidate",
      attributes: {
        dribblingCadence: baseScore + 2,
        burstAgility: baseScore - 1,
        plantFootStability: baseScore - 4,
        turnVelocity: baseScore + 1,
        weakFootMechanics: baseScore - 6,
        visionScanning: baseScore - 2
      },
      scoutSummary: `Scout Motion Analysis for ${selectedFootage}: Exceptional footwork cadence with tight deceleration radius. Plant foot stability verified at peak efficiency.`,
      joeyBenchmarkDiff: `+${Math.floor(Math.random() * 4) + 2}% Faster Turn Velocity than 2016 Joey Baseline`,
      recommendedDrills: [
        "Joey's Irish Stepover & Sudden Exit",
        "3-Cone Rapid Deceleration Test",
        "Weak-Foot Inside Curve Strike"
      ]
    });
  }

  try {
    const prompt = `Perform an AI Scout Motion Vector evaluation for practice footage: "${selectedFootage}". User notes: "${userNotes}".
Generate a complete Scout Card evaluation JSON matching:
{
  "overallRating": integer between 80 and 96,
  "playerLevel": "Regional Youth Candidate",
  "attributes": {
    "dribblingCadence": integer 75-98,
    "burstAgility": integer 75-98,
    "plantFootStability": integer 75-98,
    "turnVelocity": integer 75-98,
    "weakFootMechanics": integer 75-98,
    "visionScanning": integer 75-98
  },
  "scoutSummary": "Detailed scout breakdown text highlighting mechanical strengths",
  "joeyBenchmarkDiff": "+X% comparison note against Joey Chad's academy benchmark",
  "recommendedDrills": ["Drill 1", "Drill 2", "Drill 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an elite FIFA-style AI Football Scout & Motion Tracking System. Return valid JSON only."
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (err: any) {
    console.error("Scout AI Error:", err);
    res.status(500).json({ error: "Failed to run Scout AI analysis" });
  }
});

// 5. Pre-Match Tactical Radar Generator
app.post("/api/prematch/generate", async (req, res) => {
  const { opponentStyle, pitchCondition, position } = req.body;

  if (!ai) {
    return res.json({
      opponentStyle: opponentStyle || 'High-Press 4-3-3',
      pitchCondition: pitchCondition || 'Wet Natural Grass',
      position: position || 'Attacking Midfielder',
      tacticalEscapeRoutes: [
        {
          title: `Exploiting ${opponentStyle || 'High Press'} Gaps as ${position || 'Midfielder'}`,
          description: `Against a ${opponentStyle || 'High Press'}, space opens up directly behind their aggressive wingbacks. Drop into half-pockets to receive facing forward.`,
          keyMovementCue: 'Check shoulder twice 2 seconds before receiving pass'
        },
        {
          title: `Adapting Footwork Mechanics for ${pitchCondition || 'Wet Pitch'}`,
          description: `On ${pitchCondition || 'Wet Pitch'}, lower center of gravity by flexing knees 15 degrees deeper during turns to prevent slipping.`,
          keyMovementCue: 'Lock ankle firm on damp surface'
        },
        {
          title: 'Joey\'s 1v1 Feint & Sudden Escape',
          description: 'Use sharp body feint to drag the defender off balance, then explode into space on your first touch.',
          keyMovementCue: 'Dip leading shoulder right before pushing ball'
        }
      ],
      mindsetAudioTitle: `Joey AI Pre-Match Focus (${position || 'Athlete'} vs ${opponentStyle || 'Opponent'})`,
      warmupSequence: [
        "2 Mins: Dynamic Ankle & Hip Mobility Routine",
        "3 Mins: High-Cadence Rapid Touch Wall Passing",
        "3 Mins: Explosive Feint & Directional Change Sprints",
        "2 Mins: Diaphragmatic Breath Focus & Visualization"
      ]
    });
  }

  try {
    const prompt = `Generate a Pre-Match Tactical Radar Plan for:
Opponent System: ${opponentStyle}
Pitch Condition: ${pitchCondition}
Player Position: ${position}

Return JSON strictly matching:
{
  "opponentStyle": "${opponentStyle}",
  "pitchCondition": "${pitchCondition}",
  "position": "${position}",
  "tacticalEscapeRoutes": [
    { "title": "Route 1 Title", "description": "Tactical advice", "keyMovementCue": "Movement cue" },
    { "title": "Route 2 Title", "description": "Tactical advice", "keyMovementCue": "Movement cue" },
    { "title": "Route 3 Title", "description": "Tactical advice", "keyMovementCue": "Movement cue" }
  ],
  "mindsetAudioTitle": "Title for audio mindset track",
  "warmupSequence": ["2 Mins step", "3 Mins step", "3 Mins step", "2 Mins step"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are Joey AI Tactical Radar Engine. Provide actionable pre-game tactical advice in JSON format."
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (err: any) {
    console.error("PreMatch AI Error:", err);
    res.status(500).json({ error: "Failed to generate pre-match tactical radar" });
  }
});

// 6. Squad Assignments API
app.get("/api/team/assignments", (req, res) => {
  res.json(squadAssignmentsState);
});

app.post("/api/team/assignments", (req, res) => {
  const { title, dueDate, category, repsGoal } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newAssignment = {
    id: Date.now().toString(),
    title,
    category: category || "Coach Homework",
    assignedBy: "Coach Murphy",
    dueDate: dueDate || "This Friday",
    repsGoal: repsGoal || "3 Sets x 50 Reps",
    completedCount: 1,
    totalSquad: 6
  };
  squadAssignmentsState.unshift(newAssignment);
  res.json({ success: true, assignment: newAssignment, assignments: squadAssignmentsState });
});

app.post("/api/team/assignments/:id/complete", (req, res) => {
  const { id } = req.params;
  const assignment = squadAssignmentsState.find(a => a.id === id);
  if (assignment) {
    if (assignment.completedCount < assignment.totalSquad) {
      assignment.completedCount += 1;
    }
    return res.json({ success: true, assignment, assignments: squadAssignmentsState });
  }
  res.status(404).json({ error: "Assignment not found" });
});

// 7. Memory Pitch Tributes API
app.get("/api/memory/tributes", (req, res) => {
  const { locationId } = req.query;
  if (locationId) {
    return res.json(memoryTributesState.filter(t => t.locationId === locationId));
  }
  res.json(memoryTributesState);
});

app.post("/api/memory/tributes", (req, res) => {
  const { author, locationId, message } = req.body;
  if (!message || !locationId) {
    return res.status(400).json({ error: "Message and locationId are required" });
  }
  const newTribute = {
    id: Date.now().toString(),
    author: author || "Anonymous Fan",
    locationId,
    message,
    timestamp: "Just now",
    likes: 1
  };
  memoryTributesState.unshift(newTribute);
  res.json({ success: true, tribute: newTribute, tributes: memoryTributesState });
});

// Start server function with Vite Integration
async function startServer() {
  const PORT = await getPort({ port: 3000 });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`⚽ Joey Chad Football Platform Server running on http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

