import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Header({ onTutorialClick, onAboutClick }) {

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
      <header>
        <Link to="/" className='title'>Real or Edited</Link>
        <nav>
          <Link to={`/game/${latest}`} className='nav-button'>Today</Link>
          <Link to="/previous" className='nav-button'>Previous</Link>
          <button className='nav-button' onClick={onTutorialClick}>Tutorial</button>
          <button className='nav-button' onClick={onAboutClick}>About</button>
        </nav>
      </header>
  );
}