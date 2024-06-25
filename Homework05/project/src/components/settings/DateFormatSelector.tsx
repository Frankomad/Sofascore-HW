import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';

import { useSettingsContext } from '@/context/SettingsContext';
import CustomRadio from '../CustomRadio';


const DateFormatSelector: React.FC = () => {
  const { dateFormat, setDateFormat } = useSettingsContext();

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold"><FormattedMessage id="Date Format"/></Text>
      <Flex alignItems="center" gap="16px">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomRadio
            isChecked={dateFormat === 'DD / MM / YYYY'}
            onChange={() => setDateFormat('DD / MM / YYYY')}
            label="DD / MM / YYYY"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomRadio
            isChecked={dateFormat === 'MM / DD / YYYY'}
            onChange={() => setDateFormat('MM / DD / YYYY')}
            label="MM / DD / YYYY"
          />
        </motion.div>
      </Flex>
    </Box>
  );
};

export default DateFormatSelector;
