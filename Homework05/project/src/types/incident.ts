import { Country } from './country';

export interface Incident {
  player?: {
    id: number;
    name: string;
    slug: string;
    country: Country;
    position: string;
  };
  teamSide?: string;
  color?: string;
  id: number;
  time: number;
  type: string;
  text?: string;
  scoringTeam?: string;
  homeScore?: number;
  awayScore?: number;
  goalType?: string;
}

export interface IncidentProps {
  sport?: string;
  incident: Incident;
  status: string;
}
