import useSWR from 'swr';

export const usePlayerEvents = (playerId: string, page: number) => {
  const { data, error } = useSWR(`/api/player/${playerId}/events/${page}`);
  return {
    playerEvents: data,
    isLoading: !error && !data,
    isError: error
  };
};
