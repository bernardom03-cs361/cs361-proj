const express = require("express");
require("dotenv").config({ path: "./process.env" });
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(express.json());

const port = 4804;
app.listen(port, () => console.log(`Server is listening on Port ${port}`));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

let wikipediaSummary = "Oppenheimer is a 2023 epic biographical drama film written, produced, and directed by Christopher Nolan.[8] It follows the life of J. Robert Oppenheimer, the American theoretical physicist who helped develop the first nuclear weapons during World War II. Based on the 2005 biography American Prometheus by Kai Bird and Martin J. Sherwin, the film dramatizes Oppenheimer's studies, his direction of the Los Alamos Laboratory and his 1954 security hearing. Cillian Murphy stars as Oppenheimer, alongside Robert Downey Jr. as the United States Atomic Energy Commission member Lewis Strauss. The ensemble supporting cast includes Emily Blunt, Matt Damon, Florence Pugh, Josh Hartnett, Casey Affleck, Rami Malek, and Kenneth Branagh."
let instructions = "Edit this Wikipedia summary paragraph but adhere to the following rules. You must not alter sentence structure or grammar and the edited paragraph must differ from the original only in factual content, limited to nouns or proper nouns. Make subtle changes, and limit yourself to one change per sentence at most."

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-05-20",
    contents: wikipediaSummary,
    config: {
        systemInstruction: instructions
    }
  });
  console.log(response.text);
}

main();