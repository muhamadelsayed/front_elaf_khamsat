import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // أي طلب يبدأ بـ /api سيتم توجيهه إلى الخادم الخلفي
      '/api': {
        target: 'http://localhost:5000', // عنوان الخادم الخلفي
        changeOrigin: true,
      },
    },
  },
})