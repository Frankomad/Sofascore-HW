import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Flex, Text, Image, Box } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import { format, isValid } from 'date-fns';

import BellIcon from '@/components/icons/BellIcon';
import { WatchlistContext } from '@/context/WatchlistContext';
import { Team } from '@/types/team';
import { Score } from '@/types/score';


interface MatchProps {
  id: number;
  startDate: Date | string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: Score;
  awayScore?: Score;
  status?: string;
  winnerCode?: string;
  onClick: () => void;
  selected?: boolean;
  isLast?: boolean;
}

const Match: React.FC<MatchProps> = ({
  id,
  startDate,
  homeTeam,
  awayTeam,
  homeScore = { total: 0 },
  awayScore = { total: 0 },
  status = '',
  winnerCode = '',
  onClick,
  selected = false,
  isLast = false,
}) => {
  const { watchlist, toggleWatch } = useContext(WatchlistContext);
  const isWatched = watchlist.some(
    (match) => match.homeTeam?.id === homeTeam?.id && match.awayTeam?.id === awayTeam?.id
  );
  const router = useRouter();
  const { sport } = router.query;

  const handleBellClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatch({ sport, id, startDate, homeTeam, awayTeam, homeScore, awayScore, status, winnerCode });
  };

  const getScoreColor = (teamId: number) => {
    if (status === 'inprogress') {
      return 'colors.live';
    }
    if (status === 'finished') {
      if (winnerCode === 'home' && teamId === homeTeam?.id) {
        return 'colors.onSurface.lv1';
      }
      if (winnerCode === 'away' && teamId === awayTeam?.id) {
        return 'colors.onSurface.lv1';
      }
      return 'colors.onSurface.lv2';
    }
    return 'colors.onSurface.lv1';
  };

  const validDate = isValid(new Date(startDate)) ? new Date(startDate) : null;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Box
        p="8px"
        borderBottom={!isLast ? '1px solid #ddd' : 'none'}
        bg={selected ? 'colors.primary.highlight' : 'colors.surface.s1'}
      >
        <Flex alignItems="center" justify="space-between">
          <Flex flexDir="column" fontSize="9px" color="colors.onSurface.lv2" alignItems="center">
            {validDate ? (
              <>
                <Text>{format(validDate, 'HH:mm')}</Text>
                <Text>{status === 'finished' ? 'FT' : '-'}</Text>
              </>
            ) : (
              <Text>Invalid Date</Text>
            )}
          </Flex>
          <Box w="1px" h="36px" ml="8px" mr="8px" border="1px solid rgba(18, 18, 18, 0.1)" borderRadius="999px"></Box>
          <Flex flexDir="column" flex="1">
            <Flex justify="space-between" alignItems="center" mb={'spacings.sm'}>
              <Flex alignItems="center" flex="1">
                {homeTeam && (
                  <>
                    <Image
                      src={`https://academy-backend.sofascore.dev/team/${homeTeam.id}/image`}
                      width="14px"
                      height="14px"
                      borderRadius="50%"
                      mr="8px"
                    />
                    <Text color={getScoreColor(homeTeam.id)}>{homeTeam.name}</Text>
                  </>
                )}
              </Flex>
              <Text mx="8px" width="30px" textAlign="center" color={getScoreColor(homeTeam?.id || 0)}>
                {homeScore.total}
              </Text>
            </Flex>
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" flex="1">
                {awayTeam && (
                  <>
                    <Image
                      src={`https://academy-backend.sofascore.dev/team/${awayTeam.id}/image`}
                      width="14px"
                      height="14px"
                      borderRadius="50%"
                      mr="8px"
                    />
                    <Text color={getScoreColor(awayTeam.id)}>{awayTeam.name}</Text>
                  </>
                )}
              </Flex>
              <Text mx="8px" width="30px" textAlign="center" color={getScoreColor(awayTeam?.id || 0)}>
                {awayScore.total}
              </Text>
            </Flex>
          </Flex>
          <BellIcon onClick={handleBellClick} watched={isWatched} />
        </Flex>
      </Box>
    </motion.div>
  );
};

export default Match;
