
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 5723;

app.use(express.json());

const WIKI_RANDOM_URL = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';

async function fetchRandomArticle() {
  try {
    const response = await axios.get(WIKI_RANDOM_URL);
    const { title, extract, content_urls } = response.data;
    return {
      title,
      extract,
      url: content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error('Error fetching article:', error.message);
    return null;
  }
}

app.get('/random-articles', async (req, res) => {
  const promises = Array.from({ length: 5 }, () => fetchRandomArticle());
  const articles = await Promise.all(promises);

  // Filter out failed requests
  const validArticles = articles.filter(a => a !== null);
  res.json(validArticles);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
