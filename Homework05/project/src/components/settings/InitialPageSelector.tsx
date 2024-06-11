import React, { useState } from 'react';
import { useSettingsContext } from '@/context/SettingsContext';
import { Box, Text } from '@kuma-ui/core';
import ArrowIcon from '../icons/ArrowIcon';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';


const dropdownVariants = {
  open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const InitialPageSelector: React.FC = () => {
  const { initialPage, setInitialPage } = useSettingsContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectPage = (page: string) => {
    setInitialPage(page);
    setIsOpen(false);
  };

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold">
        <FormattedMessage id="Initial Page" />
      </Text>
      <Box
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius="4px"
        padding="8px"
        cursor="pointer"
        bg='colors.surface.s1'
        onClick={toggleDropdown}
      >
        <span style={{ flexGrow: 1 }}><FormattedMessage id={initialPage} /></span>
        <ArrowIcon isOpen={isOpen} />
      </Box>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={dropdownVariants}
      >
        <Box mt="8px" border="1px solid #ccc" borderRadius="4px" background="colors.surface.s1">
          {['Football', 'Basketball', 'Am. Football'].map(page => (
            <Box
              key={page}
              padding="8px"
              cursor="pointer"
              _hover={{ opacity: '0.5' }}
              onClick={() => handleSelectPage(page)}
            >
              <FormattedMessage id={page} />
            </Box>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default InitialPageSelector;
