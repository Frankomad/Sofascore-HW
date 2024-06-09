import { Country } from './country';

export interface Team {
  id: number;
  name: string;
  country: Country;
  managerName: string,
  venue: string
}
