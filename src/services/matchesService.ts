import { supabase } from '../lib/supabase/supabaseClient';
import { Match } from '../models/footballModels';

export const matchesService = {
  // Fetch all matches
  async getAllMatches(): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*');
    if (error) throw error;
    return data as Match[];
  },

  // Fetch a single match by ID
  async getMatchById(id: string): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Match;
  },

  // Add a new match
  async addMatch(match: Omit<Match, 'id' | 'created_at'>): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .insert([match])
      .select()
      .single();
    if (error) throw error;
    return data as Match;
  },

  // Update an existing match
  async updateMatch(id: string, match: Partial<Omit<Match, 'id' | 'created_at'>>): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .update(match)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Match;
  },

  // Delete a match
  async deleteMatch(id: string): Promise<void> {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // Fetch matches by team ID (home or away)
  async getMatchesByTeamId(teamId: string): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`);
    if (error) throw error;
    return data as Match[];
  },
};