import React from 'react';
import { useSettingsContext } from '@/context/SettingsContext';
import { Box, Text, Flex } from '@kuma-ui/core';
import CustomRadio from '../CustomRadio';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useSettingsContext();

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold">Language</Text>
      <Flex alignItems="center" gap="16px">
        <CustomRadio
          isChecked={language === 'en'}
          onChange={() => setLanguage('en')}
          label="English"
        />
        <CustomRadio
          isChecked={language === 'cro'}
          onChange={() => setLanguage('cro')}
          label="Croatian"
        />
      </Flex>
    </Box>
  );
};

export default LanguageSelector;
