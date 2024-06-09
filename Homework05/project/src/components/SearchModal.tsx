import React, { useState } from 'react';
import { Box, Flex, Text, Input } from '@kuma-ui/core';
import { useRouter } from 'next/router';
import { SearchTeam } from '@/types/team';
import { SearchPlayer } from '@/types/player';
import PlayerItem from './player/PlayerItem';
import TeamItem from './team/TeamItem';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<(SearchTeam | SearchPlayer)[]>([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;
    try {
      const teamsResponse = await fetch(`api/search/team/${query}`);
      const teams: SearchTeam[] = await teamsResponse.json();
      const playersResponse = await fetch(`api/search/player/${query}`);
      const players: SearchPlayer[] = await playersResponse.json();
      setResults([...teams, ...players]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleRedirect = (sport : string, id: number, type: 'teams' | 'player') => {
    const route = `/${sport.toLowerCase()}/${type}/${id}`;
    router.push(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Box
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
    >
      <Box
        width="80%"
        height="80%"
        bg="white"
        p="24px"
        borderRadius="12px"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
        onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}
      >
        <Text fontSize="24px" fontWeight="bold" mb="16px" textAlign="center">
          Search Players or Teams
        </Text>
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
        <Flex flexDir="column" className="hidden-scrollbar" height="75%">
          {results.map((result) => (
            'position' in result ? (
              <PlayerItem key={result.id} player={result} onClick={() => handleRedirect(result.sport.name, result.id, 'player')} />
            ) : (
              <TeamItem key={result.id} team={result} onClick={() => handleRedirect(result.sport.name, result.id, 'teams')} />
            )
          ))}
          {results.length === 0 && (
            <Text textAlign="center" color="gray">
              No results found.
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default SearchModal;
