import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@kuma-ui/core';
import Head from 'next/head';
import Header from '@/components/Header';
import Navigator from '@/components/Navigator';
import MatchDetails from '@/components/MatchDetails';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Match from '@/components/Match';
import ArrowRight from '@/components/basecomponents/ArrowRight';
import useWindowSize from '@/hooks/useWindowSize';
import { format, isToday } from 'date-fns';
import { groupEventsByCountryAndTournament, handleLeagueClick } from '@/utils';
import { Team } from '@/types/team';
import { Country } from '@/types/country';
import { Tournament } from '@/types/tournament';
import { Score } from '@/types/score';
import { Event } from '@/types/event';
import { BreadcrumbItem } from '@/types/breadcrumb';
import Breadcrumb from '@/components/Breadcrumb';
import useSWR from 'swr';

interface SportPageProps {
  tournaments: Tournament[];
  initialEvents: Event[];
}

const SportPage: React.FC<SportPageProps> = ({ tournaments, initialEvents }) => {
  const router = useRouter();
  const { isMobile } = useWindowSize();
  const { sport, matchId } = router.query;
  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : '';

  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMatch, setSelectedMatch] = useState<Event | undefined>(undefined);

  console.log('matchId:', matchId);

  const { data: matchDetails } = useSWR(matchId ? `/api/event/${matchId}` : null);

  useEffect(() => {
    if (matchDetails) {
      setSelectedMatch(matchDetails);
    }
  }, [matchDetails]);

  const handleDateClick = async (date: Date) => {
    setSelectedDate(date);
    const res = await fetch(`/api/sport/${sport}/events/${format(date, 'yyyy-MM-dd')}`);
    const data = await res.json();
    setEvents(data);
  };

  const handleCloseMatchDetails = () => {
    setSelectedMatch(undefined);
  };

  const handleRouteBack = () => {
    handleCloseMatchDetails();
    setEvents(initialEvents);
  };

  const groupedEvents = groupEventsByCountryAndTournament(events);

  const selectedTournament = selectedMatch ? selectedMatch.tournament.name : null;

  const displayDate = isToday(selectedDate) ? 'Today' : format(selectedDate, 'EEEE, dd.MM.');

  const breadcrumbItems = [
    { name: sportName, route: `/${sport}` },
    selectedTournament ? { name: selectedTournament, route: `/${sport}/tournament/${selectedMatch?.tournament.id}` } : null,
    selectedMatch ? { name: selectedMatch.slug, route: `/${sport}/${selectedMatch.id}` } : null
  ].filter(Boolean) as BreadcrumbItem[];

  const handleSportChange = () => {
    setEvents(initialEvents);
    setSelectedMatch(undefined);
    setSelectedDate(new Date());
  };

  return (
    <>
      <Head>
        <title>{sportName} Tournaments and Events</title>
        <meta name="description" content={`List of ${sportName.toLowerCase()} tournaments and events`} />
      </Head>
      <Header onClick={handleSportChange} />
      <Box as="main" p="16px" className="Micro" h="79vh">
        <Box onClick={handleRouteBack}>
          <Breadcrumb items={breadcrumbItems} />
        </Box>
        <Flex gap="16px" height="calc(100% - 50px)" mt="12px">
          <Container w={"calc(33% - 8px)"} height="100%" className="hidden-scrollbar" display={isMobile ? 'none' : 'default'}>
            <Text mb="16px" fontWeight="bold">Leagues</Text>
            <Flex flexDir="column" gap="16px">
              {tournaments.map((tournament: any) => (
                <Flex key={tournament.id} alignItems="center" p="8px" onClick={() => handleLeagueClick(tournament.id, sport as string, router)} style={{ cursor: 'pointer' }}>
                  <Image src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`} width="24px" height="24px" mr="8px" />
                  <Text>{tournament.name}</Text>
                </Flex>
              ))}
            </Flex>
          </Container>
          {matchId === undefined && (
            <Container w={isMobile ? "100%" : "calc(33% - 8px)"} height="100%" className="hidden-scrollbar" p="0px" display={(isMobile && selectedMatch) ? 'none' : 'default'}>
              <Box mb="32px" className="sticky-navigator">
                <Navigator onDateClick={handleDateClick} date={selectedDate} />
              </Box>
              <Flex justifyContent="space-between" alignItems="center" mb="16px" mt="spacings.md" ml="spacings.sm">
                <Text fontWeight="bold">{displayDate}</Text>
                <Text color="grey" fontSize="10px" mr="15px">{events.length} Events</Text>
              </Flex>
              {Object.keys(groupedEvents).map(countryName => (
                <Box key={countryName} mb="spacings.xl">
                  {Object.keys(groupedEvents[countryName]).map(tournamentName => (
                    <Box key={tournamentName}>
                      <Flex alignItems="center" ml="spacings.sm">
                        <Image src={`https://academy-backend.sofascore.dev/tournament/${groupedEvents[countryName][tournamentName][0].tournament.id}/image`} width="24px" height="24px" borderRadius="50%" mr="8px" />
                        <Text fontWeight="bold" mr="spacings.xs">{countryName}</Text>
                        <ArrowRight width="16px" height="16px" />
                        <Text fontWeight="bold" ml="spacings.xs">{tournamentName}</Text>
                      </Flex>
                      <Flex flexDir="column" mt="8px">
                        {groupedEvents[countryName][tournamentName].map((event: Event, index: number, array: Event[]) => (
                          <Match
                            key={event.id}
                            startTime={new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            homeTeam={event.homeTeam}
                            awayTeam={event.awayTeam}
                            homeScore={event.homeScore}
                            status={event.status}
                            awayScore={event.awayScore}
                            onClick={() => setSelectedMatch(event)}
                            selected={selectedMatch?.id === event.id}
                            isLast={index === array.length - 1}
                          />
                        ))}
                      </Flex>
                    </Box>
                  ))}
                </Box>
              ))}
            </Container>
          )}
          {selectedMatch && (
            <Container w={isMobile ? "100%" : "calc(33% - 8px)"} height="100%" className="hidden-scrollbar">
              <MatchDetails
                eventId={selectedMatch.id}
                homeTeam={selectedMatch.homeTeam}
                awayTeam={selectedMatch.awayTeam}
                homeScore={selectedMatch.homeScore}
                awayScore={selectedMatch.awayScore}
                onClose={handleCloseMatchDetails}
                hideOptions={matchId !== undefined}
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

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');
  const { sport } = params!;
  const tournamentsRes = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/tournaments`);
  const eventsRes = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/events/${formattedDate}`);
  const tournaments = await tournamentsRes.json();
  const events = await eventsRes.json();

  return {
    props: {
      tournaments,
      initialEvents: events,
    },
  };
};

export default SportPage;