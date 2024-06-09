const BASE_URL = 'https://academy-backend.sofascore.dev';

export const fetchLastMatches = async (tournamentId: number, page: number = 1) => {
  const response = await fetch(`${BASE_URL}/tournament/${tournamentId}/events/last/${page}`);
  return response.json();
};

export const fetchNextMatches = async (tournamentId: number, page: number = 1) => {
  const response = await fetch(`${BASE_URL}/tournament/${tournamentId}/events/next/${page}`);
  return response.json();
};
