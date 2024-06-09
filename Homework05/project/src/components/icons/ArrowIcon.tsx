// components/ArrowIcon.tsx
import React from 'react';

interface ArrowIconProps {
  isOpen: boolean;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ isOpen }) => {
  return (
    <div style={{ transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
      {/* Placeholder for arrow icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#tdzndi5cga)">
        <path d="m7 10 5 5 5-5H7z" fill="#121212"/>
    </g>
    <defs>
        <clipPath id="tdzndi5cga">
            <path fill="#fff" d="M0 0h24v24H0z"/>
        </clipPath>
    </defs>
</svg>
    </div>
  );
};

export default ArrowIcon;
