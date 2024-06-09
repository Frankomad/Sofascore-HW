import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Box } from '@kuma-ui/core'
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
  value: number;
  max: number;
  props?: any;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max, ...props }) => {
  const percentage = (value / max) * 100;

  return (
    <Box w="24px" h="24px" {...props}>
      <CircularProgressbar
        value={percentage}
        styles={buildStyles({
          pathColor: '#4285F4',
          textColor: '#4285F4',
          trailColor: '#E5E5E5'
        })}
      />
    </Box>
  );
};

export default CircularProgress;
