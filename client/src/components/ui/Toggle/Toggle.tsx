import React from "react";
import { ToggleContainer, ToggleTrack, ToggleKnob } from "./Toggle.styles";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <ToggleContainer
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onKeyDown={handleKeyDown}
      onClick={() => onChange(!checked)}
    >
      <ToggleTrack $checked={checked}>
        <ToggleKnob $checked={checked} />
      </ToggleTrack>
    </ToggleContainer>
  );
};
