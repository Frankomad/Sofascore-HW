import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Text } from '@kuma-ui/core';
import { FormattedMessage } from 'react-intl';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import Match from '@/components/match/Match';
import Container from '@/components/Container';

import { WatchlistContext } from '@/context/WatchlistContext';


const Watchlist: React.FC = () => {
  const router = useRouter();
  const { sport } = router.query;
  const { watchlist } = useContext(WatchlistContext);
  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : '';

  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(now.setHours(23, 59, 59, 999));

  const pastMatches = watchlist.filter(match => new Date(match.startDate) < todayStart && match.sport === sport);
  const todayMatches = watchlist.filter(match => new Date(match.startDate) >= todayStart && new Date(match.startDate) <= todayEnd && match.sport === sport);
  const futureMatches = watchlist.filter(match => new Date(match.startDate) > todayEnd && match.sport === sport);
 
  const breadcrumbItems = [
    { name: <FormattedMessage id={sportName}/>, route: `/${sport}` },
    { name: <FormattedMessage id="Watchlist"/>, route: `/${sport}/watchlist` }
  ];

  const handleMatchClick = (id: number) => {
    router.push(`/${sport}/${id}`);
  };

  return (
    <>
      <Header />
      <Box as="main" p="16px" className="Micro" minH="77vh">
        <Box m="8px 0px 12px 0px">
          <Breadcrumb items={breadcrumbItems} />
        </Box>
        <Text fontSize="24px" fontWeight="bold" mb="16px">
          <FormattedMessage id="Your Watched Matches"/>
        </Text>
        
        <Container mb="32px">
          <Text fontSize="20px" fontWeight="bold" mb="16px"><FormattedMessage id="Past Matches"/></Text>
          {pastMatches.length > 0 ? (
            pastMatches.map((match, index) => (
              <Match
                key={match.id}
                id={match.id}
                startDate={match.startDate}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                status={match.status}
                winnerCode={match.winnerCode}
                onClick={() => handleMatchClick(match.id)}
                isLast={index === pastMatches.length - 1}
              />
            ))
          ) : (
            <Text><FormattedMessage id="No Past Matches Watched"/></Text>
          )}
        </Container>

        <Container mb="32px">
          <Text fontSize="20px" fontWeight="bold" mb="16px"><FormattedMessage id="Today's Matches"/></Text>
          {todayMatches.length > 0 ? (
            todayMatches.map((match, index) => (
              <Match
                key={match.id}
                id={match.id}
                startDate={match.startDate}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                status={match.status}
                winnerCode={match.winnerCode}
                onClick={() => handleMatchClick(match.id)}
                isLast={index === todayMatches.length - 1}
              />
            ))
          ) : (
            <Text><FormattedMessage id="No Matches Watched Today"/></Text>
          )}
        </Container>

        <Container mb="32px">
          <Text fontSize="20px" fontWeight="bold" mb="16px">
            <FormattedMessage id="Future Matches"/>
            </Text>
          {futureMatches.length > 0 ? (
            futureMatches.map((match, index) => (
              <Match
                key={match.id}
                id={match.id}
                startDate={match.startDate}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                status={match.status}
                winnerCode={match.winnerCode}
                onClick={() => handleMatchClick(match.id)}
                isLast={index === futureMatches.length - 1}
              />
            ))
          ) : (
            <Text><FormattedMessage id="No Future Matches Watched"/></Text>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Watchlist;
