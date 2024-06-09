import { Country } from './country';

export interface Player {
  id: number;
  name: string;
  slug: string;
  country: Country;
  position: string;
}
