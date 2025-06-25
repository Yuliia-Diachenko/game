import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Options from './components/Options';
import Results from './components/Results';
import {soundPaths} from './utils/audio';
import { TEXT, EMOJIS } from './constants/game';
import './App.css';
import 'modern-normalize';

const getResult = (player, computer) => {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) {
    return 'win';
  }
  return 'lose';
};

const mapToInternal = (label, lang) => {
  if (lang === 'ua') {
    return {
      камінь: 'rock',
      ножиці: 'scissors',
      папір: 'paper',
    }[label];
  }
  return label;
};

const App = () => {
  const [lang, setLang] = useState('ua');
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
const [computerScore, setComputerScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const bgAudio = useRef(null);
  const clickAudio = useRef(null);
  const winAudio = useRef(null);
  const loseAudio = useRef(null);

  useEffect(() => {
    bgAudio.current = new Audio(soundPaths.bg);
    clickAudio.current = new Audio(soundPaths.click);
    winAudio.current = new Audio(soundPaths.victory);
    loseAudio.current = new Audio(soundPaths.defeat);

    bgAudio.current.loop = true;
    bgAudio.current.volume = volume * 0.3;

 // Play sound after user interaction (prevent autoplay error)
    const startAudioOnUserInteraction = () => {
      if (!isMuted) {
        bgAudio.current.play().catch(() => {});
      }
      window.removeEventListener('click', startAudioOnUserInteraction);
      window.removeEventListener('keydown', startAudioOnUserInteraction);
      window.removeEventListener('touchstart', startAudioOnUserInteraction);
    };

    window.addEventListener('click', startAudioOnUserInteraction);
    window.addEventListener('keydown', startAudioOnUserInteraction);
    window.addEventListener('touchstart', startAudioOnUserInteraction);

    return () => {
      bgAudio.current.pause();
      window.removeEventListener('click', startAudioOnUserInteraction);
      window.removeEventListener('keydown', startAudioOnUserInteraction);
      window.removeEventListener('touchstart', startAudioOnUserInteraction);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (bgAudio.current) {
      bgAudio.current.muted = isMuted;
      bgAudio.current.volume = volume * 0.3;
    }
  }, [isDark, isMuted, volume]);

  const playSound = (ref) => {
    if (!isMuted && ref.current) {
      ref.current.currentTime = 0;
      ref.current.volume = volume;
      ref.current.play();
    }
  };

  const handlePlay = (choice) => {
    if (isAnimating) return;
    setIsAnimating(true);
    playSound(clickAudio);

    const optionsInternal = TEXT[lang].options.map((opt) => mapToInternal(opt, lang));
    const randomChoice = optionsInternal[Math.floor(Math.random() * optionsInternal.length)];
    setPlayerChoice(choice);
    setComputerChoice('');

    setTimeout(() => {
      setComputerChoice(randomChoice);
      const res = getResult(choice, randomChoice);
      setResult(res);
      if (res === 'win') {
      setPlayerScore(prev => prev + 1);
      playSound(winAudio);
    } else if (res === 'lose') {
      setComputerScore(prev => prev + 1);
      playSound(loseAudio);}
      if (res === 'win') playSound(winAudio);
      else if (res === 'lose') playSound(loseAudio);
      setIsAnimating(false);
    }, 700);
  };

const reset = () => {
  setPlayerChoice('');
  setComputerChoice('');
  setResult('');
  setPlayerScore(0);
  setComputerScore(0);
};
  const t = TEXT[lang];

  return (
    <div className="game-wraper">
      <div className="game-container">
        <Header
          lang={lang}
          setLang={setLang}
          isDark={isDark}
          setIsDark={setIsDark}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          volume={volume}
          setVolume={setVolume}
        />
        <h1 className="title">{t.title}</h1>
        <Options
          options={t.options}
          mapToInternal={(label) => mapToInternal(label, lang)}
          playerChoice={playerChoice}
          isAnimating={isAnimating}
          onPlay={handlePlay}
        />
      <Results
          playerChoice={playerChoice}
          computerChoice={computerChoice}
          result={result}
          reset={reset}
          emojis={EMOJIS}
          text={t}
          playerScore={playerScore}
          computerScore={computerScore}
/>
      </div>
    </div>
  );
};

export default App;
