import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/yanxi': {
        target: 'http://3eef688c.r28.cpolar.top/',  // 要代理的目标地址
        changeOrigin: true,
         rewrite: (path) => path.replace(/^\/yanxi/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    },

  },
  build: {
    rollupOptions: {
      output: {
        // 确保 WASM 文件可以正确加载
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'ffmpeg-core.wasm') {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash].[extname]';
        }
      }
    },
    commonjsOptions: {
      esmExternals: true 
   },
  }
})
