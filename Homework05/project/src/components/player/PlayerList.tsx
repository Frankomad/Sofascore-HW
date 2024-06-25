import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@kuma-ui/core';
import PlayerCard from './PlayerCard';
import { Player } from '@/types/player';
import { motion } from 'framer-motion';

interface PlayerListProps {
  teamId: number;
}

const PlayerList: React.FC<PlayerListProps> = ({ teamId }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`/api/team/${teamId}/players`);
        const data = await res.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
      }
    };

    fetchPlayers();
  }, [teamId]);

  return (
    <Flex flexDir="column" w="100%" className="hidden-scrollbar" maxH="400px">
      {players.map((player, index) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          >
        <PlayerCard key={player.id} {...player} />
        </motion.div>
      ))}
    </Flex>
  );
};

export default PlayerList;
