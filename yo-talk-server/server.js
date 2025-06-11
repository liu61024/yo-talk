require("dotenv").config(); // 讀取 .env
const express = require("express"); // 建立 HTTP 伺服器
const cors = require("cors"); // 解決跨網域問題
const axios = require("axios"); // 發送 HTTP 請求

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // 允許來自不同來源的前端請求
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const prompt = `請使用繁體中文回覆：${userMessage}`; //讓 Google Gemini 回覆時強制使用繁體中文
    if (!userMessage) {
      //除錯
      return res.status(400).json({ error: "No message provided" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;
    //發送請求
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
    //取得回應再回傳
    const aiReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "抱歉，無法取得回覆";

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || "伺服器錯誤，請稍後再試",
    });
  } //處理錯誤
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); //監聽 API 啟動
