import useSWR from 'swr';
import { fetcher } from '@/pages/_app';

export const useMatches = (tournamentId: string, page: number) => {
  const { data: matchesLast } = useSWR(`/api/tournament/${tournamentId}/events/last/${page}`, fetcher);
  const { data: matchesNext } = useSWR(`/api/tournament/${tournamentId}/events/next/${page}`, fetcher);

  const matches = matchesNext && matchesLast ? [...matchesNext.slice(0, 3), ...matchesLast.slice(0, 7)] : [];

  return {
    data: matches,
    isLoading: !matchesNext || !matchesLast,
    isError: !matchesNext && !matchesLast
  };
};
