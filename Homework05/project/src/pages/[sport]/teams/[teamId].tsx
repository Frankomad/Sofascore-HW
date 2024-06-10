import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Flex, Text, Image } from '@kuma-ui/core'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import Breadcrumb from '@/components/Breadcrumb'
import Match from '@/components/match/Match'
import TeamIcon from '@/components/icons/TeamIcon'
import CircularProgress from '@/components/icons/CircularProgress'
import TournamentMatches from '@/components/tournament/TournamentMatches'
import TournamentStandings from '@/components/tournament/TournamentStandings'
import PlayerList from '@/components/player/PlayerList'
import ArrowRight from '@/components/icons/ArrowRight'
import useWindowSize from '@/hooks/useWindowSize'
import HeaderButton from '@/components/HeaderButton'
import { handleLeagueClick, getCountryCode } from '@/utils'
import { Tournament } from '@/types/tournament'
import { Event } from '@/types/event'
import { Player } from '@/types/player'
import { Team } from '@/types/team'
import { BreadcrumbItem } from '@/types/breadcrumb'
import Loader from '@/components/Loader' // Import the Loader component

type ViewType = 'details' | 'squad' | 'matches' | 'standings'

interface SportPageProps {
  tournaments: Tournament[]
  teamDetails: Team
  teamTournaments: Tournament[]
  teamEvent: Event
  teamSquad: Player[]
}

