import React from 'react';
import { Box, Flex, Text } from '@kuma-ui/core';
import Container from './Container';

interface Team {
  id: number;
  name: string;
  country: {
    id: number;
    name: string;
  };
}

interface StandingsRow {
  id: number;
  team: Team;
  points: number | null;
  scoresFor: number;
  scoresAgainst: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  percentage: number;
}

interface TournamentStandingsProps {
  standings: StandingsRow[];
}

const TournamentStandings: React.FC<TournamentStandingsProps> = ({ standings }) => {
  return (
    <Container className="hidden-scrollbar" maxHeight="350px" mb="32px" p="0px">
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
