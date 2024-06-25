import React from 'react';
import { Flex, Text, Image } from '@kuma-ui/core';
import { motion } from 'framer-motion';

import { SearchTeam } from '@/types/team';


interface TeamItemProps {
  team: SearchTeam;
  onClick: () => void;
}

const TeamItem: React.FC<TeamItemProps> = ({ team, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ cursor: 'pointer', borderRadius: '8px', marginBottom: '8px' }}
    >
      <Flex
        m="0px 16px"
        p="12px 18px"
        bg="rgba(0, 0, 0, 0.05)"
        borderRadius="8px"
        alignItems="center"
      >
        <Image
          src={`https://academy-backend.sofascore.dev/team/${team.id}/image`}
          onError={(e: { currentTarget: { src: string; }; }) => (e.currentTarget.src = '/Anonymous.png')}
          width="36px"
          height="36px"
          borderRadius="50%"
          mr="8px"
        />
        <Flex flexDir="column">
          <Text fontWeight="bold">{team.name}</Text>
          <Text color="gray">{team.sport.name}</Text>
        </Flex>
        <Text ml="auto" color="blue">
          {team.country.name}
        </Text>
      </Flex>
    </motion.div>
  );
};

export default TeamItem;
