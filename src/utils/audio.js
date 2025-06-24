export const createAudio = (src, loop = false) => {
  const audio = new Audio(src);
  audio.loop = loop;
  return audio;
};

export const playSound = (audio, volume, muted) => {
  if (!muted && audio) {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }
};
export const soundPaths = {
  click: '/sounds/click.mp3',
  victory: '/sounds/victory.mp3',
  defeat: '/sounds/lose.mp3',
  bg: '/sounds/bg.mp3',
};

