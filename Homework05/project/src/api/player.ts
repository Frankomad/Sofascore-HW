
export const fetchPlayerDetails = async (playerId: string) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch player details');
  }
  return response.json();
};

export const fetchPlayerEventsLast = async (playerId: string, count = 3) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}/events/last/${count}`);
  if (!response.ok) {
    throw new Error('Failed to fetch player last events');
  }
  return response.json();
};

export const fetchPlayerEventsNext = async (playerId: string, count = 3) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}/events/next/${count}`);
  if (!response.ok) {
    throw new Error('Failed to fetch player next events');
  }
  return response.json();
};