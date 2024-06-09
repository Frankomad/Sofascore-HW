import React from 'react';
import { Flex, Text, Image } from '@kuma-ui/core';
import { SearchPlayer } from '@/types/player';

interface PlayerItemProps {
  player: SearchPlayer;
  onClick: () => void;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ player, onClick }) => {
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
        src={`https://academy-backend.sofascore.dev/player/${player.id}/image`}
        onError={(e: { currentTarget: { src: string; }; }) => (e.currentTarget.src = '/Anonymous.png')}
        width="36px"
        height="36px"
        borderRadius="50%"
        mr="8px"
      />
      <Flex flexDir="column">
        <Text fontWeight="bold">{player.name}</Text>
        <Text color="gray">{player.position}</Text>
      </Flex>
      <Text ml="auto" color="blue">
        {player.country.name}
      </Text>
    </Flex>
  );
};

export default PlayerItem;
