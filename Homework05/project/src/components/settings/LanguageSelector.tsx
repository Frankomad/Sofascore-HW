import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import CustomRadio from '../CustomRadio';


const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const intl = useIntl();
  const handleLanguageRoute = (newLanguage: string) => {
    router.push({ pathname, query }, asPath, { locale: newLanguage });
  };

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold"><FormattedMessage id="language" defaultMessage="Language" /></Text>
      <Flex alignItems="center" gap="16px">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomRadio
            isChecked={locale === 'en'}
            onChange={() => handleLanguageRoute('en')}
            label={intl.formatMessage({ id: 'english', defaultMessage: 'English' })}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomRadio
            isChecked={locale === 'hr'}
            onChange={() => handleLanguageRoute('hr')}
            label={intl.formatMessage({ id: 'croatian', defaultMessage: 'Croatian' })}
          />
        </motion.div>
      </Flex>
    </Box>
  );
};

export default LanguageSelector;
