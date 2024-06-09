import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Score } from '@/types/score';
import { Team } from '@/types/team';

interface ShrinkedEvent {
  sport: string | string[] | undefined;
  id: number;
  startDate: Date;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  status: string;
  winnerCode: string;
}

interface WatchlistContextType {
  watchlist: ShrinkedEvent[];
  toggleWatch: (match: ShrinkedEvent) => void;
}

export const WatchlistContext = createContext<WatchlistContextType>({
  watchlist: [],
  toggleWatch: () => {},
});

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<ShrinkedEvent[]>(() => {
    if (typeof window !== 'undefined') {
      const storedWatchlist = localStorage.getItem('watchlist');
      return storedWatchlist ? JSON.parse(storedWatchlist) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist]);

  const toggleWatch = (match: ShrinkedEvent) => {
    setWatchlist(prevWatchlist => {
      const matchExists = prevWatchlist.find(watchedMatch => watchedMatch.id === match.id);
      if (matchExists) {
        return prevWatchlist.filter(watchedMatch => watchedMatch.id !== match.id);
      } else {
        return [...prevWatchlist, match];
      }
    });
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatch }}>
      {children}
    </WatchlistContext.Provider>
  );
};
