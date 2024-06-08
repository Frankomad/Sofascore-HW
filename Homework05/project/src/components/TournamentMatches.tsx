import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@kuma-ui/core';
import Match from '@/components/Match';
import { useRouter } from 'next/router';
import Container from '@/components/Container';
import MatchDetails from '@/components/MatchDetails';
import CustomButton from '@/components/CustomButton';

interface Team {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface Tournament {
  id: number;
  name: string;
  country: Country;
}

interface Score {
  total: number;
  period1: number;
  period2: number;
  period3: number;
  period4: number;
  overtime: number;
}

interface Event {
  id: number;
  slug: string;
  tournament: Tournament;
  homeTeam: Team;
  awayTeam: Team;
  status: string;
  startDate: string;
  homeScore: any;
  awayScore: any;
  winnerCode: string;
  round: number;
}

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

  const groupedMatches = matches.reduce((acc: any, match: Event) => {
    const { round } = match;
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(match);
    return acc;
  }, {});

  const selectedMatch = matches.find((match: Event) => match.id === selectedMatchId);

  return (
    <Flex mb="spacings.xl">
      <Container w="49%" mr="2%" className="hidden-scrollbar" maxHeight="500px" p="0px">
        <Flex justify="space-between" p="12px" h="48px" mb="12px" alignItems="center" className="sticky-navigator" bg="white" w="100%">
          <CustomButton
            variant="icon"
            icon
            left
            h="24px"
            w="24px"
            mr="8px"
            borderRadius="50%"
            disabled={false}
            onClick={() => handlePageChange(-1)}
          />
          <Text>Matches</Text>
          <CustomButton
            variant="icon"
            icon
            h="24px"
            w="24px"
            mr="8px"
            borderRadius="50%"
            disabled={false}
            onClick={() => handlePageChange(1)}
          />
        </Flex>
        {Object.keys(groupedMatches).map((round, roundIndex) => (
          <Box key={round} mb="16px">
            <Text ml="12px" fontWeight="bold">Round {round}</Text>
            {groupedMatches[round].map((match: Event, index: number, array: Event[]) => (
              <Match
                key={match.id}
                startTime={new Date(match.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                status={match.status}
                onClick={() => handleMatchClick(match)}
                selected={selectedMatchId === match.id}
                isLast={index === array.length - 1}
              />
            ))}
            {roundIndex !== Object.keys(groupedMatches).length - 1 && <hr />}
          </Box>
        ))}
      </Container>
      {selectedMatch && (
        <Container height="fit-content" w="49%" className="hidden-scrollbar" p="0px">
          <MatchDetails
            eventId={selectedMatch.id}
            startTime={new Date(selectedMatch.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            homeTeam={selectedMatch.homeTeam}
            awayTeam={selectedMatch.awayTeam}
            homeScore={selectedMatch.homeScore}
            awayScore={selectedMatch.awayScore}
            onClose={handleCloseMatchDetails}
            hideOptions={selectedMatchId === undefined}
            selected={true}
            path={`/${sport}/${selectedMatch.id}`}
          />
        </Container>
      )}
    </Flex>
  );
};

export default TournamentMatches;
