import React, { useState } from 'react'
import { useSettingsContext } from '@/context/SettingsContext'
import { Box, Text, Flex, Image } from '@kuma-ui/core'
import ArrowIcon from '../icons/ArrowIcon'

const InitialPageSelector: React.FC = () => {
  const { initialPage, setInitialPage } = useSettingsContext()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectPage = (page: string) => {
    setInitialPage(page)
    setIsOpen(false)
  }

  return (
    <Box mb="16px">
      <Text mb="8px" fontWeight="bold">
        Initial Page
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
        <span style={{ flexGrow: 1 }}>{initialPage}</span>
        <ArrowIcon isOpen={isOpen} />
      </Box>
      {isOpen && (
        <Box mt="8px" border="1px solid #ccc" borderRadius="4px" background="colors.surface.s1">
          {['Football', 'Basketball', 'Am. Football'].map(page => (
            <Box
              key={page}
              padding="8px"
              cursor="pointer"
              _hover={{ opacity: '0.5' }}
              onClick={() => handleSelectPage(page)}
            >
              {page}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default InitialPageSelector
