import React, { useState, useEffect } from 'react';
import { Flex, Text, Image, Box } from '@kuma-ui/core';
import { useRouter } from 'next/router';
import ArrowRight from '../icons/ArrowRight';
import CloseIcon from '../icons/CloseIcon';
import Incident from './Incident';
import CustomButton from '../CustomButton';
import { Incident as IncidentType } from '@/types/incident';
import { Team } from '@/types/team';
import { Score } from '@/types/score';
import useWindowSize from '@/hooks/useWindowSize'

interface MatchDetailsProps {
  eventId: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  status: string;
  winnerCode: string;
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
  status,
  winnerCode,
  onClose,
  selected,
  hideOptions,
  path,
}) => {
  const router = useRouter();
  const { sport, tournamentId } = router.query;

  const { isMobile } = useWindowSize();

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
  };

  const handleTournamentClick = (tournamentId: number) => {
    const absoluteRoute = `/${sport}/tournament/${tournamentId}`;
    router.push(absoluteRoute);
  };

  const getScoreColor = (teamId: number) => {
    if (status === 'inprogress') {
      return 'colors.live';
    }
    if (status === 'finished') {
      if (winnerCode === 'home' && teamId === homeTeam.id) {
        return 'colors.onSurface.lv1';
      }
      if (winnerCode === 'away' && teamId === awayTeam.id) {
        return 'colors.onSurface.lv1';
      }
      return 'colors.onSurface.lv2';
    }
    return 'colors.onSurface.lv1';
  };

  console.log("incidents", incidents)

  return (
    <Box p="12px">
      {!hideOptions && (
        <Flex justify="space-between" mb="12px">
          <Box onClick={onClose} cursor="pointer">
            <CloseIcon width="16px" height="16px" />
          </Box>
          <Box display={isMobile ? "none" : "default"}>
            <Flex alignItems="center" onClick={handleRoute} cursor="pointer" color="colors.primary.default">
              <Text>View Full Page </Text>
              <ArrowRight height="16px" width="16px"/>
            </Flex>
          </Box>
        </Flex>
      )}
      <Flex justify="space-between" mt="spacings.sm" paddingBottom="spacings.md" borderBottom="1px solid #ddd">
        <Flex flexDir="column" alignItems="center" w="35%" onClick={handleTeamClick(homeTeam.id)} cursor="pointer">
          <Image
            src={`https://academy-backend.sofascore.dev/team/${homeTeam.id}/image`}
            width="48px"
            height="48px"
            mb={'spacings.sm'}
          />
          <Text textAlign="center">{homeTeam.name}</Text>
        </Flex>
        <Flex justify="center" alignItems="center" w="30%" flexDir="column">
          <Flex>
            <Text className="Headline-2" color={getScoreColor(homeTeam.id)}>
              {homeScore.total}
            </Text>
            <Text m="0px 8px 0px 8px">-</Text>
            <Text className="Headline-2" color={getScoreColor(awayTeam.id)}>
              {awayScore.total}
            </Text>
          </Flex>
          <Text textAlign="center">{status === 'notstarted' ? 'Not started' : 'FT'}</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" w="35%" onClick={handleTeamClick(awayTeam.id)} cursor="pointer">
          <Image
            src={`https://academy-backend.sofascore.dev/team/${awayTeam.id}/image`}
            width="48px"
            height="48px"
            mb={'spacings.sm'}
          />
          <Text textAlign="center">{awayTeam.name}</Text>
        </Flex>
      </Flex>
      {selected && matchDetails && (
        <>
          <Box mt="16px">
            <Box mt="16px">
              {incidents.length !== 0 ? (
                incidents.map((incident) => (
                  <Incident key={incident.id} incident={incident} sport={matchDetails.tournament.sport.slug} status={status}/>
                ))
              ) : (
                <Flex m="24px 0 24px 0" justify="center" flexDir="column" alignItems="center">
                  <Flex m="8px" p="12px" borderRadius="5px" w="80%" h="60px" bg="colors.surface.s2" justify="center" alignItems="center">
                    <Text color="colors.onSurface.lv2" textAlign="center">No results yet.</Text>
                  </Flex>
                  {!tournamentId ? (
                    <CustomButton
                      w="fit-content"
                      h="fit-content"
                      variant="stroked"
                      p="12px"
                      fontSize="12px"
                      onClick={() => handleTournamentClick(matchDetails.tournament.id)}
                    >
                      <Text>View Tournament Details</Text>
                    </CustomButton>
                  ) : null}
                </Flex>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MatchDetails;
