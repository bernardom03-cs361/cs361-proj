/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

import { useEffect, useState } from 'react'
import { Link, useParams, useLoaderData } from 'react-router-dom'
import axios from 'axios';

function Game() {
  const challengeData = useLoaderData();
  const roundKeys = ["round1", "round2", "round3", "round4", "round5"]

  // 0 = question, 1 = answer
  const [roundState, setRoundState] = useState(0);
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [roundData, setRoundData] = useState(challengeData[roundKeys[round - 1]])
  const [challengeID, setChallengeID] = useState(challengeData._id);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 'A' or 'B' or null
  const [selectedSummary, setSelectedSummary] = useState("");
  const [answerOne, setAnswerOne] = useState(null)
  const [answerTwo, setAnswerTwo] = useState(null)

  useEffect(() => {
    const currentRoundData = challengeData[roundKeys[round - 1]];
    setRoundData(currentRoundData);
    randomizeSummaries(currentRoundData);
  }, [round]);


  function changeRoundState() {

    if (roundState === 1 && round < 5) {
      setRound(prev => prev + 1);
    }
    else if (roundState === 0 && round < 5) {
      fetchAnswer();
    }
    setRoundState(prev => (prev === 0 ? 1 : 0));
    undoSelection();
  }


  function handleSelect(answer) {
    if (roundState === 1) return;

    setSelectedAnswer(answer);
    if (answer === 'A') {
      setSelectedSummary(answerOne);
    } else {
      setSelectedSummary(answerTwo);
    }
  }


  function undoSelection() {
    setSelectedAnswer(null);
    setSelectedSummary("");
  }

  function randomizeSummaries(data) {
    const randnum = Math.floor(Math.random() * 2);
    if (randnum === 1) {
      setAnswerOne(data.summary);
      setAnswerTwo(data.edited);
    } else {
      setAnswerOne(data.edited);
      setAnswerTwo(data.summary);
    }
  }

  async function fetchAnswer() {
    try {
      const res = await axios.put(`http://localhost:5823/check/${challengeID}`, {
        selectedAnswer: selectedSummary,
        roundNumber: round
      })

      console.log(res)

      if (res.status === 200) {
        setScore(res.data.score); 
      }

    } catch (error) {
      console.error("Scoring service error", error)
      alert("Something went wrong with submitting your answer")
    }
  }


  return (
    <div className='game-container'>
        <div className='game-header'>
            <h1 className='game-article-title'>{roundData.title}</h1>
            <div className='game-round'>{`${round} / 5`}</div>
        </div>
          <div className="answers">
            <div
              className={`answer-box
                ${selectedAnswer === 'A' ? 'selected' : ''}
                ${roundState === 1 && answerOne === roundData.edited ? 'correct' : ''}
                ${roundState === 1 && selectedAnswer === 'A' && answerOne !== roundData.edited ? 'incorrect' : ''}
              `}
              onClick={() => handleSelect('A')}
            >
              <p>{answerOne}</p>
              {roundState === 1 && selectedAnswer === 'A' && <span className="tag">Your Choice</span>}
              {roundState === 1 && answerOne === roundData.edited && <span className="tag correct-tag">Correct Answer</span>}
            </div>

            <div
              className={`answer-box
                ${selectedAnswer === 'B' ? 'selected' : ''}
                ${roundState === 1 && answerTwo === roundData.edited ? 'correct' : ''}
                ${roundState === 1 && selectedAnswer === 'B' && answerTwo !== roundData.edited ? 'incorrect' : ''}
              `}
              onClick={() => handleSelect('B')}
            >
              <p>{answerTwo}</p>
              {roundState === 1 && selectedAnswer === 'B' && <span className="tag">Your Choice</span>}
              {roundState === 1 && answerTwo === roundData.edited && <span className="tag correct-tag">Correct Answer</span>}
            </div>
          </div>


        {selectedAnswer !== null && (
          <div className="undo-button" onClick={undoSelection}>
            Undo Selection
          </div>
        )}

        <div className='submit-container'>
          {round === 5 && roundState === 1 ? (
            <Link to='/results' className='submit-answer' state={{ score }}>See Results</Link>
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
