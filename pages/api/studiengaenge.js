// 🔌 pages/api/studiengaenge.js
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { university, level } = req.body;

  if (!university || !level) {
    return res.status(400).json({ error: "Missing university or level" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Du bist ein hilfreicher Assistent, der Studienprogramme recherchiert."
        },
        {
          role: "user",
          content: `Liste mir die aktuellen ${level}-Studiengänge an der Universität ${university} auf.`
        }
      ]
    });

    const text = response.choices[0]?.message?.content || "";
    const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
    const programs = lines.map(line => line.replace(/^[-*\d.\s]*/, ""));

    res.status(200).json({ programs });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Fehler bei der Anfrage an OpenAI" });
  }
}
