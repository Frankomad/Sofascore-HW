import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@kuma-ui/core';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Breadcrumb from '@/components/Breadcrumb';
import TournamentMatches from '@/components/tournament/TournamentMatches';
import TournamentStandings from '@/components/tournament/TournamentStandings';
import useWindowSize from '@/hooks/useWindowSize';
import HeaderButton from '@/components/HeaderButton';
import { handleLeagueClick, getCountryCode } from '@/utils';
import { Event } from '@/types/event';
import { Tournament } from '@/types/tournament';
import { BreadcrumbItem } from '@/types/breadcrumb';
import { StandingsRow } from '@/types/standingsRow';

interface SportPageProps {
  tournaments: Tournament[];
  matches: Event[];
  standings: StandingsRow[];
}

const SportPage: React.FC<SportPageProps> = ({ tournaments, matches, standings }) => {
  const router = useRouter();
  const { isMobile } = useWindowSize();
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
  const handleMatchSelect = (match: Event | null) => {
    setSelectedMatch(match);
  };

  useEffect(() => {
    const fetchNextEvents = async () => {
      try {
        const responseLast = await fetch(`/api/tournament/${tournamentId}/events/last/${page}`);
        const matchesLast = await responseLast.json();

        const responseNext = await fetch(`/api/tournament/${tournamentId}/events/next/${page}`);
        const matchesNext = await responseNext.json();

        if (matchesLast.length === 0 && matchesNext.length === 0) {
          setPage((prevPage) => prevPage - 1);
        }

        setUpdatedMatches([...matchesNext.slice(0, 3), ...matchesLast.slice(0, 7)]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (tournamentId) {
      fetchNextEvents();
    }
  }, [page]);

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
      <Box as="main" p="16px" className="Micro" h="fit-content" minH="77vh" bg="colors.surface.s0">
        <Breadcrumb items={breadcrumbItems}/>
        <Flex gap="16px" mt="12px" h="90%">
          <Container w={"calc(33% - 8px)"} height="65vh" className="hidden-scrollbar" display={isMobile ? "none" : "default"}>
            <Text mb="16px" fontWeight="bold">Leagues</Text>
            <Flex flexDir="column" gap="16px">
              {tournaments.map((tournament: any) => (
                <Flex key={tournament.id} alignItems="center" p="8px" onClick={() => handleLeagueClick(tournament.id, sport as string, router)} style={{ cursor: 'pointer' }}>
                  <Image src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`} width="24px" height="24px" borderRadius="50%" mr="8px" />
                  <Text>{tournament.name}</Text>
                </Flex>
              ))}
            </Flex>
          </Container>
          <Box w={isMobile ? "100%" : "calc(66% - 16px)"}>
            <Container mb="2%" maxHeight="110px" pb="0px">
              <Flex flexDir="column" h="100%">
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
                <Flex alignItems="flex-end" h="50%">
                  <HeaderButton color="colors.primary.default" label="Details" onClick={() => setView('matches')} active={view === "matches"}/>
                  <HeaderButton color="colors.primary.default" label="Standings" onClick={() => setView('standings')} active={view === "standings"}/>
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
                {standings && <TournamentStandings standings={standings} />}
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
