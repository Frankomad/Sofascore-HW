import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@kuma-ui/core';
import PlayerCard from './PlayerCard';
import { Player } from '@/types/player';

interface PlayerListProps {
  teamId: number;
}

const PlayerList: React.FC<PlayerListProps> = ({ teamId }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`/api/team/${teamId}/players`);
        const data = await res.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex flexDir="column" w="100%" className="hidden-scrollbar" maxH="400px">
      <Text fontWeight="bold" mb="8px">Players</Text>
      {players.map((player) => (
        <PlayerCard key={player.id} {...player} />
      ))}
    </Flex>
  );
};

export default PlayerList;
