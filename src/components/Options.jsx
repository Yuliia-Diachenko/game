import React from 'react';

const Options = ({ options, mapToInternal, playerChoice, isAnimating, onPlay }) => {
  return (
    <div className="options">
      {options.map((label) => {
        const value = mapToInternal(label);
        return (
          <button
            key={value}
            className={`option-button ${playerChoice === value ? 'selected' : ''}`}
            onClick={() => onPlay(value)}
            disabled={isAnimating}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
