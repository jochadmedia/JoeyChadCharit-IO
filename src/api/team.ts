import { SquadMember, SquadAssignment } from '../types';
import { SQUAD_MEMBERS, SQUAD_ASSIGNMENTS } from '../data/mockData';

export const fetchSquadData = async (): Promise<{ members: SquadMember[], assignments: SquadAssignment[] }> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return {
    members: SQUAD_MEMBERS,
    assignments: SQUAD_ASSIGNMENTS
  };
};

export const assignDrill = async (title: string, category: string, dueDate: string, repsGoal: string): Promise<{ assignment: SquadAssignment }> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const newAssignment: SquadAssignment = {
    id: `sa-${Date.now()}`,
    title,
    category,
    assignedBy: 'Coach Murphy',
    dueDate,
    repsGoal,
    completedCount: 0,
    totalSquad: SQUAD_MEMBERS.length
  };

  return { assignment: newAssignment };
};