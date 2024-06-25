import React from 'react';
import { Box, Text } from '@kuma-ui/core';
import { FormattedMessage } from 'react-intl';

const AboutSection: React.FC = () => {
  return (
    <Box mt="24px">
      <Text fontWeight="bold" mb="8px">
        <FormattedMessage id="About"/>
      </Text>
      <Text>Sofascore Academy</Text>
      <Text>Class 2024</Text>
      <Text mt="16px">
        <FormattedMessage id="App Name"/>
      </Text>
      <Text>Mini Sofascore App</Text>
      <Text mt="16px">API Credit</Text>
      <Text>Sofascore</Text>
      <Text mt="16px">Developer</Text>
      <Text>Fran Talan</Text>
    </Box>
  );
};

export default AboutSection;
