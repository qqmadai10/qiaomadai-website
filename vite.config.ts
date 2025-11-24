import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 在构建时通过环境变量获取API Key
  const apiKey = process.env.ZHIPUAI_API_KEY;

  return {
    plugins: [react()],
    base: '/qiaomadai-website/',
    build: {
      outDir: 'dist',
    },
    define: {
      'process.env.ZHIPUAI_API_KEY': JSON.stringify(apiKey),
    },
  };
});