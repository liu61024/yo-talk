import axios from "axios";

const API_URL = "https://yo-talk-server.onrender.com/api/chat";

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post("API_URL", {
      //發送請求到後端
      message,
    });
    return response.data.reply; //後端回傳AI的回覆
  } catch (error) {
    console.error("API Network Error:", error.message);
    throw new Error("無法連線後端服務，請確認伺服器是否啟動並開放 CORS。");
  }
};
