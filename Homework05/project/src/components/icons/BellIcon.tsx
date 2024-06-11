import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BellIconProps {
  onClick: (e: React.MouseEvent) => void;
  watched: boolean;
}

const BellIcon: React.FC<BellIconProps> = ({ onClick, watched }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    onClick(e);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Duration of the animation
  };

  return (
    <motion.svg
      onClick={handleClick}
      width="24px"
      height="26px"
      viewBox="0 0 24 24"
      fill={watched ? "gold" : "currentcolor"}
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
      animate={isAnimating ? { rotate: [0, -15, 15, -10, 10, -5, 5, 0] } : {}}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <path d="M12 2C10.3431 2 9 3.34315 9 5H15C15 3.34315 13.6569 2 12 2ZM18 8V12.883L19.528 14.411C19.7886 14.6715 20 15.021 20 15.414V17H4V15.414C4 15.021 4.21141 14.6715 4.47202 14.411L6 12.883V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8ZM16 12.883L14.528 14.411C14.2674 14.6715 14 15.021 14 15.414V17H10V15.414C10 15.021 9.73262 14.6715 9.47202 14.411L8 12.883V8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V12.883Z" />
    </motion.svg>
  );
};

export default BellIcon;
