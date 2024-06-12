import React from 'react';
import { Box, Text, Flex } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';


interface CustomRadioProps {
  isChecked: boolean;
  onChange: () => void;
  label: string;
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
      <FormattedMessage id={label} defaultMessage={label} />
    </motion.div>
  );
};

export default CustomRadio;
