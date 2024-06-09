// api/events.ts
import useSWR from 'swr';
import { fetcher } from '@/pages/_app';

export const useEventDetails = (eventId: string) => {
  const { data, error } = useSWR(eventId ? `/api/event/${eventId}` : null, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};

export const useEvents = (sport: string, date: string) => {
  const { data, error } = useSWR(`/api/sport/${sport}/events/${date}`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
};
