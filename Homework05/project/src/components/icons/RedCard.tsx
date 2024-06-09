import React from 'react';

interface RedCardProps extends React.SVGProps<SVGSVGElement> {
  customStyle?: React.CSSProperties;
}

const RedCard: React.FC<RedCardProps> = ({ customStyle, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={customStyle}
    {...props}
  >
    <path d="M18 2H6a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" fill="#EA4545" />
  </svg>
);

export default RedCard;
