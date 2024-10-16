import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/line': {
        target: 'https://api.line.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/line/, '/v2/bot/message/push'),
        secure: false,
        headers: {
          'Authorization': `Bearer PwvFeAbjqKKlue81sEG71DwZlh8EBaULCsnC7S0V9PuczeP62SW01/OlnMLB14DcBiDiPSxvGv8XNP2aP3qYVF2RGUWLcO/yL44zKNZTzK3sS1r+C7WOyj2TLnFMjItrm9eVA51+jZ0e6SVSblCcTwdB04t89/1O/w1cDnyilFU=`,
        }
      }
    }
  }
});
