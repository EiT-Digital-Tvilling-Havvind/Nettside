module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'vue/no-async-in-computed-properties': 'warn',
    'vue/no-dupe-keys': 'warn',
    'vue/no-duplicate-attributes': 'warn',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'vue/no-template-key': 'warn',
    'vue/no-textarea-mustache': 'warn',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/require-prop-type-constructor': 'warn',
    'vue/require-v-for-key': 'warn',
    'vue/require-valid-default-prop': 'warn',
    'vue/use-v-on-exact': 'warn',
    'vue/valid-v-else-if': 'warn',
    'vue/valid-v-else': 'warn',
    'vue/valid-v-for': 'warn'
  }
}
