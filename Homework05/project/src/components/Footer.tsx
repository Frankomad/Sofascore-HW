// components/Footer.tsx
import React from 'react'
import { Box, Text, Flex } from '@kuma-ui/core'
import SofaIcon from './icons/SofaIcon'

const Footer: React.FC = () => {
  return (
    <Box as="footer" height="10vh" bg="black" p="16px" borderTop="1px solid #ddd" color="black">
      <Flex justify="center" height="100%">
        <Text color="white">
          <SofaIcon />
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
