
import React from 'react';

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg width={props.width || "24px"} height={props.height || "24px"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#wmklf4a3la)">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#121212"/>
    </g>
    <defs>
        <clipPath id="wmklf4a3la">
            <path fill="#fff" d="M0 0h24v24H0z"/>
        </clipPath>
    </defs>
</svg>



);

export default CloseIcon;
