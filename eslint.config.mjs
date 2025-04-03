import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public']
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  eslintPluginPrettierRecommended,

  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'prettier/prettier': 'warn',

      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-useless-escape': 'off',

      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/order': 'error'
    }
  },

  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    ignores: ['types/auto-imports.d.ts'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        __APP_INFO__: true
      }
    },
    rules: {
      'no-undef': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
)
