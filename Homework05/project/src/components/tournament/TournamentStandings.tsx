import React from 'react';
import { Box, Flex, Text } from '@kuma-ui/core';
import Container from '../Container';
import useWindowSize from '@/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { StandingsRow } from '@/types/standingsRow';

interface TournamentStandingsProps {
  standings: StandingsRow[];
  resetPage?: () => void;
}

const TournamentStandings: React.FC<TournamentStandingsProps> = ({ standings, resetPage }) => {
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const { sport } = router.query;

  const handleTeamClick = (teamId: number, sport: string, router: ReturnType<typeof useRouter>, resetPage?: () => void) => {
    if (resetPage) resetPage();
    const route = `/${sport}/teams/${teamId}`;
    router.push(route);
  };

  return (
    <Container className="hidden-scrollbar" maxHeight={isMobile ? "500px" : "350px"} mb="32px" p="0px">
      <Flex color="grey" p="8px">
        <Text as="div" width="50px" fontWeight="bold">#</Text>
        <Text as="div" width="200px" fontWeight="bold">Team</Text>
        <Text as="div" width="50px" fontWeight="bold">P</Text>
        <Text as="div" width="50px" fontWeight="bold">W</Text>
        <Text as="div" width="50px" fontWeight="bold">D</Text>
        <Text as="div" width="50px" fontWeight="bold">L</Text>
        <Text as="div" width="100px" fontWeight="bold">Goals</Text>
        <Text as="div" width="50px" fontWeight="bold">{standings[0]?.points !== undefined ? "PTS" : "PERC"}</Text>
      </Flex>
      {standings.map((row, index) => (
        <Flex 
          key={row.id} 
          borderBottom="1px solid #ddd" 
          p="8px" 
          bg={index % 2 === 1 ? 'colors.highlight.secondary' : 'transparent'}
          onClick={() => handleTeamClick(row.team.id, sport as string, router, resetPage)}
          cursor="pointer"
        >
          <Text as="div" width="50px">{index + 1}</Text>
          <Text as="div" width="200px">{row.team.name}</Text>
          <Text as="div" width="50px">{row.played}</Text>
          <Text as="div" width="50px">{row.wins}</Text>
          <Text as="div" width="50px">{row.draws}</Text>
          <Text as="div" width="50px">{row.losses}</Text>
          <Text as="div" width="100px">{row.scoresFor}-{row.scoresAgainst}</Text>
          <Text as="div" width="50px">{row.points !== undefined ? row.points : (row.percentage * 100).toFixed(0) + "%"}</Text>
        </Flex>
      ))}
    </Container>
  );
};

export default TournamentStandings;
