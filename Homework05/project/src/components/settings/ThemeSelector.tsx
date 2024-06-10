// components/ThemeSelector.tsx

import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';
import { useSettingsContext } from '@/context/SettingsContext';
import CustomRadio from '../CustomRadio';

const ThemeSelector: React.FC = () => {
  const { isDark, setIsDark } = useSettingsContext();

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold">Theme</Text>
      <Flex alignItems="center" gap="16px">
        <CustomRadio
          isChecked={!isDark}
          onChange={() => setIsDark(false)}
          label="Light"
        />
        <CustomRadio
          isChecked={isDark}
          onChange={() => setIsDark(true)}
          label="Dark"
        />
      </Flex>
    </Box>
  );
};

export default ThemeSelector;
