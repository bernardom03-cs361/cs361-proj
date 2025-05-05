/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

const axios = require("axios");

const WIKI_RANDOM_URL = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';

async function main() {
  console.time("time to fetch 5 articles")
  const articles = await Promise.all([
    fetchRandomArticle(),
    fetchRandomArticle(),
    fetchRandomArticle(),
    fetchRandomArticle(),
    fetchRandomArticle()
  ]);
  console.timeEnd("time to fetch 5 articles")

  const challenge = {
    date: setChallengeDate(),
    round1: { ...articles[0], edited: "" },
    round2: { ...articles[1], edited: "" },
    round3: { ...articles[2], edited: "" },
    round4: { ...articles[3], edited: "" },
    round5: { ...articles[4], edited: "" }
  };

  try {
    const response = await axios.post("http://localhost:5723/daily", challenge);
    console.log("Inserted Successfully!");
  } catch (err) {
    console.error("Error Inserting Challenge: ", err.message);
  }
}

main();

async function fetchRandomArticle() {
  try {
    const response = await axios.get(WIKI_RANDOM_URL);
    const { title, extract, content_urls } = response.data;
    return {
      title,
      summary: extract,
      url: content_urls?.desktop?.page || ""
    };
  } catch (error) {
    console.error('Error fetching article:', error.message);
    return {
      title: "Unavailable",
      summary: "Error fetching article.",
      url: "",
    };
  }
}

function setChallengeDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}


/*
let challenge = {
  date : setChallengeDate(),
  round1 : {
    title: "",
    url: "",
    summary: "",
    edited: ""
  },
  round2 : {
    title: "",
    url: "",
    summary: "",
    edited: ""
  },
  round3 : {
    title: "",
    url: "",
    summary: "",
    edited: ""
  },
  round4 : {
    title: "",
    url: "",
    summary: "",
    edited: ""
  },
  round5 : {
    title: "",
    url: "",
    summary: "",
    edited: ""
  }
}
*/