const SportPage: React.FC<SportPageProps> = ({ tournaments, teamDetails, teamTournaments, teamEvent, teamSquad }) => {
  const router = useRouter()
  const { isMobile } = useWindowSize()
  const { sport, matchId } = router.query
  const sportName = typeof sport === 'string' ? sport.charAt(0).toUpperCase() + sport.slice(1) : ''

  const [view, setView] = useState<ViewType>('details')
  const [standings, setStandings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSquadLoading, setIsSquadLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [teamMatches, setTeamMatches] = useState<Event[]>([])
  const [selectedMatch, setSelectedMatch] = useState<Event | null>(null)

  const getNumberOfForeignPlayers = (teamDetails: Team, teamSquad: Player[]): number => {
    const foreignPlayers = teamSquad.filter(player => player.country.name !== teamDetails.country.name)
    return foreignPlayers.length
  }

  const handleMatchClick = (matchId: number) => {
    const route = `/${sport}/${matchId}`
    router.push(route)
  }

  const handleMatchSelect = (match: Event | null) => {
    setSelectedMatch(match)
  }

  const handlePageChange = (increment: number) => {
    if (page + increment > 0) {
      setPage(prevPage => prevPage + increment)
    }
  }

  useEffect(() => {
    const fetchStandings = async () => {
      setIsLoading(true)
      if (view === 'standings') {
        try {
          const standingsRes = await fetch(`/api/tournament/${teamTournaments[0].id}/standings`)
          const standingsData = await standingsRes.json()
          setStandings(standingsData[2].sortedStandingsRows)
        } catch (error) {
          console.error('Error fetching standings:', error)
        } finally {
          setIsLoading(false)
        }
      } else if (view === 'matches') {
        try {
          const matchesLastRes = await fetch(`/api/team/${teamDetails.id}/events/last/${page}`)
          const matchesLast = await matchesLastRes.json()
          const matchesNextRes = await fetch(`/api/team/${teamDetails.id}/events/next/${page}`)
          const matchesNext = await matchesNextRes.json()

          if (matchesLast.length === 0 && matchesNext.length === 0) {
            setPage((prevPage) => prevPage - 1);
          }

          setTeamMatches([...matchesLast.slice(0, 5), ...matchesNext.slice(0, 5)])
        } catch (error) {
          setPage((page) => page - 1)
          console.error('Error fetching matches:', error)
        } finally {
          setIsLoading(false)
        }
      } else if (view === 'squad') {
        setIsSquadLoading(true)
        try {
          const teamSquadRes = await fetch(`/api/team/${teamDetails.id}/players`)
          const teamSquadData = await teamSquadRes.json()
          setTeamMatches(teamSquadData)
        } catch (error) {
          console.error('Error fetching squad:', error)
        } finally {
          setIsSquadLoading(false)
        }
      }
    }

    fetchStandings()
  }, [view, teamDetails.id, page])

  const breadcrumbItems = [
    { name: sportName, route: `/${sport}` },
    { name: teamDetails.name || '', route: `/${sport}/teams/${teamDetails.id}` },
    selectedMatch ? { name: selectedMatch.slug, route: `/${sport}/${selectedMatch.id}` } : null,
  ].filter(Boolean) as BreadcrumbItem[]

  return (
    <>
      <Head>
        <title>{sportName} Tournaments and Events</title>
        <meta name="description" content={`List of ${sportName.toLowerCase()} tournaments and events`} />
      </Head>
      <Header />
      <Box as="main" p="16px" className="Micro" height="fit-content" minH="77vh" bg="colors.surface.s0">
        <Breadcrumb items={breadcrumbItems} />
        <Flex gap="16px" height="calc(100% - 50px)" mt="12px">
          <Container
            w={'calc(33% - 8px)'}
            height="64vh"
            className="hidden-scrollbar"
            display={isMobile ? 'none' : 'default'}
          >
            <Text mb="16px" fontWeight="bold">
              Leagues
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
                    borderRadius="50%"
                    mr="8px"
                  />
                  <Text>{tournament.name}</Text>
                </Flex>
              ))}
            </Flex>
          </Container>
          <Box w={isMobile ? '100%' : 'calc(66% - 16px)'} gap="2%">
            <Container mb="2%" maxHeight="110px" position="relative" height="110px" pb="0px">
              <Flex flexDir="column" h="100%">
                <Flex h="50%">
                  <Image
                    src={`https://academy-backend.sofascore.dev/team/${teamDetails.id}/image`}
                    width="48px"
                    height="48px"
                    mr="8px"
                  />
                  <Flex flexDir="column">
                    <Text fontWeight="bold" mb="spacings.sm">
                      {teamDetails.name}
                    </Text>
                    <Flex alignItems="center">
                      <Image
                        src={`https://www.sofascore.com/static/images/flags/${getCountryCode(
                          teamDetails.country.name
                        )}.png`}
                        width="12px"
                        height="12px"
                        borderRadius="50%"
                        mr="4px"
                      />
                      <Text>{teamDetails.country.name}</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alignItems="flex-end" h="50%">
                  <HeaderButton
                    color="colors.primary.default"
                    label="Details"
                    onClick={() => setView('details')}
                    active={view == 'details'}
                  />
                  <HeaderButton
                    color="colors.primary.default"
                    label="Matches"
                    onClick={() => setView('matches')}
                    active={view == 'matches'}
                  />
                  <HeaderButton
                    color="colors.primary.default"
                    label="Standings"
                    onClick={() => setView('standings')}
                    active={view == 'standings'}
                  />
                  <HeaderButton
                    color="colors.primary.default"
                    label="Squad"
                    onClick={() => setView('squad')}
                    active={view == 'squad'}
                  />
                </Flex>
              </Flex>
            </Container>
            {view === 'details' && (
              <Flex w="100%" gap={isMobile ? '8px' : '2%'} flexDir={isMobile ? 'column' : 'row'}>
                <Flex flexDir="column" w={isMobile ? '100%' : '49%'} gap="8px">
                  <Container w="100%" p="0px" color="colors.onSurface.lv1">
                    <Flex justify="center" mb="4px" p="16px">
                      <Text fontWeight="bold">Team Info</Text>
                    </Flex>
                    <Flex alignItems="center" justify="center" p="8px" borderBottom="1px solid #ddd">
                      <Image src={`/Anonymous.png`} w="24px" h="24px" borderRadius="50%" />
                      <Text ml="8px">Coach: {teamDetails.managerName}</Text>
                    </Flex>
                    <Flex m="12px 0 16px 0">
                      <Flex flexDir="column" w={isMobile ? '100%' : '50%'} alignItems="center" gap="8px">
                        <TeamIcon />
                        <Text>{teamSquad.length}</Text>
                        <Text textAlign="center">Total Players</Text>
                      </Flex>
                      <Flex flexDir="column" w={isMobile ? '100%' : '50%'} alignItems="center" gap="8px">
                        <CircularProgress
                          value={getNumberOfForeignPlayers(teamDetails, teamSquad)}
                          max={teamSquad.length}
                        />
                        <Text>{getNumberOfForeignPlayers(teamDetails, teamSquad)}</Text>
                        <Text textAlign="center">Foreign Players</Text>
                      </Flex>
                      <Flex flexDir="column" w={isMobile ? '100%' : '50%'} alignItems="center" gap="8px">
                        <CircularProgress
                          value={teamSquad.length - getNumberOfForeignPlayers(teamDetails, teamSquad)}
                          max={teamSquad.length}
                        />
                        <Text>{teamSquad.length - getNumberOfForeignPlayers(teamDetails, teamSquad)}</Text>
                        <Text textAlign="center">National Players</Text>
                      </Flex>
                    </Flex>
                  </Container>
                  <Container w="100%">
                    <Flex justify="center" mb="12px">
                      <Text fontWeight="bold">Venue</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Stadium</Text>
                      <Text>{teamDetails.venue}</Text>
                    </Flex>
                  </Container>
                </Flex>
                <Flex flexDir="column" w={isMobile ? '100%' : '49%'} gap="8px">
                  <Container w="100%">
                    <Flex justify="center" mb="12px" fontWeight="bold">
                      <Text>Leagues</Text>
                    </Flex>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap="16px">
                      {teamTournaments.map((tournament: any) => (
                        <Flex
                          key={tournament.id}
                          flexDir="column"
                          alignItems="center"
                          onClick={() => handleLeagueClick(tournament.id, sport as string, router)}
                          cursor="pointer"
                        >
                          <Image
                            src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
                            width="36px"
                            height="36px"
                            borderRadius="50%"
                            mb="8px"
                          />
                          <Text textAlign="center">{tournament.name}</Text>
                        </Flex>
                      ))}
                    </Box>
                  </Container>
                  <Container w="100%">
                    <Flex justify="center" mb="12px" w="100%">
                      <Text fontWeight="bold">Next Match</Text>
                    </Flex>
                    <Flex alignItems="center" mb="8px">
                      <Image
                        src={`https://academy-backend.sofascore.dev/tournament/${teamEvent.tournament.id}/image`}
                        width="24px"
                        height="24px"
                        borderRadius="50%"
                        mr="8px"
                      />
                      <Flex fontWeight="bold" alignItems="center">
                        {teamEvent.tournament.country.name} 
                        <Text color="colors.onSurface.lv2">
                          <ArrowRight width="12px" height="12px"/>
                          {teamEvent.tournament.name}
                        </Text>
                      </Flex>
                    </Flex>
                    <Match
                      key={teamEvent.id}
                      id={teamEvent.id}
                      startDate={new Date(teamEvent.startDate)}
                      homeTeam={teamEvent.homeTeam}
                      awayTeam={teamEvent.awayTeam}
                      homeScore={teamEvent.homeScore}
                      winnerCode={teamEvent.winnerCode}
                      status={teamEvent.status}
                      awayScore={teamEvent.awayScore}
                      onClick={() => handleMatchClick(teamEvent.id)}
                      isLast={true}
                    />
                  </Container>
                </Flex>
              </Flex>
            )}
            {view === 'squad' && (
              isSquadLoading ? (
                <Loader /> // Display the Loader component when loading squad
              ) : (
                <Container w="100%" p="0px">
                  <Flex justify="center" mb="12px" p="8px">
                    <Text fontWeight="bold">Team Info</Text>
                  </Flex>
                  <Flex alignItems="center" justify="center" p="8px">
                    <Image src="/Anonymous.png" w="36px" h="36px" borderRadius="50%" />
                    <Text ml="8px">Coach: {teamDetails.managerName}</Text>
                  </Flex>
                  <Flex borderBottom="1px solid #ddd">
                    <Text m="0px 16px 12px 16px">Players:</Text>
                  </Flex>
                  <PlayerList teamId={teamDetails.id} />
                </Container>
              )
            )}
            {view === 'matches' && (
              isLoading ? (
                <Loader /> // Display the Loader component when loading matches
              ) : (
                <TournamentMatches
                  matches={teamMatches}
                  handlePageChange={handlePageChange}
                  handleMatchSelect={handleMatchSelect}
                />
              )
            )}
            {view === 'standings' &&
              (isLoading ? (
                <Loader /> // Display the Loader component when loading standings
              ) : (
                <TournamentStandings resetPage={() => setView('details')} standings={standings} />
              ))}
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { sport, teamId } = params!
  try {
    const tournamentsRes = await fetch(`https://academy-backend.sofascore.dev/sport/${sport}/tournaments`)
    const tournaments = await tournamentsRes.json()

    const teamDetailsRes = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}`)
    const teamDetails = await teamDetailsRes.json()

    const teamTournamentsRes = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/tournaments`)
    const teamTournaments = await teamTournamentsRes.json()

    const teamEventsNext = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/events/next/1`)
    const teamEvent = await teamEventsNext.json()

    const teamSquadRes = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/players`)
    const teamSquad = await teamSquadRes.json()

    return {
      props: {
        tournaments,
        teamDetails,
        teamTournaments,
        teamEvent: teamEvent[0],
        teamSquad,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      notFound: true,
    }
  }
}

export default SportPage
