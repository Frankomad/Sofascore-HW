import useSWR from 'swr';
import { fetcher } from '@/pages/_app';

export const useStandings = (tournamentId: string) => {
  const { data, error } = useSWR(`/api/tournament/${tournamentId}/standings`, fetcher);
  return {
    data: data ? data[2]?.sortedStandingsRows : [],
    isLoading: !error && !data,
    isError: error
  };
};
