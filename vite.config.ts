import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载所有环境变量
  const env = loadEnv(mode, process.cwd(), '');

  // 调试信息
  console.log('API Key in build:', env.VITE_ZHIPUAI_API_KEY ? 'Set' : 'Not set');

  return {
    plugins: [react()],
    base: '/qiaomadai-website/',
    build: {
      outDir: 'dist',
    },
    // 正确传递环境变量到客户端
    define: {
      'import.meta.env.VITE_ZHIPUAI_API_KEY': JSON.stringify(env.VITE_ZHIPUAI_API_KEY),
    },
  };
});