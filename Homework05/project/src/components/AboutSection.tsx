// components/AboutSection.tsx

import React from 'react';
import { Box, Text } from '@kuma-ui/core';

const AboutSection: React.FC = () => {
  return (
    <Box mt="24px">
      <Text fontWeight="bold" mb="8px">About</Text>
      <Text>Sofascore Academy</Text>
      <Text>Class 2024</Text>
      <Text mt="16px">App Name</Text>
      <Text>Mini Sofascore App</Text>
      <Text mt="16px">API Credit</Text>
      <Text>Sofascore</Text>
      <Text mt="16px">Developer</Text>
      <Text>Fran Talan</Text>
    </Box>
  );
};

export default AboutSection;
