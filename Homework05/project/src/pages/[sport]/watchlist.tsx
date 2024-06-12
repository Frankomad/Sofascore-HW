import React, { useContext, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Text, Flex } from '@kuma-ui/core';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import Match from '@/components/match/Match';
import Container from '@/components/Container';
import MatchDetails from '@/components/match/MatchDetails';
import CustomButton from '@/components/CustomButton';


import useWindowSize from '@/hooks/useWindowSize';
import { WatchlistContext } from '@/context/WatchlistContext';
import { Sport } from '@/types/sport';
import { Team } from '@/types/team';
import { Score } from '@/types/score';

interface WatchlistPageProps {
  sports: Sport[];
}

interface ShrinkedEvent {
  sport: string | string[] | undefined;
  id: number;
  startDate: Date | string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: Score;
  awayScore: Score;
  status: string;
  winnerCode: string;
}

const Watchlist: React.FC<WatchlistPageProps> = ({ sports }) => {
  const router = useRouter();
  const { sport, matchId } = router.query;
  const { isMobile } = useWindowSize();
  const { watchlist } = useContext(WatchlistContext);
  const [selectedMatch, setSelectedMatch] = useState<ShrinkedEvent | undefined>(undefined);
  const [currentView, setCurrentView] = useState<'today' | 'past' | 'future'>('today');

  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(now.setHours(23, 59, 59, 999));

  const pastMatches = watchlist.filter(match => new Date(match.startDate) < todayStart && match.sport === sport);
  const todayMatches = watchlist.filter(match => new Date(match.startDate) >= todayStart && new Date(match.startDate) <= todayEnd && match.sport === sport);
  const futureMatches = watchlist.filter(match => new Date(match.startDate) > todayEnd && match.sport === sport);

  useEffect(() => {
    if (matchId) {
      const match = watchlist.find((m) => m.id === parseInt(matchId as string));
      setSelectedMatch(match);
    }
  }, [matchId, watchlist]);

  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : '';

  const breadcrumbItems = [
    { name: <FormattedMessage id={sportName} />, route: `/${sport}` },
    { name: <FormattedMessage id="Watchlist" />, route: `/${sport}/watchlist` },
  ];

  useEffect(() => {
    if (selectedMatch === undefined) router.push(`/${sport}/watchlist`);
  }, [selectedMatch]);

  const handleMatchClick = (id: number) => {
    router.push(`/${sport}/watchlist?matchId=${id}`);
  };

  const handleSportChange = (newSport: string) => {
    router.push(`/${newSport}/watchlist`);
  };

  return (
    <>
      <Header />
      <Box as="main" p="16px" className="Micro" minH="77vh">
        <Box m="8px 0px 12px 0px">
          <Breadcrumb items={breadcrumbItems} />
        </Box>
        <Flex gap="16px" height="calc(100% - 50px)" mt="12px">
          <Container w={'calc(28% - 8px)'} height="100%" display={isMobile ? "none" : "default"} className="hidden-scrollbar">
            <Text mb="16px" fontWeight="bold">
              <FormattedMessage id="Sports" />
            </Text>
            <Flex flexDir="column" gap="16px" className="Tabular">
              {sports.map((sportItem: Sport) => (
                <motion.div
                  key={sportItem.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    transition: { duration: 0.3 },
                  }}
                >
                  <Flex
                    borderRadius="5px"
                    bg={sport === sportItem.slug ? 'colors.onSurface.lv3' : 'transparent'}
                    alignItems="center"
                    p="8px"
                    onClick={() => handleSportChange(sportItem.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    <FormattedMessage id={sportItem.name} />
                  </Flex>
                </motion.div>
              ))}
            </Flex>
          </Container>

          <Container w={isMobile ? '100%' : 'calc(38% - 8px)'} height="100%" display={(isMobile && selectedMatch) ? "none" : "default"} className="hidden-scrollbar" p="0px">
            <Text fontSize="24px" fontWeight="bold" mb="16px" p="12px">
              <FormattedMessage id="Your Watched Matches" />
            </Text>
            <Flex flexDir="column" p="12px">
              <Flex justify="space-between" className="Tabular" mb="16px">
              {sports.map((sportItem: Sport) => (
                <Box w="28%" gap="8%" display={isMobile ? "default" : "none"}>
                  <motion.div
                    key={sportItem.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Flex
                      justify="center"
                      borderRadius="5px"
                      bg={sport === sportItem.slug ? 'colors.onSurface.lv3' : 'transparent'}
                      alignItems="center"
                      p="8px"
                      onClick={() => handleSportChange(sportItem.slug)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FormattedMessage id={sportItem.name === "American Football" ? "Am. Football" : sportItem.name}/>
                    </Flex>
                  </motion.div>
                </Box>
              ))}
            </Flex>
            <Flex justifyContent="space-between" mb="16px">
              <CustomButton
                fontSize="12px"
                p="6px"
                h="fit-content"
                w="fit-content"
                variant="unshielded"
                onClick={() => setCurrentView('past')}
                bg={currentView === 'past' ? 'colors.onSurface.lv3' : 'transparent'}
              >
                <FormattedMessage id="Past Matches" />
              </CustomButton>
              <CustomButton
                fontSize="12px"
                p="6px"
                h="fit-content"
                w="fit-content"
                variant="unshielded"
                onClick={() => setCurrentView('today')}
                bg={currentView === 'today' ? 'colors.onSurface.lv3' : 'transparent'}
              >
                <FormattedMessage id="Today's Matches" />
              </CustomButton>
              <CustomButton
                fontSize="12px"
                p="6px"
                h="fit-content"
                w="fit-content"
                variant="unshielded"
                onClick={() => setCurrentView('future')}
                bg={currentView === 'future' ? 'colors.onSurface.lv3' : 'transparent'}
              >
                <FormattedMessage id="Future Matches" />
              </CustomButton>
            </Flex>
            </Flex>
            {currentView === 'today' && (
              <Box mb="32px">
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
                      selected={match.id === selectedMatch?.id}
                      onClick={() => handleMatchClick(match.id)}
                      isLast={index === todayMatches.length - 1}
                    />
                  ))
                ) : (
                  <Text p="12px" w="100%" textAlign="center"><FormattedMessage id="No Matches Watched Today" /></Text>
                )}
              </Box>
            )}
            {currentView === 'past' && (
              <Box >
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
                      selected={match.id === selectedMatch?.id}
                      onClick={() => handleMatchClick(match.id)}
                      isLast={index === pastMatches.length - 1}
                    />
                  ))
                ) : (
                  <Text p="12px" w="100%" textAlign="center"><FormattedMessage id="No Past Matches Watched" /></Text>
                )}
              </Box>
            )}
            {currentView === 'future' && (
              <Box mb="32px">
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
                      selected={match.id === selectedMatch?.id}
                      onClick={() => handleMatchClick(match.id)}
                      isLast={index === futureMatches.length - 1}
                    />
                  ))
                ) : (
                  <Text p="12px" w="100%" textAlign="center"><FormattedMessage id="No Future Matches Watched" /></Text>
                )}
              </Box>
            )}
          </Container>

          {selectedMatch && (
            <Container w={isMobile ? "100%" : 'calc(33% - 8px)'} height="100%" className="hidden-scrollbar">
              <MatchDetails
                eventId={selectedMatch.id}
                homeTeam={selectedMatch.homeTeam}
                awayTeam={selectedMatch.awayTeam}
                homeScore={selectedMatch.homeScore}
                awayScore={selectedMatch.awayScore}
                status={selectedMatch.status}
                winnerCode={selectedMatch.winnerCode}
                onClose={() => setSelectedMatch(undefined)}
                selected={true}
                path={`/${sport}/${selectedMatch.id}`}
              />
            </Container>
          )}
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const sportsRes = await fetch('https://academy-backend.sofascore.dev/sports');
  const sports = await sportsRes.json();

  return {
    props: {
      sports,
    },
  };
};

export default Watchlist;
