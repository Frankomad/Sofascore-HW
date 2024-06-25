import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';

import { useSettingsContext } from '@/context/SettingsContext';
import CustomRadio from '../CustomRadio';


const ThemeSelector: React.FC = () => {
  const { isDark, setIsDark } = useSettingsContext();

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold"><FormattedMessage id="Theme"/></Text>
      <Flex alignItems="center" gap="16px">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomRadio
            isChecked={!isDark}
            onChange={() => setIsDark(false)}
            label="Light"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomRadio
            isChecked={isDark}
            onChange={() => setIsDark(true)}
            label="Dark"
          />
        </motion.div>
      </Flex>
    </Box>
  );
};

export default ThemeSelector;
