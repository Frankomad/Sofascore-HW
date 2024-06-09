import useSWR from 'swr';
import { fetcher } from '@/pages/_app';

export const useTeamStandings = (tournamentId: number, shouldFetch: boolean) => {
  console.log('useTeamStandings', tournamentId, shouldFetch);

  const { data, error } = useSWR(
    shouldFetch ? `/api/tournament/${tournamentId}/standings` : null,
    fetcher
  );

  console.log('Fetched Data:', data);

  return {
    standings: data?.[2]?.sortedStandingsRows,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTeamMatches = (teamId: number, page: number, shouldFetch: boolean) => {
  console.log('useTeamMatches', teamId, page, shouldFetch);

  const { data: matchesLast, error: errorLast } = useSWR(
    shouldFetch ? `/api/team/${teamId}/events/last/${page}` : null,
    fetcher
  );
  const { data: matchesNext, error: errorNext } = useSWR(
    shouldFetch ? `/api/team/${teamId}/events/next/${page}` : null,
    fetcher
  );

  const matches = matchesNext && matchesLast ? [...matchesNext.slice(0, 5), ...matchesLast.slice(0, 5)] : [];

  return {
    matches,
    isLoading: !matchesNext || !matchesLast,
    isError: errorLast || errorNext,
  };
};
