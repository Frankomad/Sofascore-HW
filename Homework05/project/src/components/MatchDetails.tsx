import React, { useState, useEffect } from 'react';
import { Flex, Text, Image, Box } from '@kuma-ui/core';
import { useRouter } from 'next/router';
import ArrowRight from './basecomponents/ArrowRight';
import CloseIcon from './basecomponents/CloseIcon';
import Incident from './Incident';
import CustomButton from './CustomButton';
import { Incident as IncidentType } from '@/types/incident';
import { Team } from '@/types/team';
import { Score } from '@/types/score';

interface MatchDetailsProps {
  eventId: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  onClose: () => void;
  selected: boolean;
  hideOptions?: boolean;
  path: string;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({
  eventId,
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
  const { sport, tournamentId } = router.query;

  const [matchDetails, setMatchDetails] = useState<any>(null);
  const [incidents, setIncidents] = useState<IncidentType[]>([]);

  useEffect(() => {
    if (selected) {
      const fetchMatchDetails = async () => {
        const detailsRes = await fetch(`/api/event/${eventId}`);
        const detailsData = await detailsRes.json();
        setMatchDetails(detailsData);
        
        const incidentsRes = await fetch(`/api/event/${eventId}/incidents`);
        const incidentsData = await incidentsRes.json();
        if (Array.isArray(incidentsData)) {
          setIncidents(incidentsData.sort((a: IncidentType, b: IncidentType) => a.time - b.time));
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

  const handleTournamentClick = (tournamentId: number) => {
    const absoluteRoute = `/${sport}/tournament/${tournamentId}`;
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
          <Box mt="16px">
            {incidents.length !== 0 ? (incidents.map(incident => (
              <Incident key={incident.id} incident={incident} sport={matchDetails.tournament.sport.slug}/>
            ))) : 
            <Flex m="24px 0 24px 0" justify="center" flexDir="column" alignItems="center">
              <Box m="8px" bg="lightblue" p="12px" borderRadius="5px">
                <Text>No results yet.</Text>
              </Box>
              {!tournamentId ? (<CustomButton w="fit-content" h="fit-content" variant="stroked" p="12px" onClick={() => handleTournamentClick(matchDetails.tournament.id)}>
                <Text>View Tournament Details</Text>
              </CustomButton>) : null}
            </Flex>
            }
          </Box>
        </Box>
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
