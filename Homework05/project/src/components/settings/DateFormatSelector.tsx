// components/DateFormatSelector.tsx

import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';
import { useSettingsContext } from '@/context/SettingsContext';
import CustomRadio from '../CustomRadio';

const DateFormatSelector: React.FC = () => {
  const { dateFormat, setDateFormat } = useSettingsContext();

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold">Date Format</Text>
      <Flex alignItems="center" gap="16px">
        <CustomRadio
          isChecked={dateFormat === 'DD / MM / YYYY'}
          onChange={() => setDateFormat('DD / MM / YYYY')}
          label="DD / MM / YYYY"
        />
        <CustomRadio
          isChecked={dateFormat === 'MM / DD / YYYY'}
          onChange={() => setDateFormat('MM / DD / YYYY')}
          label="MM / DD / YYYY"
        />
      </Flex>
    </Box>
  );
};

export default DateFormatSelector;
