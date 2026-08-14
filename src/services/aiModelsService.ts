import { supabase } from '../lib/supabase/supabaseClient';
import { AiModel } from '../models/footballModels';

export const aiModelsService = {
  // Fetch all AI models
  async getAllAiModels(): Promise<AiModel[]> {
    const { data, error } = await supabase
      .from('ai_models')
      .select('*');
    if (error) throw error;
    return data as AiModel[];
  },

  // Fetch a single AI model by ID
  async getAiModelById(id: string): Promise<AiModel | null> {
    const { data, error } = await supabase
      .from('ai_models')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as AiModel;
  },

  // Add a new AI model
  async addAiModel(model: Omit<AiModel, 'id' | 'created_at'>): Promise<AiModel> {
    const { data, error } = await supabase
      .from('ai_models')
      .insert([model])
      .select()
      .single();
    if (error) throw error;
    return data as AiModel;
  },

  // Update an existing AI model
  async updateAiModel(id: string, model: Partial<Omit<AiModel, 'id' | 'created_at'>>): Promise<AiModel> {
    const { data, error } = await supabase
      .from('ai_models')
      .update(model)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as AiModel;
  },

  // Delete an AI model
  async deleteAiModel(id: string): Promise<void> {
    const { error } = await supabase
      .from('ai_models')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};