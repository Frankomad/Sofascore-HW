import React from 'react';
import { Button } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import ArrowRight from './icons/ArrowRight';


interface CustomButtonProps {
  variant?: 'primary' | 'stroked' | 'unshielded' | 'icon';
  disabled?: boolean;
  icon?: boolean;
  children?: React.ReactNode;
  left?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

const CustomButton: React.FC<CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'primary',
  disabled = false,
  icon = false,
  left = false,
  inverted = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant={variant}
        disabled={disabled}
        onClick={onClick}
        w="24px"
        h="24px"
        p={'0px'}
        {...props}
      >
        <>
          {children}
          {icon && <ArrowRight inverted={inverted} left={left} />}
        </>
      </Button>
    </motion.div>
  );
}

export default CustomButton;
