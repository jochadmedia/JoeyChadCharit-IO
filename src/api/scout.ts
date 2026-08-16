import { ScoutCardMetrics } from '../types';
import { DEFAULT_SCOUT_METRICS } from '../data/mockData';

export const analyzeScoutFootage = async (
  selectedFootage: string,
  userNotes: string
): Promise<ScoutCardMetrics> => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Simulate AI analysis with slight variations
  const baseMetrics = DEFAULT_SCOUT_METRICS;
  const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2

  return {
    ...baseMetrics,
    overallRating: Math.min(99, Math.max(70, baseMetrics.overallRating + variation)),
    attributes: {
      ...baseMetrics.attributes,
      dribblingCadence: Math.min(99, Math.max(70, baseMetrics.attributes.dribblingCadence + variation)),
      burstAgility: Math.min(99, Math.max(70, baseMetrics.attributes.burstAgility + variation)),
      turnVelocity: Math.min(99, Math.max(70, baseMetrics.attributes.turnVelocity + variation))
    },
    scoutSummary: `AI analysis of ${selectedFootage} with notes: "${userNotes}". ${baseMetrics.scoutSummary}`,
    joeyBenchmarkDiff: `+${Math.floor(Math.random() * 5) + 1}% Faster Turn Velocity than 2016 Joey Baseline`
  };
};