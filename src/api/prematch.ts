import { TacticalPrepResult } from '../types';

// Mock API handler for Pre-Match Tactical Radar
export const generatePreMatchPlan = async (
  opponentStyle: string,
  pitchCondition: string,
  position: string
): Promise<TacticalPrepResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    opponentStyle,
    pitchCondition,
    position,
    tacticalEscapeRoutes: [
      {
        title: 'The Half-Space Pocket & One-Touch Turn',
        description: 'When opponents press high, drop 3 steps into the central half-space. Receive on back foot and break first line of press in 1 touch.',
        keyMovementCue: 'Scan shoulder 2 seconds BEFORE receiving'
      },
      {
        title: `Wet Pitch Low Driven Wall Pass (${pitchCondition})`,
        description: `Due to ${pitchCondition}, passes skid faster. Use firm inside-foot wall passes with 10% less weight to maintain ball cadence.`,
        keyMovementCue: 'Lock ankle tight on wet surface'
      },
      {
        title: 'Joey\'s High-Exit Fake Stepover',
        description: 'Execute body feint toward touchline to drag their press defender, then exit sharply through center.',
        keyMovementCue: 'Plant left heel firmly into soft turf'
      }
    ],
    mindsetAudioTitle: `Joey AI 5-Min Pre-Match Focus & Calm Mindset (${opponentStyle})`,
    warmupSequence: [
      "2 Mins: Ankle Mobility & Dynamic Groin Openers",
      "3 Mins: Short 5-Yard Rapid Touch Wall Passing",
      "3 Mins: 10-Yard Explosive Feint & Exit Sprints",
      "2 Mins: Deep Diaphragmatic Breath Focus Routine"
    ]
  };
};