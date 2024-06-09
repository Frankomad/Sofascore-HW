// api/tournaments.ts
import useSWR from 'swr';
import { fetcher } from '@/pages/_app';
import useWindowSize from '@/hooks/useWindowSize';

export const useTournaments = (sport: string) => {
  const { isMobile } = useWindowSize();
  if (isMobile) {
    return {
      data: [],
      isLoading: false,
      isError: false
    };
  }
  const { data, error } = useSWR(`/api/sport/${sport}/tournaments`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};
