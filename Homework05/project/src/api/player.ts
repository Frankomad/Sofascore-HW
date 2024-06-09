import useSWR from 'swr';
import { fetcher } from '@/pages/_app';

export const usePlayerEvents = (playerId: string, page: number) => {
  const { data: matchesLast } = useSWR(`/api/player/${playerId}/events/last/${page}`, fetcher);
  const { data: matchesNext } = useSWR(`/api/player/${playerId}/events/next/${page}`, fetcher);

  const events = matchesNext && matchesLast ? [...matchesNext.slice(0, 5), ...matchesLast.slice(0, 5)] : [];

  return {
    events,
    isLoading: !matchesNext || !matchesLast,
    isError: !matchesNext && !matchesLast
  };
};
