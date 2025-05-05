/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

import { useState } from 'react'
import { Link } from 'react-router-dom'

function Game() {
  // 0 = question, 1 = answer
  const [roundState, setRoundState] = useState(0);
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 'A' or 'B' or null

  function changeRoundState() {
    if (roundState === 1) {
      setRound((prev) => (prev < 5 ? prev + 1 : prev));
    }
    setRoundState((prev) => (prev === 0 ? 1 : 0));
    undoSelection();
  }

  function handleSelect(answer) {
    if (roundState == 1) return
    setSelectedAnswer(answer);
  }

  function undoSelection() {
    setSelectedAnswer(null);
  }

  return (
    <div className='game-container'>
        <div className='game-header'>
            <h1 className='game-article-title'>Wikipedia Article</h1>
            <div className='game-round'>{`${round} / 5`}</div>
        </div>
        <div className='answers'>
          <div
            className={`answer-box ${selectedAnswer === 'A' ? 'selected' : ''}`}
            onClick={() => handleSelect('A')}
          >
            <p>{roundState === 0 ? 'Article text here' : 'You chose: Version A'}</p>
          </div>
          <div
            className={`answer-box ${selectedAnswer === 'B' ? 'selected' : ''}`}
            onClick={() => handleSelect('B')}
          >
            <p>{roundState === 0 ? 'Edited Article text here' : 'Correct answer: Version B'}</p>
          </div>
        
        </div>
        {selectedAnswer !== null && (
          <div className="undo-button" onClick={undoSelection}>
            Undo Selection
          </div>
        )}

        <div className='submit-container'>
          {round === 5 && roundState === 1 ? (
            <Link to='/results' className='submit-answer'>
              See Results
            </Link>
          ) : (
            <button className='submit-answer' onClick={changeRoundState}>
              {roundState === 0 ? 'Submit' : 'Next'}
            </button>
          )}
          <div className='score-keeper'>{`Score - ${score}`}</div>
        </div>
    </div>
  )
}

export default Game
