require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const prompt = `請使用繁體中文回覆：${userMessage}`; //全部繁體
    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const aiReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "抱歉，無法取得回覆";

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || "伺服器錯誤，請稍後再試",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
