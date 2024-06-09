import { Team } from './team';

export interface StandingsRow {
  id: number;
  team: Team;
  points: number | null;
  scoresFor: number;
  scoresAgainst: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  percentage: number;
}
