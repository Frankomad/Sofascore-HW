import React, { useState } from 'react';

import { useSettings } from '../context/ToggleSettings';
import { motion } from 'framer-motion';

import ToggleSwitch from './ToggleSwitch';

import '../styles/DropdownOptions.css'; 


function Dropdown() {
  const { toggleShowDetails, showDetails, theme, setTheme } = useSettings();
  const [animationInProgress, setAnimationInProgress] = useState(false); 

  const handleToggleDetails = () => {
    if (animationInProgress) return; 
    toggleShowDetails();
    setAnimationInProgress(true); 
    setTimeout(() => setAnimationInProgress(false), 1500); 
  };

  const handleThemeClick = (theme: string) => {
    setTheme({ name: theme});
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
  };

  return (
    <motion.div className="dropdown-menu"
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      onClick={handleClick}
    >
      <ul>
        <li>
          <label className="container">
          <div className="input-container">
            <input
              type="checkbox"
              checked={theme.auto === true}
              onChange={(event) => handleThemeClick('auto')}
            />
            <div className="checkmark"></div>
            <span className="theme-text">Auto</span>
            </div>
          </label>
        </li>
        <li>
          <label className="container">
          <div className="input-container">
            <input
              type="checkbox"
              checked={theme.name === 'dark' && !theme.auto}
              onChange={(event) => handleThemeClick('dark')}
            />
            <div className="checkmark"></div>
            <span className="theme-text">Dark</span>
            </div>
          </label>
        </li>
        <li>
          <label className="container">
            <div className="input-container">
            <input
              type="checkbox"
              checked={theme.name === 'light' && !theme.auto}
              onChange={(event) => handleThemeClick('light')}
            />
            <div className="checkmark"></div>
            <span className="theme-text">Light</span>
            </div>
          </label>
        </li>
        <li>Show Details: <ToggleSwitch callFunction={handleToggleDetails} toggleChecked={showDetails} disabled={animationInProgress} /></li>
      </ul>
    </motion.div>
  );
}

export default Dropdown;
