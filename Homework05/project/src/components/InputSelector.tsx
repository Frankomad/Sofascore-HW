// components/InputSelector.tsx
import React, { useState } from 'react';
import { Box, Text } from "@kuma-ui/core";
import ArrowIcon from './basecomponents/ArrowIcon';

interface InputSelectorProps {
  hintLabel: string;
  itemLabel?: string;
  disabled?: boolean;
  error?: boolean;
  active?: boolean;
  filled?: boolean;
}

const InputSelector: React.FC<InputSelectorProps> = ({
  hintLabel,
  itemLabel,
  disabled = false,
  error = false,
  active = false,
  filled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  let borderColor = '#ccc';
  if (error) {
    borderColor = '#ff0000';
  } else if (active) {
    borderColor = '#0000ff';
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      border={`1px solid ${borderColor}`}
      borderRadius="4px"
      p="8px"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={disabled ? '#f0f0f0' : '#fff'}
      color={disabled ? '#aaa' : '#000'}
      opacity={disabled ? 0.5 : 1}
      transition="border-color 0.3s"
      onClick={toggleDropdown}
    >
      <Text fontSize="12px" color={error ? '#ff0000' : '#0000ff'}>
        {hintLabel}
      </Text>
      <Box display="flex" alignItems="center">
        <Text flexGrow={1}>
          {itemLabel || hintLabel}
        </Text>
        <ArrowIcon isOpen={isOpen} />
      </Box>
    </Box>
  );
};

export default InputSelector;
