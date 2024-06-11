import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Box, Flex, Text } from '@kuma-ui/core';
import { FormattedMessage } from 'react-intl';

import CustomButton from './CustomButton';
import { useSettingsContext } from '@/context/SettingsContext';


interface NavigatorProps {
  onDateClick: (date: Date) => void;
  date: Date;
}

const Navigator: React.FC<NavigatorProps> = ({ onDateClick, date }) => {
  const today = new Date();
  const initialIndex = 10;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentDate, setCurrentDate] = useState(date);
  const { dateFormat } = useSettingsContext();

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

  const getDayLabel = (date: Date) => {
    const day = format(date, 'EEEE').toLowerCase();
    switch (day) {
      case 'monday':
        return <FormattedMessage id="monday" defaultMessage="Mon" />;
      case 'tuesday':
        return <FormattedMessage id="tuesday" defaultMessage="Tue" />;
      case 'wednesday':
        return <FormattedMessage id="wednesday" defaultMessage="Wed" />;
      case 'thursday':
        return <FormattedMessage id="thursday" defaultMessage="Thu" />;
      case 'friday':
        return <FormattedMessage id="friday" defaultMessage="Fri" />;
      case 'saturday':
        return <FormattedMessage id="saturday" defaultMessage="Sat" />;
      case 'sunday':
        return <FormattedMessage id="sunday" defaultMessage="Sun" />;
      default:
        return day;
    }
  };

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
            {format(date, 'dd.MM.yyyy') === format(currentDate, 'dd.MM.yyyy') && (
              <Box h="4px" position={"absolute"} w="80%" bottom={'0px'} bg="colors.surface.s1" left={'10%'} borderTopRightRadius={'8px'} borderTopLeftRadius={'8px'}></Box>
            )}
            {format(date, 'dd.MM.yyyy') === format(today, 'dd.MM.yyyy') ? (
              <Text fontSize="12px"><FormattedMessage id="today" defaultMessage="Today" /></Text>
            ) : (
              <Text fontSize="12px">{getDayLabel(date)}</Text>
            )}
            <Text fontSize="12px">{format(date, dateFormat === 'DD / MM / YYYY' ? 'dd.MM' : 'MM.dd')}</Text>
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
