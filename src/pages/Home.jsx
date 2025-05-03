import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div className='home-container'>
      <p>Play the current day's Real or Edited challenge and test your knowledge with fresh AI-edited content</p>
      <p>Revisit and play past daily challenges you may have missed or want to retry</p>
      <p>Learn how to play the game with a quick step-by-step guide and example</p>
      <p>Read about the inspiration behind Real or Edited and meet the creator behind the project</p>
      <Link to="/game">Play Today's Game</Link>
    </div>
  )
}

export default Home
