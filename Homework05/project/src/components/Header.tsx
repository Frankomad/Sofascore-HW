import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Box } from '@kuma-ui/core';
import SofaIcon from './basecomponents/SofaIcon';
import TrophyIcon from './basecomponents/TrophyIcon';
import HeaderButton from './HeaderButton';
import HeaderFootball from './basecomponents/HeaderFootball';
import HeaderBasketball from './basecomponents/HeaderBasketball';
import HeaderAmericanFootball from './basecomponents/HeaderAmericanFootball';
import SettingsIcon from './basecomponents/SettingsIcon';
import useWindowSize from '@/hooks/useWindowSize';

interface HeaderProps {
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const router = useRouter();
  const { sport } = router.query;
  const { isMobile } = useWindowSize();

  const handleSettingsClick = () => {
    const route = `/${sport}/settings`;
    router.push(route);
  };

  return (
    <Flex flexDir="column" bg={"colors.primary"} height="11vh" position="relative">
      <Box display="grid" gridTemplateColumns="1fr auto 1fr" alignItems="center" h="50%">
        <Box gridColumn="2">
          <SofaIcon />
        </Box>
        <Flex justify="flex-end" gridColumn="3" p="10px" gap="spacings.md">
          <TrophyIcon cursor="pointer" display={isMobile ? "default" : "none"}/>
          <SettingsIcon cursor="pointer" onClick={handleSettingsClick}/>
        </Flex>
      </Box>
      <Flex justify="center" h="50%" alignItems="flex-end" gap="spacings.md" color="white">
        <HeaderButton onClick={onClick} icon={<HeaderFootball />} label="Football" route="/football" active={sport === 'football'} />
        <HeaderButton onClick={onClick} icon={<HeaderBasketball />} label="Basketball" route="/basketball" active={sport === 'basketball'} />
        <HeaderButton onClick={onClick} icon={<HeaderAmericanFootball />} label="Am. Football" route="/american-football" active={sport === 'american-football'} />
      </Flex>
    </Flex>
  );
};

export default Header;
