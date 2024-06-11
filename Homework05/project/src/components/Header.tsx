import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box } from '@kuma-ui/core';
import { motion } from 'framer-motion';

import SofaIcon from './icons/SofaIcon';
import TrophyIcon from './icons/TrophyIcon';
import HeaderButton from './HeaderButton';
import HeaderFootball from './icons/HeaderFootball';
import HeaderBasketball from './icons/HeaderBasketball';
import HeaderAmericanFootball from './icons/HeaderAmericanFootball';
import SettingsIcon from './icons/SettingsIcon';
import SearchIcon from './icons/SearchIcon';
import SearchModal from './SearchModal';
import BellIcon from './icons/BellIcon';

import useWindowSize from '@/hooks/useWindowSize';


interface HeaderProps {
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const router = useRouter();
  const { sport } = router.query;
  const { isMobile } = useWindowSize();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleSettingsClick = () => {
    const route = `/${sport}/settings`;
    router.push(route);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleBellClick = () => {
    const route = `/${sport}/watchlist`;
    router.push(route);
  };

  const handleLeagueClick = () => {
    const route = `/${sport}/leagues`;
    router.push(route);
  };

  return (
    <>
      <Flex flexDir="column" bg={'colors.primary.default'} height="12vh" position="relative" color={'colors.surface.s1'} className="Headline-3">
        <Box
          display={isMobile ? 'flex' : 'grid'}
          gridTemplateColumns="1fr auto 1fr"
          justify="space-between"
          alignItems="center"
          h="55%"
        >
          <Box gridColumn="2" ml="8px" mt="4px">
            <SofaIcon />
          </Box>
          <Flex justify="flex-end" gridColumn="3" p="10px" gap="spacings.md" mt="4px">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <SearchIcon cursor="pointer" onClick={handleSearchClick} />
            </motion.div>
            <Box  display={isMobile ? 'default' : 'none'}>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <TrophyIcon cursor="pointer"onClick={handleLeagueClick} />
            </motion.div>
            </Box>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <BellIcon onClick={() => handleBellClick()} watched={false} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <SettingsIcon cursor="pointer" onClick={handleSettingsClick} />
            </motion.div>
          </Flex>
        </Box>
        <Flex justify="center" h="45%" alignItems="flex-end" gap="spacings.md">
          <HeaderButton
            onClick={onClick}
            icon={<HeaderFootball />}
            label="Football"
            route="/football"
            active={sport === 'football'}
          />
          <HeaderButton
            onClick={onClick}
            icon={<HeaderBasketball />}
            label="Basketball"
            route="/basketball"
            active={sport === 'basketball'}
          />
          <HeaderButton
            onClick={onClick}
            icon={<HeaderAmericanFootball />}
            label="Am. Football"
            route="/american-football"
            active={sport === 'american-football'}
          />
        </Flex>
      </Flex>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
