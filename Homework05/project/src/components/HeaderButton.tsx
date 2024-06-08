import React from 'react';
import { Flex, Text, Box } from '@kuma-ui/core';
import { useRouter } from 'next/router';

interface HeaderButtonProps {
  icon: React.ReactNode;
  label: string;
  route: string; // Add a route prop
  active?: boolean;
  onClick?: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, label, route, active, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    router.push(route);
  };

  return (
    <Flex
      onClick={handleClick}
      alignItems="center"
      gap="spacings.xs"
      cursor="pointer"
      p="spacings.sm"
      borderRadius="md"
      position="relative"
    >
      {icon}
      <Text>{label}</Text>
      { active && <Box h="4px" position={"absolute"} bg={"white"} w="60%" bottom={'2px'} left={'20%'} borderTopRightRadius={'8px'} borderTopLeftRadius={'8px'}></Box>}
    </Flex>
  );
};

export default HeaderButton;
