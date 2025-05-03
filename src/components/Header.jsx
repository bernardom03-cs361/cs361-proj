import React from "react";
import { Link } from "react-router-dom";

export default function Header({ onTutorialClick, onAboutClick }) {
    return (
        <header>
          <Link to="/" className='title'>Real or Edited</Link>
          <nav>
            <Link to="/game" className='nav-button'>Today</Link>
            <Link to="/previous" className='nav-button'>Previous</Link>
            <button className='nav-button' onClick={onTutorialClick}>Tutorial</button>
            <button className='nav-button' onClick={onAboutClick}>About</button>
          </nav>
        </header>
    );
}