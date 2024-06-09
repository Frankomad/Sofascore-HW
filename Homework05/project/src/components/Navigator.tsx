import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@kuma-ui/core';
import { format, addDays } from 'date-fns';
import CustomButton from './CustomButton';

interface NavigatorProps {
  onDateClick: (date: Date) => void;
  date: Date;
}

const Navigator: React.FC<NavigatorProps> = ({ onDateClick, date }) => {
  const today = new Date();
  const initialIndex = 10;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentDate, setCurrentDate] = useState(date);

  const dates = Array.from({ length: 20 }, (_, i) => addDays(today, i - initialIndex));

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < dates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    onDateClick(date);
  };

  useEffect(() => {
    onDateClick(currentDate);
  }, [currentDate]);

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const displayedDates = dates.slice(currentIndex - 3, currentIndex + 4);

  return (
    <Flex alignItems="center" bg="colors.primary.variant" color="colors.surface.s1" borderTopLeftRadius="8px" borderTopRightRadius="8px" width="100%" height="48px">
      <CustomButton
        variant="icon"
        icon
        left
        onClick={handleLeftClick}
        ml="8px"
        h="24px"
        w="24px"
        disabled={currentIndex === 3}
        color="colors.primary.variant" 
        bg="colors.surface.s1"
      />
      <Flex flex="1" justify="space-between" overflow="hidden">
        {displayedDates.map((date, index) => (
          <Box
            key={index}
            p="8px 10px"
            textAlign="center"
            flexShrink={0}
            width="min-content"
            onClick={() => handleDateClick(date)}
            cursor="pointer"
            position="relative"
          >
            {format(date, 'dd.MM.yyyy') === format(currentDate, 'dd.MM.yyyy') && <Box h="4px" position={"absolute"} w="80%" bottom={'0px'} bg="colors.surface.s1" left={'10%'} borderTopRightRadius={'8px'} borderTopLeftRadius={'8px'}></Box>}
            {format(date, 'dd.MM.yyyy') === format(today, 'dd.MM.yyyy') ? (
              <Text fontSize="12px">TODAY</Text>
            ) : (
              <Text fontSize="12px">{format(date, 'EEE')}</Text>
            )}
            <Text fontSize="12px">{format(date, 'dd.MM')}</Text>
          </Box>
        ))}
      </Flex>
      <CustomButton
        variant="icon"
        icon
        onClick={handleRightClick}
        h="24px"
        w="24px"
        mr="8px"
        color="colors.primary.variant" 
        bg="colors.surface.s1"
        disabled={currentIndex === dates.length - 4}
      />
    </Flex>
  );
};

export default Navigator;
