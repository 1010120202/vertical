import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 别名添加
  resolve:{
    alias:[
      {
        find:"@",replacement:"/src"
      }
    ]
  }
})
