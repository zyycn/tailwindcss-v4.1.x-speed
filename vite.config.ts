import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, UserConfig } from 'vite'
import checker from 'vite-plugin-checker'
import viteCompression from 'vite-plugin-compression'
import viteSvgLoader from 'vite-svg-loader'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unpluginAutoImport from 'unplugin-auto-import/vite'
import unpluginVueComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import mpaConfig from './configs/mpa'

export default defineConfig((): UserConfig => {
  return {
    root: process.cwd(),
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      tailwindcss(),
      Icons(),
      viteSvgLoader({
        defaultImport: 'url',
        svgoConfig: {
          plugins: [
            { name: 'removeAttrs', params: { attrs: ['fill'] } },
            { name: 'addClassesToSVGElement', params: { classNames: ['icon-svg'] } },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attribute: { fill: 'currentColor', preserveAspectRatio: 'xMidYMid meet' }
              }
            }
          ]
        }
      }),
      unpluginAutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: ['vue', 'vue-router', 'pinia']
      }),
      unpluginVueComponents({
        dts: 'types/components.d.ts',
        resolvers: [AntDesignVueResolver({ importStyle: false }), IconsResolver({ prefix: 'icon' })]
      }),
      createMpaPlugin(mpaConfig),
      viteCompression({
        verbose: false,
        deleteOriginFile: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      checker({
        root: process.cwd(),
        terminal: false,
        vueTsc: {
          tsconfigPath: 'tsconfig.app.json'
        },
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint src'
        },
        stylelint: {
          lintCommand: 'stylelint src/**/*.{vue,css,scss}'
        }
      })
    ],
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          assetFileNames: 'static/[ext]/asset-[name]-[hash].[ext]',
          chunkFileNames: 'static/js/chunk-[name]-[hash].js',
          entryFileNames: 'static/js/entry-[name]-[hash].js'
        }
      }
    },
    esbuild: {
      pure: ['console.log', 'console.warn', 'console.error'],
      drop: ['debugger']
    }
  }
})
