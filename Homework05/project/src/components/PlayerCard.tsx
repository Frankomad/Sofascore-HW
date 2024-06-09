import React, { useState } from 'react';
import { Flex, Text, Image } from '@kuma-ui/core';
import { getCode } from 'country-list';
import { useRouter } from 'next/router';
import { Player } from '@/types/player';
import { getCountryCode } from '@/utils';

const PlayerCard: React.FC<Player> = ({ id, name, country, position }) => {
  const router = useRouter();
  const { sport } = router.query;
  const [imgSrc, setImgSrc] = useState(`https://academy-backend.sofascore.dev/player/${id}/image`);

  const handleImageError = () => {
    setImgSrc('/Anonymous.png');
  };

  const handlePlayerClick = (playerId: number) => {
    router.push(`/${sport}/player/${playerId}`);
  }

  return (
    <Flex alignItems="center" p="8px" borderBottom="1px solid #ddd" onClick={() => handlePlayerClick(id)} cursor="pointer">
      <Image
        src={imgSrc}
        width="36px"
        height="36px"
        borderRadius="50%"
        onError={handleImageError}
      />
      <Flex flexDir="column" ml="8px">
        <Text fontWeight="bold">{name}</Text>
        <Flex alignItems="center">
          <Image
            src={`https://www.sofascore.com/static/images/flags/${getCountryCode(country.name)}.png`}
            width="12px"
            height="12px"
            borderRadius="50%"
            mr="4px"
          />
          <Text>{country.name}</Text>
        </Flex>
        <Text color="rgba(18, 18, 18, 0.4)">{position}</Text>
      </Flex>
    </Flex>
  );
};

export default PlayerCard;
