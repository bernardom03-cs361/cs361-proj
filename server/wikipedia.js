/*
    Bernardo Mendes
    CS 361 Project: Real or Edited
*/

const axios = require("axios");

async function main() {
  const previousArticles = await fetchUsedArticleTitles();

  console.time("time to fetch 5 articles")
  const articles = await Promise.all([
    fetchRandomArticle(previousArticles),
    fetchRandomArticle(previousArticles),
    fetchRandomArticle(previousArticles),
    fetchRandomArticle(previousArticles),
    fetchRandomArticle(previousArticles)
  ]);
  console.timeEnd("time to fetch 5 articles")

  let challenge = {
    date: setChallengeDate(),
    round1: { ...articles[0], edited: "" },
    round2: { ...articles[1], edited: "" },
    round3: { ...articles[2], edited: "" },
    round4: { ...articles[3], edited: "" },
    round5: { ...articles[4], edited: "" }
  };

  console.time("time to edit all 5 summaries")
  const roundKeys = ["round1", "round2", "round3", "round4", "round5"];
  await Promise.all(roundKeys.map(async (key) => {
    const res = await fetch('http://localhost:5724/editSummary', {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({ summary: challenge[key].summary })
    })
    const data = await res.json();
    console.log(data)
    challenge[key].edited = data.edited;
  }))
  console.timeEnd("time to edit all 5 summaries")

  try {
    const response = await axios.post("http://localhost:5723/daily", challenge);
    console.log("Inserted Successfully: ", response);
  } catch (err) {
    console.error("Error Inserting Challenge: ", err.message);
  }
}

main();

async function fetchUsedArticleTitles() {
  try {
    const res = await axios.get("http://localhost:5723/daily");
    const previousArticles = new Set();

    for (const challenge of res.data) {
      for (let i = 1; i < 5; i ++) {
        const key = `round${i}`;
        if (challenge[key]?.title) {
          previousArticles.add(normalizeTitle(challenge[key].title))
        }
      }
    }
    console.log(previousArticles)
    return previousArticles
  } catch (error) {
    console.error("Failed to fetch daily data:", error);
  }
}

async function fetchRandomArticle(previousArticles) {
  try {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');

    const { data } = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/${yyyy}/${mm}/${dd}`);
    const articles = data.items[0].articles;

    const filtered = articles.filter(a => !a.article.startsWith("Special:") && a.article !== "Main_Page" && !a.article.includes("."));

    const randomArticle = filtered[Math.floor(Math.random() * filtered.length)];
    //console.log(randomArticle)
    let titleKey = normalizeTitle(randomArticle.article)
    while (previousArticles.has(titleKey)) {
      randomArticle = filtered[Math.floor(Math.random() * filtered.length)];
      titleKey = normalizeTitle(randomArticle.article)
    }

    const summaryRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(randomArticle.article)}`);
    const { title, extract, content_urls } = summaryRes.data;
    previousArticles.add(titleKey);

    return {
      title,
      summary: extract,
      url: content_urls?.desktop?.page || ""
    };

  } catch (err) {
    console.error("Failed to fetch article:", err.message);
    return null;
  }
}

function normalizeTitle(title) {
  return title.trim().toLowerCase().replace(/_/g, ' ');
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