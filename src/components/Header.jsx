import React from 'react';

const Header = ({ setLang, isDark, setIsDark, isMuted, setIsMuted, volume, setVolume }) => {
  return (
    <header className="top-controls">
      <div className="lang-switch">
        <button onClick={() => setLang('ua')} aria-label="Switch to Ukrainian">🇺🇦</button>
        <button onClick={() => setLang('en')} aria-label="Switch to English">🇬🇧</button>
      </div>
      <div className="sound-controls">
        <span>🔊</span>
        <label>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            disabled={isMuted}
          />
        </label>
        <button onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? '🔇' : '🔈'}
        </button>
      </div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="theme-btn"
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? '🌙' : '🌞'}
      </button>
    </header>
  );
};

export default Header;
