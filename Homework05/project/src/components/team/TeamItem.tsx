import React from 'react';
import { Flex, Text, Image } from '@kuma-ui/core';
import { SearchTeam } from '@/types/team';

interface TeamItemProps {
  team: SearchTeam;
  onClick: () => void;
}

const TeamItem: React.FC<TeamItemProps> = ({ team, onClick }) => {
  return (
    <Flex
      p="12px"
      mb="8px"
      bg="rgba(0, 0, 0, 0.05)"
      borderRadius="8px"
      cursor="pointer"
      alignItems="center"
      onClick={onClick}
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
  );
};

export default TeamItem;
