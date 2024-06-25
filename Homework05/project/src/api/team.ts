export const fetchTeamTournaments = async (teamId: string) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/tournaments`);
  if (!response.ok) {
    throw new Error('Failed to fetch team tournaments');
  }
  return response.json();
};

export const fetchTeamEventsNext = async (teamId: string, page: number = 1) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/events/next/${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch team next event');
  }
  return response.json();
};

export const fetchTeamSquad = async (teamId: string) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/players`);
  if (!response.ok) {
    throw new Error('Failed to fetch team squad');
  }
  return response.json();
};

export const fetchTeamDetails = async (teamId: string) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch team details');
  }
  return response.json();
};