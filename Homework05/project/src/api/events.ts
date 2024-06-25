export const fetchEvents = async (sport: string, formattedDate: string) => {
  const response = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/events/${formattedDate}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }
  return await response.json();
};