import { Country } from './types/country';
import { Event } from './types/event';
import { useRouter } from 'next/router';
import { getCode } from 'country-list';

export const groupEventsByCountryAndTournament = (events: Event[]) => {
  return events.reduce((acc: any, event: Event) => {
    const { country, name } = event.tournament;
    if (!acc[country.name]) {
      acc[country.name] = {};
    }
    if (!acc[country.name][name]) {
      acc[country.name][name] = [];
    }
    acc[country.name][name].push(event);
    return acc;
  }, {});
};

export const groupEventsByRound = (matches: Event[]) => {
  return matches.reduce((acc: any, match: Event) => {
    const { round } = match;
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {});
};

export const handleLeagueClick = (tournamentId: number, sport: string, router: ReturnType<typeof useRouter>) => {
  const route = `/${sport}/tournament/${tournamentId}`;
  router.push(route);
};

export const getCountryCode = (countryName: string): string | undefined => {
  if (countryName === 'England') {
    return 'gb';
  } else if (countryName === 'USA') {
    return 'us';
  } else if (countryName === 'Croatia') {
    return 'hr';
  }

  if (countryName)
    return getCode(countryName);
  else
    return undefined;
};
