import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress/flat';
import semistandard from 'semistandard';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,js,mts,mjs,tsx,vue}'],
    rules: {
      ...semistandard.rules,
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'array-bracket-spacing': 'off',
      'array-callback-return': 'off',
      'import/no-named-as-default-member': 'off',
      'lines-between-class-members': 'off',
      'multiline-ternary': 'off',
      'n/no-deprecated-api': 'off',
      'n/no-path-concat': 'off',
      'no-async-promise-executor': 'off',
      'no-case-declarations': 'off',
      'no-empty': 'off',
      'no-import-assign': 'off',
      'no-prototype-builtins': 'off',
      'no-useless-catch': 'off',
      'no-void': 'off',
      'object-curly-newline': 'off',
      'prefer-regex-literals': 'off',
      'quote-props': 'off',
      'quotes': ['error', 'single'],
      'vue/no-deprecated-dollar-listeners-api': 'off',
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'functions': 'never',
      }],
      'object-curly-spacing': ['error', 'always'],
      'semi': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2],
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'keyword-spacing': ['error', {
        'before': true,
        'after': true,
      }],
      'space-before-function-paren': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
];
