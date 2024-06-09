import React, { useContext } from 'react';
import { Flex, Text, Image, Box } from '@kuma-ui/core';
import BellIcon from '@/components/icons/BellIcon';
import { WatchlistContext } from '@/context/WatchlistContext';
import { Event } from '@/types/event';
import { Team } from '@/types/team';
import { Score } from '@/types/score';
import { useRouter } from 'next/router';

interface MatchProps {
  id: number;
  startDate: Date;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  status: string;
  winnerCode: string;
  onClick: () => void;
  selected?: boolean;
  isLast?: boolean;
}

const Match: React.FC<MatchProps> = ({
  id,
  startDate,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  winnerCode,
  onClick,
  selected = false,
  isLast = false,
}) => {
  const { watchlist, toggleWatch } = useContext(WatchlistContext);
  const isWatched = watchlist.some(
    (match) => match.homeTeam.id === homeTeam.id && match.awayTeam.id === awayTeam.id
  );
  const router = useRouter();
  const { sport } = router.query;

  const handleBellClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatch({ sport, id, startDate, homeTeam, awayTeam, homeScore, awayScore, status, winnerCode });
  };

  const getScoreColor = (teamId: number) => {
    if (status === 'inprogress') {
      return 'red';
    }
    if (status === 'finished') {
      if (winnerCode === 'home' && teamId === homeTeam.id) {
        return 'black';
      }
      if (winnerCode === 'away' && teamId === awayTeam.id) {
        return 'black';
      }
      return 'grey';
    }
    return 'black';
  };

  return (
    <Box
      p="8px"
      borderBottom={!isLast ? '1px solid #ddd' : 'none'}
      cursor="pointer"
      onClick={onClick}
      bg={selected ? 'lightblue' : 'white'}
    >
      <Flex alignItems="center" justify="space-between">
        <Flex flexDir="column" fontSize="8px" color="rgba(18, 18, 18, 0.4)" alignItems="center">
          <Text>{startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Text>{status === 'finished' ? 'FT' : '-'}</Text>
        </Flex>
        <Box w="1px" h="36px" ml="8px" mr="8px" border="1px solid rgba(18, 18, 18, 0.1)" borderRadius="999px"></Box>
        <Flex flexDir="column" flex="1">
          <Flex justify="space-between" alignItems="center" mb={'spacings.sm'}>
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
            <Text mx="8px" width="30px" textAlign="center" color={getScoreColor(homeTeam.id)}>
              {homeScore.total}
            </Text>
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
            <Text mx="8px" width="30px" textAlign="center" color={getScoreColor(awayTeam.id)}>
              {awayScore.total}
            </Text>
          </Flex>
        </Flex>
        <BellIcon onClick={handleBellClick} watched={isWatched} />
      </Flex>
    </Box>
  );
};

export default Match;
