// components/Container.tsx
import React from 'react';
import { Box, BoxProps } from '@kuma-ui/core';

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ className, children, ...props }) => {
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
