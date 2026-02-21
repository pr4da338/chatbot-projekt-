const express = require("express");
const cors = require("cors");
const OpenAI = require("openai").default;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "Du bist ein freundlicher Assistent für ein lokales Unternehmen. Antworte kurz und hilfreich."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("OpenAI Fehler:", error);
    res.status(500).json({ reply: "Fehler beim Server." });
  }
});