import React from 'react';
import { Flex, Text, Image, Box } from '@kuma-ui/core';

interface MatchProps {
  startTime: string;
  homeTeam: { id: number; name: string };
  awayTeam: { id: number; name: string };
  homeScore: { total: number };
  awayScore: { total: number };
  status: string;
  onClick: () => void;
  selected?: boolean;
  isLast?: boolean;
}

const Match: React.FC<MatchProps> = ({
  startTime,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  onClick,
  selected = false,
  isLast = false
}) => (
  <Box
    p="8px"
    borderBottom={!isLast ? "1px solid #ddd" : "none"}
    cursor="pointer"
    onClick={onClick}
    bg={selected ? 'lightblue' : 'white'}
  >
    <Flex alignItems="center" justify="space-between">
      <Flex flexDir="column" fontSize="8px" color="rgba(18, 18, 18, 0.4)" alignItems="center">
        <Text>{startTime}</Text>
        <Text>{status === 'finished' ? 'FT' : '-'}</Text>
      </Flex>

      <Box w="1px" h="36px" ml="8px" mr="8px" border="1px solid rgba(18, 18, 18, 0.1)" borderRadius="999px"></Box>
      <Flex flexDir="column" flex="1">
        <Flex justify="space-between" alignItems="center" mb={"spacings.sm"}>
          <Flex alignItems="center" flex="1">
            <Image
              src={`https://academy-backend.sofascore.dev/team/${homeTeam.id}/image`}
              width="14px"
              height="14px"
              borderRadius="50%"
              mr="8px"
            />
            <Text>{homeTeam.name}</Text>
          </Flex>
          <Text mx="8px" width="30px" textAlign="center">{homeScore.total}</Text>
        </Flex>
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center" flex="1">
            <Image
              src={`https://academy-backend.sofascore.dev/team/${awayTeam.id}/image`}
              width="14px"
              height="14px"
              borderRadius="50%"
              mr="8px"
            />
            <Text>{awayTeam.name}</Text>
          </Flex>
          <Text mx="8px" width="30px" textAlign="center">{awayScore.total}</Text>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);

export default Match;