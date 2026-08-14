import { supabase } from '../lib/supabase/supabaseClient';
import { Team } from '../models/footballModels';
import logger from '../utils/logger';

export const teamsService = {
  // Fetch all teams
  async getAllTeams(): Promise<Team[]> {
    try {
      logger.log('Fetching all teams');
      const { data, error } = await supabase
        .from('teams')
        .select('*');
      if (error) throw error;
      logger.log('Successfully fetched teams', { count: data?.length });
      return data as Team[];
    } catch (error) {
      logger.error('Error fetching teams', error);
      throw error;
    }
  },

  // Fetch a single team by ID
  async getTeamById(id: string): Promise<Team | null> {
    try {
      logger.log(`Fetching team by ID: ${id}`);
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      logger.log('Successfully fetched team', { id });
      return data as Team;
    } catch (error) {
      logger.error(`Error fetching team by ID: ${id}`, error);
      throw error;
    }
  },

  // Add a new team
  async addTeam(team: Omit<Team, 'id' | 'created_at'>): Promise<Team> {
    try {
      logger.log('Adding new team', team);
      const { data, error } = await supabase
        .from('teams')
        .insert([team])
        .select()
        .single();
      if (error) throw error;
      logger.log('Successfully added team', { id: data?.id });
      return data as Team;
    } catch (error) {
      logger.error('Error adding team', error);
      throw error;
    }
  },

  // Update an existing team
  async updateTeam(id: string, team: Partial<Omit<Team, 'id' | 'created_at'>>): Promise<Team> {
    try {
      logger.log(`Updating team ID: ${id}`, team);
      const { data, error } = await supabase
        .from('teams')
        .update(team)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      logger.log('Successfully updated team', { id });
      return data as Team;
    } catch (error) {
      logger.error(`Error updating team ID: ${id}`, error);
      throw error;
    }
  },

  // Delete a team
  async deleteTeam(id: string): Promise<void> {
    try {
      logger.log(`Deleting team ID: ${id}`);
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id);
      if (error) throw error;
      logger.log('Successfully deleted team', { id });
    } catch (error) {
      logger.error(`Error deleting team ID: ${id}`, error);
      throw error;
    }
  },
};