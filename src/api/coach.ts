import { DrillResponse } from '../types';

// Mock API handler for Joey AI Coach queries
const mockDrillResponse: DrillResponse = {
  responseTitle: "Joey's Signature Irish Rainbow Flick & Rapid Escape",
  drillSummary: "Hey mate! Joey AI Coach here. The Rainbow Flick isn't just for flair — when timed right against a rushing defender, it's the ultimate momentum killer.",
  steps: [
    "Approach defender at 60% speed to draw them into a low tackle stance.",
    "Trap the ball firmly between your trailing heel and leading instep.",
    "Roll the ball sharply up your calf while leaning forward to shift your body weight.",
    "Snap your back heel upward with explosive power to loft the ball 2 feet over the defender's head.",
    "Sprint into the open space behind and control on the half-volley."
  ],
  keyTechniques: [
    "Trailing heel pressure against calf",
    "Torso lean forward right before flick",
    "Exaggerated back heel snap",
    "Eye focus on defender's front hips"
  ],
  recommendedReps: "4 sets of 8 repetitions against a wall or defender",
  proTip: "Joey always said: 'Do not watch the ball after flicking it. Look up at the open space and run into it before it hits the grass!'",
  videoFocusCue: "Observe how Joey dips his left shoulder right before rolling the ball up his right leg."
};

export const queryCoach = async (query: string, playerLevel: string, focusArea: string): Promise<DrillResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Return mock response
  return mockDrillResponse;
};