/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

import { useLocation } from 'react-router-dom'

function Results() {
  const location = useLocation();
  const { score } = location.state || {}; 

  return (
    <div className='results-container'>
      <h2>Game Over</h2>
      <p>Your score: {score} </p>
    </div>
  );
}

export default Results