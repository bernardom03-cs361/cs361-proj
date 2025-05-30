require("dotenv").config({ path: "./process.env" });
const express = require("express");
const cors = require('cors');
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
app.use(express.json());

const geminiRoutes = express.Router()

geminiRoutes.route("/editSummary").post( async (req, res) => {

    const { summary } = req.body;

    try {
      const edited = await fetchEditFromGemini(summary)
      res.status(200).json({ success: true, edited })
    } catch (err) {
      console.error("Error editing summary: ", err)
      res.status(500).json({ success: false, error: err })
    }
})

let instructions = "Edit this Wikipedia summary paragraph but adhere to the following rules. You must not alter sentence structure or grammar and the edited paragraph must differ from the original only in factual content, limited to nouns or proper nouns. Make subtle changes, and limit yourself to one change per sentence at most."

async function fetchEditFromGemini(summary) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-05-20",
    contents: summary,
    config: {
        systemInstruction: instructions
    }
  });
  console.log(response.text);
  return response.text;
}

const port = 5724;
app.listen(port, () => console.log(`Server is listening on Port ${port}`));

app.use(geminiRoutes)