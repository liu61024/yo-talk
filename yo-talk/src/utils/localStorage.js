const STORAGE_KEY = "yoTalkConversations";

export const saveConversations = (conversations) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
};

export const loadConversations = () => {
  const data = localStorage.getItem(STORAGE_KEY); // ✅ 修正
  if (!data) return {};
  const parsed = JSON.parse(data);
  const fixed = {};

  for (const [id, value] of Object.entries(parsed)) {
    if (Array.isArray(value)) {
      // 舊格式：value 是 messages 陣列，補上 createdAt
      fixed[id] = {
        messages: value,
        createdAt: extractTimestampFromId(id),
      };
    } else {
      // 新格式：messages + createdAt
      fixed[id] = {
        ...value,
        createdAt: value.createdAt || extractTimestampFromId(id),
      };
    }
  }

  return fixed;
};

const extractTimestampFromId = (id) => {
  const match = id.match(/(\d+)/);
  return match ? Date.now() - parseInt(match[1]) : Date.now();
};
