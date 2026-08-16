import { supabase } from '../../lib/supabase/supabaseClient';
import { UserProfile } from '../../types';

export const profileService = {
  async fetchProfileData(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, display_name, avatar_url, created_at') // Select relevant profile fields
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile data:', error);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          email: data.email,
          displayName: data.display_name,
          avatarUrl: data.avatar_url,
          createdAt: data.created_at,
        };
      }
      return null;
    } catch (error) {
      console.error('Unexpected error in fetchProfileData:', error);
      return null;
    }
  },

  async updateProfileData(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          display_name: updates.displayName,
          avatar_url: updates.avatarUrl,
          // Add other updatable fields here
        })
        .eq('id', userId)
        .select('id, email, display_name, avatar_url, created_at')
        .single();

      if (error) {
        console.error('Error updating profile data:', error);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          email: data.email,
          displayName: data.display_name,
          avatarUrl: data.avatar_url,
          createdAt: data.created_at,
        };
      }
      return null;
    } catch (error) {
      console.error('Unexpected error in updateProfileData:', error);
      return null;
    }
  },
};
