import React, { useState } from 'react';
import '../styles/ToggleSwitch.css';

interface ToggleSwitchProps {
  callFunction: () => void;
  toggleChecked: boolean;
  disabled?: boolean;
}

function ToggleSwitch({ callFunction, toggleChecked, disabled = false }: ToggleSwitchProps) {
  const [on, setOn] = useState(toggleChecked);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation(); 
    setOn(on => !on);
    callFunction();
  }

  const btnClassName = [
    "toggle-btn",
    on ? "toggle-btn-on" : "toggle-btn-off"
  ].join(" ");

  return (
    <div onClick={disabled ? undefined : handleClick}> 
      <input className="toggle-input" checked={on} readOnly/>
      <span className={btnClassName} />
    </div>
  );
}

export default ToggleSwitch;
