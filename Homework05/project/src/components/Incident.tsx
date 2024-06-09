import React from 'react';
import { Flex, Text, Box } from '@kuma-ui/core';
import Autogoal from './basecomponents/Autogoal';
import RedCard from './basecomponents/RedCard';
import YellowCard from './basecomponents/YellowCard';
import FootballBall from './basecomponents/FootballBall';
import ExtraPoint from './basecomponents/ExtraPoint';
import FieldGoal from './basecomponents/FieldGoal';
import Touchdown from './basecomponents/Touchdown';
import BasketballIncident1 from './basecomponents/BasketballIncident1';
import BasketballIncident2 from './basecomponents/BasketballIncident2';
import BasketballIncident3 from './basecomponents/BasketballIncident3';
import RugbyPoint1 from './basecomponents/RugbyPoint1';
import RugbyPoint2 from './basecomponents/RugbyPoint2';
import RugbyPoint3 from './basecomponents/RugbyPoint3';
import FootballPenaltyMissed from './basecomponents/FootballPenaltyMissed';
import FootballPenaltyScore from './basecomponents/FootballPenaltyScore';
import Rogue from './basecomponents/Rogue';
import CustomButton from './CustomButton';
import { useRouter } from 'next/router';
import { IncidentProps } from '@/types/incident';

const Incident: React.FC<IncidentProps> = ({ incident, sport }) => {
  const router = useRouter();

  const handlePlayerClick = (playerId: number | undefined) => {
    if (!playerId) return;
    const route = `/${sport}/player/${playerId}`;
    router.push(route);
  }

  const isHomeTeam = () => {
    if (sport === 'football') {
      return incident.teamSide === 'home';
    } else if (sport === 'american-football' || sport === 'basketball') {
      return incident.scoringTeam === 'home';
    }
    return false;
  };

  const renderGoal = () => (
    <Flex alignItems="center" mb="8px" flexDir={isHomeTeam() ? 'row' : 'row-reverse'} w="100%" onClick={() => handlePlayerClick(incident.player?.id)} cursor="pointer">
      <Flex flexDir="column" alignItems="center">
        {incident.goalType === 'penalty' && <FootballPenaltyScore width="16px" height="16px" />}
        {incident.goalType === 'fieldgoal' && <FieldGoal width="16px" height="16px" />}
        {incident.goalType === 'touchdown' && <Touchdown width="16px" height="16px" />}

        {(incident.goalType === 'onepoint' && sport === 'basketball') ? (
          <BasketballIncident1 width="16px" height="16px" />
        ) : (incident.goalType === 'onepoint' && sport === 'american-football') ? (
          <RugbyPoint1 width="16px" height="16px" />
        ) : null}

        {(incident.goalType === 'twopoint' && sport === 'basketball') ? (
          <BasketballIncident2 width="16px" height="16px" />
        ) : (incident.goalType === 'twopoint' && sport === 'american-football') ? (
          <RugbyPoint2 width="16px" height="16px" />
        ) : null}
        
        {(incident.goalType === 'threepoint' && sport === 'basketball') ? (
          <BasketballIncident3 width="16px" height="16px" />
        ) : (incident.goalType === 'threepoint' && sport === 'american-football') ? (
          <RugbyPoint3 width="16px" height="16px" />
        ) : null}

        {incident.goalType === 'owngoal' && <Autogoal width="16px" height="16px" />}
        {incident.goalType === 'regular' && <FootballBall width="16px" height="16px" />}
        {incident.goalType === 'safety' && <Rogue width="16px" height="16px" />}
        {incident.goalType === 'extrapoint' && <ExtraPoint width="16px" height="16px" />}
        <Text fontSize="8px" color="rgba(18, 18, 18, 0.4)">{incident.time}'</Text>
      </Flex>
      <Box w="1px" h="24px" ml="8px" mr="8px" border="1px solid rgba(18, 18, 18, 0.1)" borderRadius="999px"></Box>
      <Text>{incident.player?.name} ({incident.homeScore} - {incident.awayScore})</Text>
    </Flex>
  );

  const renderCard = () => (
    <Flex alignItems="center" mb="8px" flexDir={isHomeTeam() ? 'row' : 'row-reverse'} w="100%"  onClick={() => handlePlayerClick(incident.player?.id)} cursor="pointer">
      <Flex flexDir="column" alignItems="center">
        {incident.color === 'red' && <RedCard width="16px" height="16px" />}
        {incident.color === 'yellow' && <YellowCard width="16px" height="16px" />}
        {incident.color === 'yellowred' && <Box position="relative"><YellowCard width="16px" height="16px"/><RedCard width="16px" height="16px" customStyle={{ position: 'absolute', left: "3px", bottom: "3px" }} /></Box>}
        <Text fontSize="8px" color="rgba(18, 18, 18, 0.4)">{incident.time}'</Text>
      </Flex>
      <Box w="1px" h="24px" ml="8px" mr="8px" border="1px solid rgba(18, 18, 18, 0.1)" borderRadius="999px"></Box>
      <Text>{incident.player?.name}</Text>
    </Flex>
  );

  const renderPeriod = () => {
    const periodText = incident.text === 'HT' ? 'Half Time' : incident.text === 'FT' ? 'Full Time' : incident.text;
    return (
      <Flex justifyContent="center" mb="8px" w="100%" height="16px" bg="#f7f6ef" alignItems="center" borderRadius="15px">
        <Text>{incident.time}' - {periodText}</Text>
      </Flex>
    );
  };

  let content;
  if (incident.type === 'goal') {
    content = renderGoal();
  } else if (incident.type === 'card') {
    content = renderCard();
  } else if (incident.type === 'period') {
    content = renderPeriod();
  }

  return (
    <Flex key={incident.id} mb="8px" alignItems="center" className="Micro">
      {incident ? 
      (content) :
      <CustomButton varient="unshielded">
        <Text>View Details</Text>
      </CustomButton>
      }
    </Flex>
  );
};

export default Incident;
