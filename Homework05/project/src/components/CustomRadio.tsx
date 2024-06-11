import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';
import { motion } from 'framer-motion';


interface CustomRadioProps {
  isChecked: boolean;
  onChange: () => void;
  label: React.ReactNode;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ isChecked, onChange, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onChange}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    >
      <Box
        as="input"
        type="radio"
        checked={isChecked}
        onChange={onChange}
        mr="8px"
      />
      <Text>{label}</Text>
    </motion.div>
  );
};

export default CustomRadio;
