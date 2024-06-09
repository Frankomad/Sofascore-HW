const BASE_URL = 'https://academy-backend.sofascore.dev';

export const fetchEventsByDate = async (sport: string, date: string) => {
  const response = await fetch(`${BASE_URL}/sport/${sport}/events/${date}`);
  return response.json();
};

export const fetchEventDetails = async (eventId: number) => {
  const response = await fetch(`${BASE_URL}/event/${eventId}`);
  return response.json();
};
