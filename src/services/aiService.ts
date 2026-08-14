import { supabase } from '../lib/supabase/supabaseClient';

const SUPABASE_FUNCTIONS_URL = 'https://jhlmitaawdlqsusjmbox.supabase.co/functions/v1';

export interface AiModelCallRequest {
  model_name: string;
  prompt: string;
  overrides?: Record<string, unknown>;
}

export interface AiModelResponse {
  model_name: string;
  version: string;
  model_response: unknown;
}

export interface AiError {
  message: string;
  details?: unknown;
}

export const aiService = {
  /**
   * Call an AI model via the Supabase Edge Function
   * @param request - The request payload containing model_name, prompt, and optional overrides
   * @returns Promise resolving to the AI model response
   */
  async callModel(request: AiModelCallRequest): Promise<AiModelResponse> {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      throw new Error('User not authenticated. Please sign in to use AI features.');
    }

    const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/ai-model-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData: AiError = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `AI service error: ${response.status}`);
    }

    const result: AiModelResponse = await response.json();
    return result;
  },

  /**
   * Convenience method for scout-radar model
   */
  async analyzePlayer(prompt: string): Promise<AiModelResponse> {
    return this.callModel({ model_name: 'scout-radar', prompt });
  },

  /**
   * Convenience method for tactical-prep model
   */
  async generateTactics(prompt: string): Promise<AiModelResponse> {
    return this.callModel({ model_name: 'tactical-prep', prompt });
  },

  /**
   * Convenience method for skill-swap model
   */
  async recommendSkills(prompt: string): Promise<AiModelResponse> {
    return this.callModel({ model_name: 'skill-swap', prompt });
  },

  /**
   * Convenience method for memory-lane model
   */
  async generateMemoryContent(prompt: string): Promise<AiModelResponse> {
    return this.callModel({ model_name: 'memory-lane', prompt });
  },
};
