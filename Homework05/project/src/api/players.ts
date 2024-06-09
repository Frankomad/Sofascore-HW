const BASE_URL = 'https://academy-backend.sofascore.dev';

export const fetchPlayerDetails = async (playerId: number) => {
  const response = await fetch(`${BASE_URL}/player/${playerId}`);
  return response.json();
};

export const fetchPlayerEvents = async (playerId: number, span: string = 'last', page: number = 0) => {
  const response = await fetch(`${BASE_URL}/player/${playerId}/events/${span}/${page}`);
  return response.json();
};
