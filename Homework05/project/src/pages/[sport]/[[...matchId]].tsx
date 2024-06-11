import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@kuma-ui/core';
import Head from 'next/head';

import Header from '@/components/Header';
import Navigator from '@/components/Navigator';
import MatchDetails from '@/components/match/MatchDetails';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Match from '@/components/match/Match';
import ArrowRight from '@/components/icons/ArrowRight';
import Breadcrumb from '@/components/Breadcrumb';
import Loader from '@/components/Loader';

import useWindowSize from '@/hooks/useWindowSize';
import useSWR from 'swr';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSettingsContext } from '@/context/SettingsContext';
import { motion } from 'framer-motion';

import { format, isToday } from 'date-fns';

import { groupEventsByCountryAndTournament, handleLeagueClick } from '@/utils';

import { Tournament } from '@/types/tournament';
import { Event } from '@/types/event';
import { BreadcrumbItem } from '@/types/breadcrumb';

import { fetchEvents } from '@/api/events';
import { fetchTournaments } from '@/api/tournaments';


interface SportPageProps {
  tournaments: Tournament[];
  initialEvents: Event[];
}

const SportPage: React.FC<SportPageProps> = ({ tournaments, initialEvents }) => {
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const { sport, matchId } = router.query;
  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : '';
  const { dateFormat } = useSettingsContext();
  const intl = useIntl();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMatch, setSelectedMatch] = useState<Event | undefined>(undefined);

  const eventsKey = sport ? `/api/sport/${sport}/events/${format(selectedDate, 'yyyy-MM-dd')}` : null;
  const { data: events, error: eventsError, isValidating: loadingEvents } = useSWR(eventsKey, { fallbackData: initialEvents });

  const matchDetailsKey = matchId ? `/api/event/${matchId}` : null;
  const { data: matchDetails, isValidating: isMatchDetailsLoading } = useSWR(matchDetailsKey);

  useEffect(() => {
    if (matchDetails) {
      setSelectedMatch(matchDetails);
    }
  }, [matchDetails]);

  useEffect(() => {
    if (sport) {
      setSelectedDate(new Date());
    }
  }, [sport]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCloseMatchDetails = () => {
    setSelectedMatch(undefined);
  };

  const handleRouteBack = () => {
    handleCloseMatchDetails();
  };

  const groupedEvents = groupEventsByCountryAndTournament(events || []);

  const selectedTournament = selectedMatch ? selectedMatch.tournament.name : null;

  const getDayLabel = (date: Date) => {
    const day = format(date, 'EEEE').toLowerCase();
    switch (day) {
      case 'monday':
        return intl.formatMessage({ id: 'monday', defaultMessage: 'Monday' });
      case 'tuesday':
        return intl.formatMessage({ id: 'tuesday', defaultMessage: 'Tuesday' });
      case 'wednesday':
        return intl.formatMessage({ id: 'wednesday', defaultMessage: 'Wednesday' });
      case 'thursday':
        return intl.formatMessage({ id: 'thursday', defaultMessage: 'Thursday' });
      case 'friday':
        return intl.formatMessage({ id: 'friday', defaultMessage: 'Friday' });
      case 'saturday':
        return intl.formatMessage({ id: 'saturday', defaultMessage: 'Saturday' });
      case 'sunday':
        return intl.formatMessage({ id: 'sunday', defaultMessage: 'Sunday' });
      default:
        return day;
    }
  };

  const displayDate = isToday(selectedDate)
    ? intl.formatMessage({ id: 'today', defaultMessage: 'Today' })
    : `${getDayLabel(selectedDate)}, ${format(selectedDate, dateFormat === 'DD / MM / YYYY' ? 'dd.MM.' : 'MM.dd.')}`;

  const breadcrumbItems = [
    { name: <FormattedMessage id={sportName} />, route: `/${sport}` },
    selectedTournament
      ? { name: selectedTournament, route: `/${sport}/tournament/${selectedMatch?.tournament.id}` }
      : null,
    selectedMatch ? { name: selectedMatch.slug, route: `/${sport}/${selectedMatch.id}` } : null,
  ].filter(Boolean) as BreadcrumbItem[];

  const handleSportChange = () => {
    handleCloseMatchDetails();
    setSelectedDate(new Date());
  };

  return (
    <>
      <Head>
        <title>{sportName} Tournaments and Events</title>
        <meta name="description" content={`List of ${sportName.toLowerCase()} tournaments and events`} />
      </Head>
      <Header onClick={handleSportChange} />
      <Box as="main" p="16px" className="Micro" h="77vh" bg="colors.surface.s0">
        <Box onClick={handleRouteBack}>
          <Breadcrumb items={breadcrumbItems} />
        </Box>
        <Flex gap="16px" height="calc(100% - 50px)" mt="12px">
          <Container
            w={'calc(33% - 8px)'}
            height="100%"
            className="hidden-scrollbar"
            display={isMobile ? 'none' : 'default'}
          >
            <Text mb="16px" fontWeight="bold">
              <FormattedMessage id="Leagues" />
            </Text>
            <Flex flexDir="column" gap="16px" className="Tabular">
              {tournaments.map((tournament: any) => (
                <motion.div
                  key={tournament.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Flex
                    alignItems="center"
                    p="8px"
                    onClick={() => handleLeagueClick(tournament.id, sport as string, router)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
                      width="24px"
                      height="24px"
                      mr="8px"
                    />
                    <Text>{tournament.name}</Text>
                  </Flex>
                </motion.div>
              ))}
            </Flex>
          </Container>
          {matchId === undefined && (
            <Container
              w={isMobile ? '100%' : 'calc(33% - 8px)'}
              height="100%"
              className="hidden-scrollbar"
              p="0px"
              display={isMobile && selectedMatch ? 'none' : 'default'}
            >
              <Box mb="32px" className="sticky-navigator">
                <Navigator onDateClick={handleDateClick} date={selectedDate} />
              </Box>
              <Flex justifyContent="space-between" alignItems="center" mb="16px" mt="spacings.md" ml="spacings.sm">
                <Text fontWeight="bold">{displayDate}</Text>
                <Text color="colors.onSurface.lv2" fontSize="10px" mr="15px">
                  {events ? events.length : 0} <FormattedMessage id="Events" />
                </Text>
              </Flex>
              {loadingEvents ? (
                <Flex >
                  <Loader />
                </Flex>
              ) : (
                Object.keys(groupedEvents).map(countryName => (
                  <motion.div
                    key={countryName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box mb="spacings.xl" borderBottom="1px solid #ddd">
                      {Object.keys(groupedEvents[countryName]).map(tournamentName => (
                        <Box key={tournamentName}>
                          <Flex alignItems="center" ml="spacings.sm">
                            <Image
                              src={`https://academy-backend.sofascore.dev/tournament/${groupedEvents[countryName][tournamentName][0].tournament.id}/image`}
                              width="24px"
                              height="24px"
                              borderRadius="50%"
                              mr="8px"
                            />
                            <Text fontWeight="bold" mr="spacings.xs">
                              {countryName}
                            </Text>
                            <Flex color="colors.onSurface.lv2" textAlign="center">
                              <ArrowRight width="16px" height="16px" />
                            </Flex>
                            <Text fontWeight="bold" ml="spacings.xs" color="colors.onSurface.lv2">
                              {tournamentName}
                            </Text>
                          </Flex>
                          <Flex flexDir="column" mt="8px">
                            {groupedEvents[countryName][tournamentName].map(
                              (event: Event, index: number, array: Event[]) => (
                                <motion.div
                                  key={event.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                  <Match
                                    id={event.id}
                                    startDate={new Date(event.startDate)}
                                    homeTeam={event.homeTeam}
                                    awayTeam={event.awayTeam}
                                    homeScore={event.homeScore}
                                    winnerCode={event.winnerCode}
                                    status={event.status}
                                    awayScore={event.awayScore}
                                    onClick={() => setSelectedMatch(event)}
                                    selected={selectedMatch?.id === event.id}
                                    isLast={index === array.length - 1}
                                  />
                                </motion.div>
                              )
                            )}
                          </Flex>
                        </Box>
                      ))}
                    </Box>
                  </motion.div>
                ))
              )}
            </Container>
          )}
          {selectedMatch && (
            <Container w={isMobile ? '100%' : 'calc(33% - 8px)'} height="100%" className="hidden-scrollbar">
              {isMatchDetailsLoading ? (
                <Loader />
              ) : (
                  <MatchDetails
                    eventId={selectedMatch.id}
                    homeTeam={selectedMatch.homeTeam}
                    awayTeam={selectedMatch.awayTeam}
                    homeScore={selectedMatch.homeScore}
                    awayScore={selectedMatch.awayScore}
                    status={selectedMatch.status}
                    winnerCode={selectedMatch.winnerCode}
                    onClose={handleCloseMatchDetails}
                    hideOptions={matchId !== undefined}
                    selected={true}
                    path={`/${sport}/${selectedMatch.id}`}
                  />
              )}
            </Container>
          )}
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');
  const { sport } = params!;
  const tournaments = await fetchTournaments(sport as string);
  const events = await fetchEvents(sport as string, formattedDate);

  return {
    props: {
      tournaments,
      initialEvents: events,
    },
  };
};

export default SportPage;
