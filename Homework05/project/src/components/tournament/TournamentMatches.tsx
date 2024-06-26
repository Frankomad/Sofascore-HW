import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import Match from '@/components/match/Match';
import Container from '@/components/Container';
import MatchDetails from '@/components/match/MatchDetails';
import CustomButton from '@/components/CustomButton';
import useWindowSize from '@/hooks/useWindowSize';
import { Event } from '@/types/event';
import { groupEventsByRound } from '@/utils';


interface TournamentMatchesProps {
  matches: Event[];
  handlePageChange: (page: number) => void;
  handleMatchSelect: (match: Event | null) => void;
}

const TournamentMatches: React.FC<TournamentMatchesProps> = ({
  matches,
  handlePageChange,
  handleMatchSelect,
}) => {
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const { sport, matchId } = router.query;

  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  useEffect(() => {
    if (matchId) {
      const match = matches.find((match: Event) => match.id === parseInt(matchId as string, 10));
      if (match) {
        setSelectedMatchId(match.id);
        handleMatchSelect(match);
      }
    }
  }, [matchId, matches]);

  const handleCloseMatchDetails = () => {
    setSelectedMatchId(null);
    handleMatchSelect(null);
  };

  const handleMatchClick = (match: Event) => {
    setSelectedMatchId(match.id);
    handleMatchSelect(match);
  };

  const groupedMatches = groupEventsByRound(matches);

  const selectedMatch = matches.find((match: Event) => match.id === selectedMatchId);

  return (
    <Flex mb="spacings.xl">
      <Container w={isMobile ? "100%" : "49%"} mr={isMobile ? "0px" : "2%"} className="hidden-scrollbar" maxHeight="500px" p="0px" display={(selectedMatch && isMobile) ? "none" : "default"}>
        <Flex justify="space-between" p="12px" h="48px" mb="12px" alignItems="center" className="sticky-navigator" w="100%" bg="colors.surface.s1">
          <CustomButton
            variant="icon"
            icon
            left
            h="24px"
            w="24px"
            mr="8px"
            disabled={false}
            onClick={() => handlePageChange(-1)}
            color="colors.primary.variant" 
            bg="colors.surface.s1"
            border="2px solid"
            borderColor="colors.primary.variant"
          />
          <Text><FormattedMessage id="Matches" /></Text>
          <CustomButton
            variant="icon"
            icon
            h="24px"
            w="24px"
            mr="8px"
            disabled={false}
            onClick={() => handlePageChange(1)}
            color="colors.primary.variant" 
            bg="colors.surface.s1"
            border="2px solid"
            borderColor="colors.primary.variant"
          />
        </Flex>
        {Object.keys(groupedMatches).map((round, roundIndex) => (
          <Box key={round} mb="16px">
            <Text ml="12px" fontWeight="bold"><FormattedMessage id="Round" /> {round}</Text>
            {groupedMatches[round].map((match: Event, index: number, array: Event[]) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                <Match
                  key={match.id}
                  id={match.id}
                  startDate={new Date(match.startDate)}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  homeScore={match.homeScore}
                  awayScore={match.awayScore}
                  winnerCode={match.winnerCode}
                  status={match.status}
                  onClick={() => handleMatchClick(match)}
                  selected={selectedMatchId === match.id}
                  isLast={index === array.length - 1}
                />
              </motion.div>
            ))}
            {roundIndex !== Object.keys(groupedMatches).length - 1 && <hr />}
          </Box>
        ))}
      </Container>
      {selectedMatch && (
        <Container height="fit-content" w={isMobile ? "100%" : "49%"} className="hidden-scrollbar" p="0px">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <MatchDetails
              eventId={selectedMatch.id}
              homeTeam={selectedMatch.homeTeam}
              awayTeam={selectedMatch.awayTeam}
              homeScore={selectedMatch.homeScore}
              awayScore={selectedMatch.awayScore}
              status={selectedMatch.status}
              winnerCode={selectedMatch.winnerCode}
              onClose={handleCloseMatchDetails}
              hideOptions={selectedMatchId === undefined}
              selected={true}
              path={`/${sport}/${selectedMatch.id}`}
            />
          </motion.div>
        </Container>
      )}
    </Flex>
  );
};

export default TournamentMatches;
