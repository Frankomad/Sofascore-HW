export const fetchTournaments = async (sport: string) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/tournaments`);
  if (!response.ok) {
    throw new Error('Failed to fetch tournaments');
  }
  return response.json();
};