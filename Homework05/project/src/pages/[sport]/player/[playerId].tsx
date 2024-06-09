import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@kuma-ui/core';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Breadcrumb from '@/components/Breadcrumb';
import TournamentMatches from '@/components/TournamentMatches';
import { handleLeagueClick, getCountryCode } from '@/utils';
import { Player } from '@/types/player';
import { Tournament } from '@/types/tournament';
import { Event } from '@/types/event';
import { BreadcrumbItem } from '@/types/breadcrumb';

interface PlayerPageProps {
  tournaments: Tournament[];
  player: Player;
  events: Event[];
}

const PlayerPage: React.FC<PlayerPageProps> = ({ tournaments, player, events }) => {
  const router = useRouter();
  const { sport, playerId } = router.query;

  const [imgSrc, setImgSrc] = useState(`https://academy-backend.sofascore.dev/player/${player.id}/image`);
  const [updatedMatches, setUpdatedMatches] = useState<Event[]>(events);
  const [page, setPage] = useState(1);
  const [selectedMatch, setSelectedMatch] = useState<Event | null>(null);

  const breadcrumbItems = [
    { name: sport as string, route: `/${sport}` },
    { name: player.name, route: `/${sport}/player/${player.id}` },
    selectedMatch ? { name: selectedMatch.slug, route: `/${sport}/${selectedMatch.id}` } : null,
  ].filter(Boolean) as BreadcrumbItem[];

  const handleImageError = () => {
    setImgSrc('/Anonymous.png');
  };

  useEffect(() => {
    const fetchNextEvents = async () => {
      try {
        const responseLast = await fetch(`/api/player/${playerId}/events/last/${page}`);
        const matchesLast = await responseLast.json();

        const responseNext = await fetch(`/api/player/${playerId}/events/next/${page}`);
        const matchesNext = await responseNext.json();

        setUpdatedMatches([...matchesNext.slice(0, 5), ...matchesLast.slice(0, 5)]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (playerId) {
      fetchNextEvents();
    }
  }, [page, playerId]);

  const handlePageChange = (increment: number) => {
    if (page + increment > 0) {
      setPage((prevPage) => prevPage + increment);
    }
  };

  const handleMatchSelect = (match: Event | null) => {
    setSelectedMatch(match);
  };

  return (
    <>
      <Head>
        <title>{player.name} - {sport} Player Details</title>
        <meta name="description" content={`Details and events for ${player.name}`} />
      </Head>
      <Header />
      <Box as="main" p="16px" className="Micro" height="fit-content" minH="79vh">
        <Breadcrumb items={breadcrumbItems} />
        <Flex gap="16px" height="calc(100% - 50px)" mt="12px">
          <Container w={"calc(33% - 8px)"} height="100%" className="hidden-scrollbar">
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
          <Box w={"calc(66% - 16px)"} gap="2%">
            <Container mb="2%" maxHeight="120px" position="relative">
              <Flex flexDir="column">
                <Flex h="50%">
                  <Image
                    src={imgSrc}
                    width="48px"
                    height="48px"
                    borderRadius="50%"
                    mr="8px"
                    onError={handleImageError}
                  />
                  <Flex flexDir="column">
                    <Text fontWeight="bold" mb="spacings.sm">{player.name}</Text>
                  </Flex>
                </Flex>
                <Flex mt="8px 0 12px 0" justify="space-around">
                  <Flex bg="colors.highlight.primary" p="8px 4px" w="20%" justify="center" alignItems="center" flexDir="column" borderRadius="5px">
                    <Text color="rgba(18, 18, 18, 0.4)" fontSize="8px">Nationality</Text>
                    <Flex alignItems="center">
                      <Image src={`https://www.sofascore.com/static/images/flags/${getCountryCode(player.country.name)}.png`} width="12px" height="12px" borderRadius="50%" mr="4px" />
                      <Text>{player.country.name}</Text>
                    </Flex>
                  </Flex>
                  <Flex bg="colors.highlight.primary" p="8px 4px" w="20%" justify="center" alignItems="center" flexDir="column" borderRadius="5px">
                    <Text color="rgba(18, 18, 18, 0.4)" fontSize="8px">Position</Text>
                    <Text>{player.position}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Container>
            <TournamentMatches
              matches={updatedMatches}
              handlePageChange={handlePageChange}
              handleMatchSelect={handleMatchSelect}
            />
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { sport, playerId } = params!;
  try {
    const tournamentsRes = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/tournaments`);
    const tournaments = await tournamentsRes.json();

    const playerRes = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}`);
    const player = await playerRes.json();

    const eventsLastRes = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}/events/last/1`);
    const eventsLast = await eventsLastRes.json();

    const eventsNextRes = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}/events/next/1`);
    const eventsNext = await eventsNextRes.json();

    const events = [...eventsLast.slice(0, 5), ...eventsNext.slice(0, 5)];
    return {
      props: {
        tournaments,
        player,
        events,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
};

export default PlayerPage;
