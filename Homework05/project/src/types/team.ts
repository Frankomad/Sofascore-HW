import { Country } from './country';
import { Sport } from './sport';

export interface Team {
  id: number;
  name: string;
  country: Country;
  managerName: string,
  venue: string
}

export interface SearchTeam {
  id: number;
  name: string;
  sport: Sport;
  country: Country;
}