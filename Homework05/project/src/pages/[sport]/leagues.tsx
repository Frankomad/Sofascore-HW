import React from 'react';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@kuma-ui/core';
import Head from 'next/head';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Breadcrumb from '@/components/Breadcrumb';

import { handleLeagueClick } from '@/utils';

import { Tournament } from '@/types/tournament';
import { BreadcrumbItem } from '@/types/breadcrumb';
import { FormattedMessage } from 'react-intl';


interface LeaguePageProps {
  tournaments: Tournament[]
}

const LeaguePage: React.FC<LeaguePageProps> = ({ tournaments }) => {
  const router = useRouter()
  const { sport } = router.query
  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : ''

  const breadcrumbItems = [
    { name: sportName, route: `/${sport}` },
    { name: 'Leagues', route: `/` },
  ].filter(Boolean) as BreadcrumbItem[]

  return (
    <>
      <Head>
        <title>{sportName} Tournaments and Events</title>
        <meta name="description" content={`List of ${sportName.toLowerCase()} tournaments and events`} />
      </Head>
      <Header />
      <Box h="78vh" bg="colors.surface.s3">
        <Box m="12px">
          <Breadcrumb items={breadcrumbItems} />
        </Box>
        <Container w="90%" height="90%" ml="5%" className="hidden-scrollbar">
          <Text mb="16px" fontWeight="bold">
            <FormattedMessage id="Leagues"/>
          </Text>
          <Flex flexDir="column" gap="16px">
            {tournaments.map((tournament: any) => (
              <Flex
                key={tournament.id}
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
            ))}
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const { sport } = params!
  const tournamentsRes = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/tournaments`)
  const tournaments = await tournamentsRes.json()

  return {
    props: {
      tournaments,
    },
  }
}

export default LeaguePage
