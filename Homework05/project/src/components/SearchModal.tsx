import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Input } from '@kuma-ui/core';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

import { SearchTeam } from '@/types/team';
import { SearchPlayer } from '@/types/player';

import PlayerItem from './player/PlayerItem';
import TeamItem from './team/TeamItem';
import SearchIcon from './icons/SearchIcon';
import Loader from './Loader';


const AnimatedBox = motion(Box);

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<(SearchTeam | SearchPlayer)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH || '';
      const teamsResponse = await fetch(`${basePath}/api/search/team/${query}`);
      const teams: SearchTeam[] = await teamsResponse.json();
      const playersResponse = await fetch(`${basePath}/api/search/player/${query}`);
      const players: SearchPlayer[] = await playersResponse.json();
      setResults([...teams, ...players]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (sport: string, id: number, type: 'teams' | 'player') => {
    const route = `/${sport.toLowerCase()}/${type}/${id}`;
    router.push(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatedBox
    position="fixed"
    top="0"
    left="0"
    width="100%"
    height="100%"
    bg="rgba(0, 0, 0, 0.7)"
    display="flex"
    justifyContent="center"
    alignItems="center"
    zIndex="1000"
    onClick={onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <AnimatedBox
      width="80%"
      height="80%"
      bg="colors.surface.s0"
      p="24px"
      borderRadius="12px"
      boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
      onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Text fontSize="24px" fontWeight="bold" mb="16px" textAlign="center">
        <FormattedMessage id="Search Players or Teams" />
      </Text>
      <Box position="relative">
        <Input
          placeholder="Type to search..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          mb="16px"
          width="100%"
          p="12px"
          fontSize="16px"
          border="1px solid #ddd"
          borderRadius="8px"
        />
        <Box position="absolute" top="10px" right="15px" onClick={handleSearch} cursor="pointer" color="black">
          <SearchIcon />
        </Box>
      </Box>
      <Flex flexDir="column" className="hidden-scrollbar" height="75%">
        {loading ? (
          <Loader /> // Display the Loader component when loading
        ) : (
          results.map((result) => (
            'position' in result ? (
              <PlayerItem key={result.id} player={result} onClick={() => handleRedirect(result.sport.name, result.id, 'player')} />
            ) : (
              <TeamItem key={result.id} team={result} onClick={() => handleRedirect(result.sport.name, result.id, 'teams')} />
            )
          ))
        )}
        {!loading && results.length === 0 && (
          <Text textAlign="center" color="gray">
            <FormattedMessage id="No results found" />.
          </Text>
        )}
      </Flex>
    </AnimatedBox>
  </AnimatedBox>
);
};

export default SearchModal;
