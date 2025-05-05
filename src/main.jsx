/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx'
import Results from './pages/Results.jsx'
import Layout from './components/Layout.jsx';
import Previous from './pages/Previous.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path='/results' element={<Results />} />
      <Route path='/previous' element={<Previous />} />
    </Route>
  )
);

function Program() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Program />);
