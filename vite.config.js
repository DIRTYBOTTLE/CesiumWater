import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    cesium(),
    Components({resolvers: [AntDesignVueResolver()]})
  ],
  server: {
    port: '8000',
    proxy: {
      '/geoserver': 'http://localhost:80/geoserver',
      '/api': {
        target: 'http://localhost:80/', // 凡是遇到 /api 路径的请求，都映射到 target 属性
        changeOrigin: true,
      }
    }
  }
});

// const path = require('path')
//
// module.exports = {
//   alias: {
//     '/@/': path.resolve(__dirname, './src')
//   },
//   hostname: '0.0.0.0', // 默认是 localhost
//   port: '8000', // 默认是 3000 端口
//   open: true, // 浏览器自动打开
//   https: false, // 是否开启 https
//   ssr: false, // 服务端渲染
//   base: './', // 生产环境下的公共路径
//   outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
//   proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
//     '/api': {
//       target: 'http://127.0.0.1:7001', // 后端服务实际地址
//       changeOrigin: true,
//       rewrite: path => path.replace(/^\/api/, '')
//     }
//   }
// }
// server: {
//   cors: true, // 默认启用并允许任何源
//       open: false, // 在服务器启动时自动在浏览器中打开应用程序
//       //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
//       proxy: {
//     '/api': {
//       target: 'http://localhost:9000',   //代理接口
//           changeOrigin: true
//       rewrite: (path) => path // .replace(/^\/api/, '')
//     }
//   }
// }
