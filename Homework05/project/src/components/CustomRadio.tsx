// components/CustomRadio.tsx
import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';

interface CustomRadioProps {
  isChecked: boolean;
  onChange: () => void;
  label: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ isChecked, onChange, label }) => {
  return (
    <Flex alignItems="center">
      <Box
        as="input"
        type="radio"
        checked={isChecked}
        onChange={onChange}
        mr="8px"
      />
      <Text>{label}</Text>
    </Flex>
  );
};

export default CustomRadio;
