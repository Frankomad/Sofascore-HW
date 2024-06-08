import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@kuma-ui/core';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Breadcrumb from '@/components/Breadcrumb';
import { SettingsContextProvider } from '@/context/SettingsContext';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeSelector from '@/components/ThemeSelector';
import DateFormatSelector from '@/components/DateFormatSelector';
import InitialPageSelector from '@/components/InitialPageSelector';
import AboutSection from '@/components/AboutSection';

interface Country {
  id: number;
  name: string;
}

interface Tournament {
  id: number;
  name: string;
  country: Country;
}

interface SettingsPageProps {
  tournaments: Tournament[];
}

interface BreadcrumbItem {
  name: string;
  route: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ tournaments }) => {
  const router = useRouter();
  const { sport } = router.query;

  const handleLeagueClick = (tournamentId: number) => {
    const route = `/${sport}/tournament/${tournamentId}`;
    router.push(route);
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', route: '/' },
    { name: 'Settings', route: '/settings' },
  ];

  return (
    <SettingsContextProvider>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Settings page" />
      </Head>
      <Header />
      <Box as="main" p="16px" className="Micro" h="79vh">
        <Box onClick={() => router.back()}>
          <Breadcrumb items={breadcrumbItems} />
        </Box>
        <Flex gap="16px" height="calc(100% - 50px)" mt="12px">
          <Container w={"calc(33% - 8px)"} height="100%" className="hidden-scrollbar">
            <Text mb="16px" fontWeight="bold">Leagues</Text>
            <Flex flexDir="column" gap="16px">
              {tournaments.map((tournament: any) => (
                <Flex key={tournament.id} alignItems="center" p="8px" onClick={() => handleLeagueClick(tournament.id)} style={{ cursor: 'pointer' }}>
                  <Image src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`} width="24px" height="24px" mr="8px" />
                  <Text>{tournament.name}</Text>
                </Flex>
              ))}
            </Flex>
          </Container>
          <Container w={"calc(33% - 8px)"} height="100%">
            <Text mb="16px" fontWeight="bold" fontSize="12px">Settings</Text>
            <LanguageSelector />
            <ThemeSelector />
            <DateFormatSelector />
            <InitialPageSelector />
            <AboutSection />
          </Container>
        </Flex>
      </Box>
      <Footer />
    </SettingsContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { sport } = params!;
  const tournamentsRes = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/tournaments`);
  const tournaments = await tournamentsRes.json();

  return {
    props: {
      tournaments,
    },
  };
};

export default SettingsPage;
