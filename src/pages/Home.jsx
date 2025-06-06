/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {

  const [latest, setLatest] = useState(1)

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await axios.get("http://localhost:5723/daily");
        setLatest(res.data.length);
      } catch (err) {
        console.error("Failed to fetch latest challenge:", err);
      }
    }

    fetchLatest();
  }, []);

  return (
    <div className='home-container'>
      <h1 className="home-title">Welcome to Real or Edited</h1>
      <div className='home-text-block'>
        <p className='home-text'>Play the current day's Real or Edited challenge and test your knowledge with fresh AI-edited content</p>
        <p className='home-text'>Everyday there are 5 rounds for each of the 5 articles fetched from Wikipedia</p>
        <p className='home-text'>There will be two summaries on the screen. One is the original from Wikipedia, and another has been modified/edited by an AI</p>
        <p className='home-text'>You must click on which one you think is the fake Wikipedia article, and which sentence(s) you believe were modified</p>
        <p className='home-text'>Once you are ready, submit your answer and head to the next round</p>
      </div>
      <Link to={`/game/${latest}`} className='home-button'>Play Today's Game</Link>
    </div>
  )
}

export default Home


