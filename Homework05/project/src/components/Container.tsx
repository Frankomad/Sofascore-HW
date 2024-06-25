import React from 'react';
import { Box, BoxProps } from '@kuma-ui/core';
import { motion } from 'framer-motion';


interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  className?: string;
  x?: number;
  y?: number;
}

const Container: React.FC<ContainerProps> = ({ className, children, x, y, ...props }) => {
  const MotionBox = motion(Box);

  if (x !== undefined || y !== undefined) {
    return (
      <MotionBox
        p="16px"
        className={className}
        color="colors.onSurface.lv1"
        bg="colors.surface.s1"
        borderRadius="8px"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        initial={{ x: x ?? 0, y: y ?? 0, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={{ x: x ?? 0, y: y ?? 0, opacity: 0 }}
        transition={{ duration: 1}}
        {...props}
      >
        {children}
      </MotionBox>
    );
  }

  return (
    <Box
      p="16px"
      className={className}
      color="colors.onSurface.lv1"
      bg="colors.surface.s1"
      borderRadius="8px"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;
