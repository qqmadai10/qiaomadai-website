import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '👋 你好！我是麻袋的 AI 分身。我可以回答关于我的教育背景、项目经历、或者兴趣爱好的任何问题。试着问问我吧！',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const historyForAI = updatedMessages
        .filter(msg => msg.role !== 'model' || msg.id !== 'welcome') // 过滤掉欢迎消息
        .map(m => ({
          role: m.role as 'user' | 'model', // 保持与 aiService 一致的角色类型
          text: m.text
        }));

      const responseText = await sendMessageToAI(userText, historyForAI);

      const newModelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newModelMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "抱歉，我暂时无法回应。请检查网络连接或稍后重试。",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 自动调整输入框高度
  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: '👋 你好！我是麻袋的 AI 分身。我可以回答关于我的教育背景、项目经历、或者兴趣爱好的任何问题。试着问问我吧！',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto flex flex-col">
      <div className="text-center mb-8 animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-pixel">
          <span className="text-blue-500 mr-2">AI</span>聊天助手
        </h1>
        <div className="h-2 w-20 bg-slate-900 mx-auto border-2 border-white shadow-retro"></div>
        <p className="mt-4 text-slate-500 font-mono">智谱AI GLM-4 驱动</p>
      </div>

      {/* Retro Window Container */}
      <div className="flex-1 bg-[#c0c0c0] p-1 border-2 border-white shadow-retro outline outline-2 outline-slate-900 flex flex-col overflow-hidden h-[600px]">

        {/* Window Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex justify-between items-center mb-1">
          <span className="text-white font-bold font-pixel text-xs flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full"></div>
            Madai_AI_Assistant.exe
          </span>
          <div className="flex gap-1">
            <button
              onClick={clearChat}
              className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm hover:bg-yellow-400"
              title="清空对话"
            >
              C
            </button>
            <button className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm">_</button>
            <button className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm">×</button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white border-2 border-slate-600 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 flex-shrink-0 border-2 border-slate-900 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary-200' : 'bg-y2k-cyan'}`}>
                <span className="font-pixel text-lg">{msg.role === 'user' ? '你' : 'AI'}</span>
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] px-4 py-3 border-2 border-slate-900 shadow-retro ${
                  msg.role === 'user'
                    ? 'bg-primary-100 text-slate-900'
                    : 'bg-[#f0f0f0] text-slate-900'
                }`}
              >
                <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{msg.text}</div>
                <div className="text-[9px] mt-2 text-right opacity-50 font-pixel">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 flex-shrink-0 border-2 border-slate-900 bg-y2k-cyan flex items-center justify-center">
                <span className="font-pixel text-lg">AI</span>
              </div>
              <div className="px-4 py-3 border-2 border-slate-900 bg-[#f0f0f0] shadow-retro flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-2 bg-[#c0c0c0] mt-1">
          <div className="flex items-stretch gap-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={adjustTextareaHeight}
                onKeyDown={handleKeyDown}
                placeholder="输入你的消息..."
                className="w-full min-h-[44px] max-h-[120px] pl-3 pr-3 py-2 bg-white border-2 border-slate-600 focus:outline-none focus:border-primary-600 resize-none font-mono text-sm"
                rows={1}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`px-4 py-2 font-pixel text-xs border-2 border-white shadow-[2px_2px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all ${
                isLoading || !input.trim()
                  ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-900 text-y2k-lime hover:bg-slate-800'
              }`}
            >
              {isLoading ? '...' : '发送'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;