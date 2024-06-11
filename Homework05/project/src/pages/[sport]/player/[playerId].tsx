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
import Loader from '@/components/Loader';

import useWindowSize from '@/hooks/useWindowSize';

import { handleLeagueClick, getCountryCode } from '@/utils';

import { Player } from '@/types/player';
import { Tournament } from '@/types/tournament';
import { Event } from '@/types/event';
import { BreadcrumbItem } from '@/types/breadcrumb';

import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

import { fetchPlayerDetails, fetchPlayerEventsLast, fetchPlayerEventsNext } from '@/api/player';
import { fetchTournaments } from '@/api/tournaments';


interface PlayerPageProps {
  tournaments: Tournament[];
  player: Player;
  events: Event[];
}

const PlayerPage: React.FC<PlayerPageProps> = ({ tournaments, player, events }) => {
  const router = useRouter();
  const { sport, playerId } = router.query;
  const { isMobile } = useWindowSize();
  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : '';

  const [imgSrc, setImgSrc] = useState(`https://academy-backend.sofascore.dev/player/${player.id}/image`);
  const [updatedMatches, setUpdatedMatches] = useState<Event[]>(events);
  const [page, setPage] = useState(3);
  const [selectedMatch, setSelectedMatch] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const breadcrumbItems = [
    { name: <FormattedMessage id={sportName}/>, route: `/${sport}` },
    { name: player.name, route: `/${sport}/player/${player.id}` },
    selectedMatch ? { name: selectedMatch.slug, route: `/${sport}/${selectedMatch.id}` } : null,
  ].filter(Boolean) as BreadcrumbItem[];

  const handleImageError = () => {
    setImgSrc('/Anonymous.png');
  };

  useEffect(() => {
    const fetchNextEvents = async () => {
      setIsLoading(true); // Start loading
      try {
        const responseLast = await fetch(`/api/player/${playerId}/events/last/${page}`);
        const matchesLast = await responseLast.json();

        const responseNext = await fetch(`/api/player/${playerId}/events/next/${page}`);
        const matchesNext = await responseNext.json();

        if (matchesLast.length === 0 && matchesNext.length === 0) {
          setPage((prevPage) => prevPage - 1);
        }

        setUpdatedMatches([...matchesNext.slice(0, 5), ...matchesLast.slice(0, 5)]);
      } catch (error) {
        setPage((page) => page - 1);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Stop loading
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
      <Box as="main" p="16px" className="Micro" height="fit-content" minH="77vh" bg="colors.surface.s0">
        <Breadcrumb items={breadcrumbItems} />
        <Flex gap="16px" height="calc(100% - 50px)" mt="12px">
          <Container w={"calc(33% - 8px)"} height="65vh" className="hidden-scrollbar" display={isMobile ? "none" : "default"}>
            <Text mb="16px" fontWeight="bold"><FormattedMessage id="Leagues" /></Text>
            <Flex flexDir="column" gap="16px">
              {tournaments.map((tournament: any) => (
              <motion.div
              key={tournament.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
                <Flex key={tournament.id} alignItems="center" p="8px" onClick={() => handleLeagueClick(tournament.id, sport as string, router)} style={{ cursor: 'pointer' }}>
                  <Image src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`} width="24px" height="24px" borderRadius="50%" mr="8px" />
                  <Text>{tournament.name}</Text>
                </Flex>
              </motion.div>
              ))}
            </Flex>
          </Container>
          <Box w={isMobile ? "100%" : "calc(66% - 16px)"} gap="2%">
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
                  <Flex bg="colors.surface.s2" p="8px 4px" w="20%" justify="center" alignItems="center" flexDir="column" borderRadius="5px">
                    <Text color="colors.onSurface.lv2" fontSize="8px"><FormattedMessage id="Nationality"/></Text>
                    <Flex alignItems="center">
                      <Image src={`https://www.sofascore.com/static/images/flags/${getCountryCode(player.country.name)}.png`} width="12px" height="12px" borderRadius="50%" mr="4px" />
                      <Text>{player.country.name}</Text>
                    </Flex>
                  </Flex>
                  <Flex bg="colors.surface.s2" p="8px 4px" w="20%" justify="center" alignItems="center" flexDir="column" borderRadius="5px">
                    <Text color="colors.onSurface.lv2" fontSize="8px"><FormattedMessage id="Position"/></Text>
                    <Text>{player.position}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Container>
            {isLoading ? (
              <Loader /> // Display the Loader component when loading
            ) : (
              <TournamentMatches
                matches={updatedMatches}
                handlePageChange={handlePageChange}
                handleMatchSelect={handleMatchSelect}
              />
            )}
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
    const tournaments = await fetchTournaments(sport as string);
    const player = await fetchPlayerDetails(playerId as string);
    const eventsLast = await fetchPlayerEventsLast(playerId as string);
    const eventsNext = await fetchPlayerEventsNext(playerId as string);

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
