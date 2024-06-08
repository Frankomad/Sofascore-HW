import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@kuma-ui/core';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Breadcrumb from '@/components/Breadcrumb';
import { getCode } from 'country-list';
import TournamentMatches from '@/components/TournamentMatches';
import TournamentStandings from '@/components/TournamentStandings';

interface Team {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface Tournament {
  id: number;
  name: string;
  country: Country;
}

interface Score {
  total: number;
  period1: number;
  period2: number;
  period3: number;
  period4: number;
  overtime: number;
}

interface Event {
  id: number;
  slug: string;
  tournament: Tournament;
  homeTeam: Team;
  awayTeam: Team;
  status: string;
  startDate: string;
  homeScore: any;
  awayScore: any;
  winnerCode: string;
  round: number;
}

interface SportPageProps {
  tournaments: Tournament[];
  matches: any;
  standings: any;
}

interface BreadcrumbItem {
  name: string;
  route: string;
}

const SportPage: React.FC<SportPageProps> = ({ tournaments, matches, standings }) => {
  const router = useRouter();
  const { sport, tournamentId } = router.query;
  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : '';
  const [view, setView] = useState<'matches' | 'standings'>('matches');
  const [page, setPage] = useState(3);
  const [updatedMatches, setUpdatedMatches] = useState(matches);
  const [selectedMatch, setSelectedMatch] = useState<Event | null>(null);

  const handlePageChange = (increment: number) => {
    if (page + increment > 0) {
      setPage((prevPage) => prevPage + increment);
    }
  };

  const handleLeagueClick = (tournamentId: number) => {
    const route = `/${sport}/tournament/${tournamentId}`;
    router.push(route);
  };

  const getCountryCode = (countryName: string): string | undefined => {
    if (countryName === 'England') {
      return 'gb';
    } else if (countryName === 'USA') {
      return 'us';
    } else if (countryName === 'Croatia') {
      return 'hr';
    } else if (countryName === 'Spain') {
      return 'es';
    }
    return getCode(countryName)?.toLowerCase();
  };

  const handleMatchSelect = (match: Event | null) => {
    setSelectedMatch(match);
  }

  useEffect(() => {
    const fetchNextEvents = async () => {
      try {
        const responseLast = await fetch(`/api/tournament/${tournamentId}/events/last/${page}`);
        const matchesLast = await responseLast.json();

        const responseNext = await fetch(`/api/tournament/${tournamentId}/events/next/${page}`);
        const matchesNext = await responseNext.json();

        setUpdatedMatches([...matchesNext.slice(0, 3), ...matchesLast.slice(0, 7)]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (tournamentId) {
      fetchNextEvents();
    }
  }, [page, tournamentId]);

  const breadcrumbItems = [
    { name: sportName, route: `/${sport}` },
    { name: updatedMatches[0]?.tournament.name || '', route: `/${sport}/tournament/${tournamentId}` },
    selectedMatch ? { name: selectedMatch.slug, route: `/${sport}/${selectedMatch.id}` } : null
  ].filter(Boolean) as BreadcrumbItem[];
  

  return (
    <>
      <Head>
        <title>{sportName} Tournaments and Events</title>
        <meta name="description" content={`List of ${sportName.toLowerCase()} tournaments and events`} />
      </Head>
      <Header/>
      <Box as="main" p="16px" className="Micro" h="fit-content" minH="79vh">
        <Breadcrumb items={breadcrumbItems}/>
        <Flex gap="16px" mt="12px" h="90%">
          <Container w={"calc(33% - 8px)"} height="65vh" className="hidden-scrollbar">
            <Text mb="16px" fontWeight="bold">Leagues</Text>
            <Flex flexDir="column" gap="16px">
              {tournaments.map((tournament: any) => (
                <Flex key={tournament.id} alignItems="center" p="8px" onClick={() => handleLeagueClick(tournament.id)} style={{ cursor: 'pointer' }}>
                  <Image src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`} width="24px" height="24px" borderRadius="50%" mr="8px" />
                  <Text>{tournament.name}</Text>
                </Flex>
              ))}
            </Flex>
          </Container>
          <Box w={"calc(66% - 16px)"}>
            <Container h={"35%"} mb="2%" maxHeight="110px" position="relative">
              <Flex flexDir="column">
                <Flex h="50%">
                  <Image src={`https://academy-backend.sofascore.dev/tournament/${updatedMatches[0]?.tournament.id}/image`} width="48px" height="48px" borderRadius="50%" mr="8px" />
                  <Flex flexDir="column">
                    <Text fontWeight="bold" mb="spacings.sm">{updatedMatches[0]?.tournament.name}</Text>
                    <Flex alignItems="center">
                      <Image src={`https://www.sofascore.com/static/images/flags/${getCountryCode(updatedMatches[0]?.tournament.country.name)}.png`} width="12px" height="12px" borderRadius="50%" mr="4px" />
                      <Text>{updatedMatches[0]?.tournament.country.name}</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alignItems="flex-start" position="absolute" bottom="5px">
                  <Box position="relative" mr="spacings.md" onClick={() => setView('matches')}>
                    <Text position="relative" textAlign="center" cursor="pointer" color={view === 'matches' ? 'blue' : 'black'}>Matches</Text>
                    {view === 'matches' && (
                      <Box h="4px" position={"absolute"} bg={"blue"} w="80%" bottom={'-5px'} left={'10%'} borderTopRightRadius={'8px'} borderTopLeftRadius={'8px'}></Box>
                    )}
                  </Box>
                  <Box position="relative" onClick={() => setView('standings')}>
                    <Text position="relative" textAlign="center" cursor="pointer" color={view === 'standings' ? 'blue' : 'black'}>Standings</Text>
                    {view === 'standings' && (
                      <Box h="4px" position={"absolute"} bg={"blue"} w="80%" bottom={'-5px'} left={'10%'} borderTopRightRadius={'8px'} borderTopLeftRadius={'8px'}></Box>
                    )}
                  </Box>
                </Flex>
              </Flex>
            </Container>
            {view === 'matches' ? (
              <TournamentMatches
                matches={updatedMatches}
                handlePageChange={handlePageChange}
                handleMatchSelect={handleMatchSelect}
              />
            ) : (
              <>
              <TournamentStandings standings={standings} />
              </>
            )}
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { sport, tournamentId } = params!;
  try {
    const tournamentsRes = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/tournaments`);
    const tournaments = await tournamentsRes.json();
    const matchesLastRes = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}/events/last/1`);
    const matchesNextRes = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}/events/next/1`);
    const matchesLast = await matchesLastRes.json();
    const matchesNext = await matchesNextRes.json();
    const standingsRes = await fetch(`https://academy-backend.sofascore.dev/tournament/${tournamentId}/standings`);
    const standings = await standingsRes.json();
    
    const matches = [...matchesNext.slice(0, 3), ...matchesLast.slice(0, 7)];
    return {
      props: {
        tournaments,
        matches,
        standings: standings[2]?.sortedStandingsRows || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
};

export default SportPage;
