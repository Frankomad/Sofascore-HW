import React, { useState, useEffect } from 'react';
import { Flex, Text, Image, Box } from '@kuma-ui/core';
import { useRouter } from 'next/router';
import ArrowRight from './basecomponents/ArrowRight';
import CloseIcon from './basecomponents/CloseIcon';
import Incident from './Incident';
import Arrow from './basecomponents/ArrowRight';

interface Team {
  id: number;
  name: string;
}

interface Score {
  total: number;
  [key: string]: number;
}

interface MatchDetailsProps {
  eventId: number;
  startTime: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  onClose: () => void;
  selected: boolean;
  hideOptions?: boolean;
  path: string;
}

interface Incident {
  player?: {
    id: number;
    name: string;
    slug: string;
    country: {
      id: number;
      name: string;
    };
    position: string;
  };
  teamSide?: string;
  color?: string;
  id: number;
  time: number;
  type: string;
  text?: string;
  scoringTeam?: string;
  homeScore?: number;
  awayScore?: number;
  goalType?: string;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({
  eventId,
  startTime,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  onClose,
  selected,
  hideOptions,
  path
}) => {
  const router = useRouter();
  const { sport } = router.query;

  const [matchDetails, setMatchDetails] = useState<any>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    if (selected) {
      const fetchMatchDetails = async () => {
        const detailsRes = await fetch(`/api/event/${eventId}`);
        const detailsData = await detailsRes.json();
        setMatchDetails(detailsData);
        
        const incidentsRes = await fetch(`/api/event/${eventId}/incidents`);
        const incidentsData = await incidentsRes.json();
        if (Array.isArray(incidentsData)) {
          setIncidents(incidentsData.sort((a: Incident, b: Incident) => a.time - b.time));
        } else {
          setIncidents([]);
        }
      };
      fetchMatchDetails();
    }
  }, [selected, eventId]);

  const handleRoute = () => {
    const absoluteRoute = `${path}`;
    router.push(absoluteRoute);
  };

  const handleTeamClick = (teamId: number) => () => {
    const absoluteRoute = `/${sport}/teams/${teamId}`;
    router.push(absoluteRoute);
  }

  return (
    <Box p="12px">
      {!hideOptions && 
      <Flex justify="space-between">
        <Box onClick={onClose} cursor="pointer">
          <CloseIcon width="16px" height="16px" /> 
        </Box>
        <Flex alignItems="center" onClick={handleRoute} cursor="pointer" color="blue">
          <Text color="blue">View Full Page </Text>
          <ArrowRight />
        </Flex>
      </Flex>
      }
      <Flex justify="space-between" mt="spacings.sm" paddingBottom="spacings.md" borderBottom="1px solid #ddd">
        <Flex flexDir="column" alignItems="center" w="35%" onClick={handleTeamClick(homeTeam.id)} cursor="pointer" >
          <Image
            src={`https://academy-backend.sofascore.dev/team/${homeTeam.id}/image`}
            width="48px"
            height="48px"
            mb={"spacings.sm"}
          />
          <Text textAlign="center">{homeTeam.name}</Text>
        </Flex>
        <Flex justify="center" alignItems="center" w="30%" flexDir="column">
          <Text className="Headline-2">{homeScore.total} - {awayScore.total}</Text>
          <Text>
            {matchDetails?.status === 'notstarted' ? 'Not started' : "FT"}
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" w="35%" onClick={handleTeamClick(awayTeam.id)} cursor="pointer" >
          <Image
            src={`https://academy-backend.sofascore.dev/team/${awayTeam.id}/image`}
            width="48px"
            height="48px"
            mb={"spacings.sm"}
          />
          <Text textAlign="center">{awayTeam.name}</Text>
        </Flex>
      </Flex>
      {selected && matchDetails && (
        <>
        <Box mt="16px">
          <Flex justify="center"><Text fontWeight="bold">Start</Text></Flex>
          <Box mt="16px">
            {incidents.map(incident => (
              <Incident key={incident.id} incident={incident} sport={matchDetails.tournament.sport.slug}/>
            ))}
          </Box>
        </Box>
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
