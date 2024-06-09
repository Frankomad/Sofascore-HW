import { Country } from './country';
import { Sport } from './sport';

export interface Player {
  id: number;
  name: string;
  slug: string;
  country: Country;
  position: string;
}

export interface SearchPlayer {
  id: number;
  name: string;
  slug: string;
  sport: Sport;
  country: Country;
  position: string;
}