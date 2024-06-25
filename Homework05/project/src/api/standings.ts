export const fetchStandings = async (tournamentId: string) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}/standings`);
  if (!response.ok) {
    throw new Error('Failed to fetch standings');
  }
  return response.json();
};