import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#4377FE',//设置antd主题色
        },
      },
    }
  },


  '/socket.io222': {
    target: 'ws://localhost:5000',
    ws: true
  }
  
})
