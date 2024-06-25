import React from 'react';
import { Flex, Text, Box } from '@kuma-ui/core';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';


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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <Flex
        alignItems="center"
        gap="spacings.xs"
        cursor="pointer"
        p="spacings.sm"
        borderRadius="md"
        position="relative"
        color={active ? color : secondaryColor}
      >
        {icon}
        <Text><FormattedMessage id={label} /></Text>
        {active && (
          <Box
            h="4px"
            position={"absolute"}
            bg={color ? color : "colors.surface.s1"}
            w="60%"
            bottom={'0px'}
            left={'20%'}
            borderTopRightRadius={'8px'}
            borderTopLeftRadius={'8px'}
          ></Box>
        )}
      </Flex>
    </motion.div>
  );
};

export default HeaderButton;
