/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

import axios from 'axios';

export async function gameLoader({ params }) {
  const id = params.id;
  const res = await axios.get("http://localhost:5723/daily");

  const roundData = res.data[id - 1];
  if (!roundData) {
    throw new Response("Round not found", { status: 404 });
  }

  return roundData;
}