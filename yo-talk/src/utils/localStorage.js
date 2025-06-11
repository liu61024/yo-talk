const STORAGE_KEY = "yoTalkConversations";

export const saveConversations = (conversations) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}; //轉成 JSON 存本地端

export const loadConversations = () => {
  const data = localStorage.getItem(STORAGE_KEY); //  localStorage讀取key存在 data
  if (!data) return {};
  const parsed = JSON.parse(data); //data用JSON.parse轉回原本的物件，存parsed
  const fixed = {}; //新建立一個空物件來放修正格式的資料

  for (const [id, value] of Object.entries(parsed)) {
    //跑每個對話跟資料。
    if (Array.isArray(value)) {
      // 舊格式value是messages陣列，補上 createdAt
      fixed[id] = {
        messages: value,
        createdAt: extractTimestampFromId(id),
      };
    } else {
      // 新格式messages+createdAt
      fixed[id] = {
        ...value, //如果value不是陣列，代表已是新版格式
        createdAt: value.createdAt || extractTimestampFromId(id),
      };
    }
  }

  return fixed; //回傳格式修正過的物件
};

const extractTimestampFromId = (id) => {
  const match = id.match(/^(\d{4})\.(\d{2})\.(\d{2})/); // 對應 YYYY.MM.DD
  if (match) {
    const [_, year, month, day] = match;
    return new Date(`${year}-${month}-${day}`).getTime();
  }
  return Date.now();
}; //從id抓出日期轉換為時間戳
