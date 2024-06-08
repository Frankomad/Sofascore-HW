// components/LanguageSelector.tsx

import React from 'react';
import { useSettingsContext } from '@/context/SettingsContext';
import { Box, Text, Flex } from '@kuma-ui/core';
import CustomRadio from './CustomRadio';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useSettingsContext();

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold">Language</Text>
      <Flex alignItems="center" gap="16px">
        <CustomRadio
          isChecked={language === 'English'}
          onChange={() => setLanguage('English')}
          label="English"
        />
        <CustomRadio
          isChecked={language === 'Croatian'}
          onChange={() => setLanguage('Croatian')}
          label="Croatian"
        />
      </Flex>
    </Box>
  );
};

export default LanguageSelector;
