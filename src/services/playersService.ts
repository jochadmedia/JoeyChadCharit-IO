import { supabase } from '../lib/supabase/supabaseClient';
import { Player } from '../models/footballModels';
import logger from '../utils/logger';

export const playersService = {
  // Fetch all players
  async getAllPlayers(): Promise<Player[]> {
    try {
      logger.log('Fetching all players');
      const { data, error } = await supabase
        .from('players')
        .select('*');
      if (error) throw error;
      logger.log('Successfully fetched players', { count: data?.length });
      return data as Player[];
    } catch (error) {
      logger.error('Error fetching players', error);
      throw error;
    }
  },

  // Fetch a single player by ID
  async getPlayerById(id: string): Promise<Player | null> {
    try {
      logger.log(`Fetching player by ID: ${id}`);
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      logger.log('Successfully fetched player', { id });
      return data as Player;
    } catch (error) {
      logger.error(`Error fetching player by ID: ${id}`, error);
      throw error;
    }
  },

  // Add a new player
  async addPlayer(player: Omit<Player, 'id' | 'created_at'>): Promise<Player> {
    try {
      logger.log('Adding new player', player);
      const { data, error } = await supabase
        .from('players')
        .insert([player])
        .select()
        .single();
      if (error) throw error;
      logger.log('Successfully added player', { id: data?.id });
      return data as Player;
    } catch (error) {
      logger.error('Error adding player', error);
      throw error;
    }
  },

  // Update an existing player
  async updatePlayer(id: string, player: Partial<Omit<Player, 'id' | 'created_at'>>): Promise<Player> {
    try {
      logger.log(`Updating player ID: ${id}`, player);
      const { data, error } = await supabase
        .from('players')
        .update(player)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      logger.log('Successfully updated player', { id });
      return data as Player;
    } catch (error) {
      logger.error(`Error updating player ID: ${id}`, error);
      throw error;
    }
  },

  // Delete a player
  async deletePlayer(id: string): Promise<void> {
    try {
      logger.log(`Deleting player ID: ${id}`);
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);
      if (error) throw error;
      logger.log('Successfully deleted player', { id });
    } catch (error) {
      logger.error(`Error deleting player ID: ${id}`, error);
      throw error;
    }
  },
};