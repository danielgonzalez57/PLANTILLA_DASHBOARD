/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off'
  }
}

