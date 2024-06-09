import { Team } from './team';
import { Tournament } from './tournament';
import { Score } from './score';

export interface Event {
  id: number;
  slug: string;
  tournament: Tournament;
  homeTeam: Team;
  awayTeam: Team;
  status: string;
  startDate: Date;
  homeScore: Score;
  awayScore: Score;
  winnerCode: string;
  round: number;
}
