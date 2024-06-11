export const fetchMatchesLast = async (tournamentId: string, count: number = 3) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}/events/last/${count}`);
  if (!response.ok) {
    throw new Error('Failed to fetch last matches');
  }
  return response.json();
};

export const fetchMatchesNext = async (tournamentId: string, count: number = 3) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}/events/next/${count}`);
  if (!response.ok) {
    throw new Error('Failed to fetch next matches');
  }
  return response.json();
};