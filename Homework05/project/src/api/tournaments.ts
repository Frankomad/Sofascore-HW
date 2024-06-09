const BASE_URL = 'https://academy-backend.sofascore.dev';

export const fetchTournaments = async (sport: string) => {
  const response = await fetch(`${BASE_URL}/sport/${sport}/tournaments`);
  return response.json();
};
