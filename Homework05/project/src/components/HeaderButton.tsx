import React from 'react';
import { Flex, Text, Box } from '@kuma-ui/core';
import { useRouter } from 'next/router';

interface HeaderButtonProps {
  icon?: React.ReactNode;
  label: string;
  route?: string;
  active?: boolean;
  onClick?: () => void;
  color?: string;
  secondaryColor?: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, label, route, active, color, secondaryColor, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    if (route) router.push(route);
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
      color={active ? color : secondaryColor}
    >
      {icon}
      <Text>{label}</Text>
      { active && <Box h="4px" position={"absolute"} bg={color ? color : "colors.surface.s1"} w="60%" bottom={'0px'} left={'20%'} borderTopRightRadius={'8px'} borderTopLeftRadius={'8px'}></Box>}
    </Flex>
  );
};

export default HeaderButton;
