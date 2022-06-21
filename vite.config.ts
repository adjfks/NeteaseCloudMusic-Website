import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [
        'vue',
        'vue-router',
      ],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],

      dirs: [
        './utils'
      ],

      dts: true
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver(),
      ]
    }),
    Icons({
      autoInstall: true,
    }),
    vueJsx(),
    Unocss({
      presets: [
        presetIcons({ /* options */ }),
        // ...other presets
        presetUno(),
        presetAttributify()
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local'
    },
    preprocessorOptions: {
      // less: {
      //   charset: false,
      //   javascriptEnabled: true,
      //   additionalData: `@import "${path.resolve(__dirname, './src/styles/variable.less')}";`,
      // },
      // less: {
      //   modifyVars: {
      //     hack: `true; @import "${path.resolve(__dirname, './src/styles/variable.less')}";`,
      //   },
      //   javascriptEnabled: true
      // }
    }
  },
  define: {
    __DEV__: true
  }
})
