
import { Profile } from './types';

export const PROFILE_DATA: Profile = {
  name: "麻袋",
  title: "产品打怪日记",
  bio: "热爱产品的终身学习者 | 过去与未来同时存在",
  birthdate: "秋天出生哒，是一个收获的季节！",
  photoUrl: "https://files.imagetourl.net/uploads/1763546977379-8f07131a-2c1a-4f09-b239-2b8616732913.JPG",
  contact: {
    email: "lanyingqiao@link.cuhk.edu.cn",
    github: "https://github.com/qiaomadai"
  },
  education: [
    {
      period: "2025.9 - 2027.11",
      school: "香港中文大学（深圳）",
      college: "数据科学学院",
      degree: "硕士",
      details: "主修课程：机器学习、最优化、随机过程、投资科学、金融数据分析、信用模型与产品、算法交易等"
    },
    {
      period: "2021.9 - 2025.6",
      school: "华中科技大学",
      college: "管理学院",
      degree: "本科",
      details: "主修课程：财务管理、SQL、风险管理、管理经济学、Python、数学建模"
    }
  ],
  projects: [
    {
      id: 1,
      company: "百度——度小满",
      role: "AI产品（客服语音产品方向）",
      period: "2024年09月 - 2024年11月",
      description: "聚焦AI贷后催收场景，设计“语音输入—ASR—NLP(意图识别、策略回复）—TTS”端到端流程，覆盖转写准确度、语音模型MOS打分、用户满意度等多个AI宏微观考评维度。",
      achievements: [
        "宏观业务指标：北极星指标电话后还款转化率达47%",
        "微观技术指标：TTS的CER错误率降低9%，NLP环节平均响应速度提升0.7s，承诺的召回率提升7%，模型调用成本降低13%，TTS环节MOS平均提升0.87"
      ]
    },
    {
      id: 2,
      company: "招商证券",
      role: "宏观总量研究组实习生",
      period: "2024年07月 - 2024年10月",
      description: "用logistic回归模型评估关键经济数据意外对美股市场的短期影响，量化评估不同经济数据“意外”对市场影响的相对重要性。",
      achievements: [
        "输出“非农数据意外为短期市场最主要驱动因素”的量化结论，样本外预测准确率为60%-70%之间。",
        "结论被团队采纳，成为数据发布日进行快速市场影响评估的常规参考依据之一。"
      ]
    }
  ],
  hobbies: [
    {
      id: 1,
      name: "运动与活力",
      details: "每周3-4次50分钟高强度有氧（跑步机爬坡），无氧偶尔会做一下。运动带来的多巴胺让思维保持清晰。",
      images: [
        "https://files.imagetourl.net/uploads/1763811862861-d454af24-8716-4d6e-99b8-e18993b56fc9.JPG",
        "https://files.imagetourl.net/uploads/1763811949135-007e7f5e-cb55-46f9-bf8f-3157c8ac8319.jpg",
        "https://files.imagetourl.net/uploads/1763811967629-a85b7def-5fb3-436b-b991-d9dbe8d48043.jpg"
      ]
    },
    {
      id: 2,
      name: "声音艺术 (配音 & 唱歌)",
      details: "用声音演绎需要思想解读的故事，那些远方传来的音频，告诉我们他们也在。唱歌则是给我一个独自发疯的机会。",
      images: [
        "https://files.imagetourl.net/uploads/1763811783071-96734563-860e-4c64-b409-f87795eb50a2.jpg",
        "https://files.imagetourl.net/uploads/1763811810070-c3f7a238-f72e-41c3-97ed-c4d7352f93f9.jpg"
      ]
    },
    {
      id: 3,
      name: "历史与阅读",
      details: "最喜欢的历史人物是谢道韫，最爱磕的历史CP是“婉平之交”和“诸葛亮司马懿”。阅读历史让我理解时代脉络。",
      images: [
        "https://files.imagetourl.net/uploads/1763811650595-993705d0-5c3d-4666-bdca-91e6b890a061.jpg",
        "https://files.imagetourl.net/uploads/1763811732410-9d608756-ddb5-40fd-80c6-2f52b9bde0d2.jpg",
        "https://files.imagetourl.net/uploads/1763811761156-f58cec06-20df-4329-ae25-c37009a899b1.jpg"
      ]
    }
  ]
};