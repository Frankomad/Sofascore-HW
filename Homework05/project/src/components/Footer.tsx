// components/Footer.tsx
import React from 'react'
import { Box, Text, Flex } from '@kuma-ui/core'
import SofaIcon from './icons/SofaIcon'

const Footer: React.FC = () => {
  return (
    <Box as="footer" height="11vh" bg="colors.surface.s1" p="16px" color="colors.onSurface.lv1">
      <Flex justify="center" alignItems="center" height="100%" flexDir="column">
        <Text>
          <SofaIcon />
        </Text>
        <Text color="colors.onSurface.lv2">
          2024 Sofascore - All Rights Reserved
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
