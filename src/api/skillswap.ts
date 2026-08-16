import { SkillSwapAnalysis } from '../types';

export const analyzeSkillSwap = async (targetSkill: string, userNotes: string): Promise<SkillSwapAnalysis> => {
  await new Promise(resolve => setTimeout(resolve, 900));

  // Simulate AI analysis with slight score variation
  const baseScore = 88;
  const scoreVariation = Math.floor(Math.random() * 7) - 3; // -3 to +3
  const finalScore = Math.min(99, Math.max(70, baseScore + scoreVariation));

  return {
    score: finalScore,
    overallFeedback: `Great execution of ${targetSkill}. Your technique shows strong fundamentals with room for refinement in ${finalScore > 85 ? 'subtle body positioning' : 'power delivery'}.`,
    positives: [
      "Excellent plant foot placement adjacent to the ball",
      "Good arm posture maintaining lateral balance",
      "Crisp power delivery through ball center"
    ],
    improvements: [
      "Follow-through could be extended by 10-15 degrees for maximum height",
      "Keep head up immediately after contact to spot the defender"
    ],
    proComparison: `${finalScore}% technique match with Joey's trial match clip`
  };
};