import axios from "axios";

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post("http://localhost:5000/api/chat", {
      message,
    });
    return response.data.reply;
  } catch (error) {
    console.error("API Network Error:", error.message);
    throw new Error("無法連線後端服務，請確認伺服器是否啟動並開放 CORS。");
  }
};
