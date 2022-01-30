import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import config from "./src/utils/config";
// import ViteComponents,{AntDesignVueResolver} from "unplugin-vue-components/resolvers";
// import Components from "unplugin-vue-components/vite";
const path = require('path')


export default defineConfig({
    base: '/',
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      // Components({
      //   'resolvers':[
      //     AntDesignVueResolver()
      //   ]
      // })
    ],

    server:{
      hmr: {
        overlay: false
      },
      fs: {
        strict: false,
        allow: [],
      },
      host:'0.0.0.0',
      port:3901,
      strictPort:true,
      proxy:{
        '/api':{
          target:'http://192.168.2.4:5116',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      'process.env': process.env
    },
    css: {
      preprocessorOptions: {
        less: {
            modifyVars: {
              'primary-color': config.primaryColor||'#1890ff',
            },
            javascriptEnabled: true,
        }
      },
    },
    build:{ //生产环境移除 console
      terserOptions:{
        compress:{
          drop_console:true,
          drop_debugger:true
        }
      }
    },



})


