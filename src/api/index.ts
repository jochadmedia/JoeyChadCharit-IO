export * from './coach';
export * from './prematch';
export * from './scout';
export * from './skillswap';
export * from './team';

// Mock API setup for development
if (import.meta.env.MODE === 'development') {
  // @ts-ignore
  window.mockApi = {
    queryCoach: (await import('./coach')).queryCoach,
    generatePreMatchPlan: (await import('./prematch')).generatePreMatchPlan,
    analyzeScoutFootage: (await import('./scout')).analyzeScoutFootage,
    analyzeSkillSwap: (await import('./skillswap')).analyzeSkillSwap,
    fetchSquadData: (await import('./team')).fetchSquadData,
    assignDrill: (await import('./team')).assignDrill
  };
}