// import { defineConfig, globalIgnores } from 'eslint/config'
// import globals from 'globals'
// import js from '@eslint/js'
// import pluginVue from 'eslint-plugin-vue'
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// export default defineConfig([
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{js,mjs,jsx,vue}'],
//   },

//   globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//       },
//     },
//   },

//   js.configs.recommended,
//   ...pluginVue.configs['flat/essential'],
//   skipFormatting,
// ])

import js from '@eslint/js'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'],
    plugins: { js, prettier: prettierPlugin },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    extends: ['js/recommended'],
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.{html,css,json,md}'],
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
    },
  },
])
