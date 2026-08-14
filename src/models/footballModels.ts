export interface Player {
  id: string
  name: string
  position: string
  team_id?: string
  created_at: string
}

export interface Team {
  id: string
  name: string
  coach?: string
  created_at: string
}

export interface Match {
  id: string
  home_team_id: string
  away_team_id: string
  match_date: string
  location?: string
  created_at: string
}

export interface AiModel {
  id: string
  model_name: string
  description?: string
  version?: string
  config?: Record<string, unknown>
  created_at: string
}