// CustomButton.tsx
import React from 'react';
import { Button } from "@kuma-ui/core";

interface CustomButtonProps {
  variant?: 'filled' | 'stroked' | 'unshielded';
  disabled?: boolean;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'filled', disabled = false, children }) => {
  let styles = {};

  switch (variant) {
    case 'stroked':
      styles = {
        border: `2px solid var(--color-primary-default)`,
        color: 'var(--color-primary-default)',
        bg: 'transparent',
      };
      break;
    case 'unshielded':
      styles = {
        color: 'var(--color-primary-default)',
        bg: 'transparent',
      };
      break;
    case 'filled':
    default:
      styles = {
        bg: 'var(--color-primary-default)',
        color: 'var(--on-surface-on-surface-lv-1)',
      };
  }

  if (disabled) {
    styles = {
      ...styles,
      opacity: 0.5,
    };
  }

  return (
    <Button p={8} borderRadius={6} disabled={disabled} {...styles}>
      {children}
    </Button>
  );
};

export default CustomButton;
