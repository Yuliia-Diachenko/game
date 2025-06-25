import React from 'react';

const Results = ({ playerChoice, computerChoice, result, reset, emojis, text, playerScore, computerScore }) => {

  if (!playerChoice) return null;

  return (
    <div className="results">
      <div className="choice">
        <span className='text-gamer'>{text.you}</span>
        <div className="emoji animate">{emojis[playerChoice]}</div>
      </div>
      <div className="choice">
        <span className='text-gamer'>{text.computer}</span>
        <div className={`emoji animate ${!computerChoice ? 'fade' : ''}`}>
          {computerChoice ? emojis[computerChoice] : '❓'}
        </div>
      </div>
      <h2 className="result-text">{text[result]}</h2>
      <h3 className="score">
          {text.you} {playerScore} / {text.computer} {computerScore}
      </h3>
      <button onClick={reset} className="reset-button">
        {text.playAgain}
      </button>
    </div>
  );
};

export default Results;
