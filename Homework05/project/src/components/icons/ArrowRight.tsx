import React from 'react';

interface ArrowProps extends React.SVGProps<SVGSVGElement> {
  left?: boolean;
  inverted?: boolean;
}

const Arrow: React.FC<ArrowProps> = ({ left, inverted, ...props }) => (
  <svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ transform: left ? 'rotate(180deg)' : 'none', ...props.style }}
  >
    <g clipPath="url(#gmiod81vea)">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="gmiod81vea">
        <path fill="#fff" d="M0 0h24v24H0z"/>
      </clipPath>
    </defs>
  </svg>
);

export default Arrow;
