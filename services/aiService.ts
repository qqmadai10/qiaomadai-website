import { PROFILE_DATA } from "../constants";

const SYSTEM_INSTRUCTION = `
你正在扮演"麻袋的智能助手"。你代表麻袋（Madai），一名产品经理。
请基于以下信息回答问题：
姓名：${PROFILE_DATA.name}
个人简介：${PROFILE_DATA.bio}
教育背景：${JSON.stringify(PROFILE_DATA.education)}
项目经验：${JSON.stringify(PROFILE_DATA.projects)}
兴趣爱好：${JSON.stringify(PROFILE_DATA.hobbies)}
联系方式：${JSON.stringify(PROFILE_DATA.contact)}

风格：友好、机智、充满活力。
规则：不要讨论深入的金融工程/交易话题。
`;

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

export const sendMessageToAI = async (userMessage: string, history: ChatHistoryItem[]): Promise<string> => {
  // 从环境变量获取 API Key
  const apiKey = process.env.ZHIPUAI_API_KEY;
  if (!apiKey) return "⚠️ 系统提示：API Key 未配置。";

  try {
    // 2. 构建消息列表，将系统指令作为第一条系统消息
    const messages = [
      {
        role: "system" as const,
        content: SYSTEM_INSTRUCTION
      },
      // 添加历史对话记录
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      })),
      // 添加当前用户消息
      {
        role: "user" as const,
        content: userMessage
      }
    ];

    // 3. 发送请求到智谱AI API
    const response = await fetch(
      "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "glm-4", // 使用 GLM-4 模型
          messages: messages,
          max_tokens: 512, // 增加最大token数以获得更完整的回复
          temperature: 0.8,
          stream: false // 非流式响应
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("智谱AI API 错误:", errorData);
      throw new Error(`API 请求失败: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    return text || "抱歉，我暂时无法回答这个问题。";

  } catch (error) {
    console.error("AI 服务错误:", error);
    return "思维连接中断了，请检查网络连接或 API Key 配置。";
  }
};