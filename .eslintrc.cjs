module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',

    // 🔥 ADD THESE TWO LINES
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',

  plugins: [
    'react-refresh',
    'prettier'
  ],

  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // Prettier formatting rules
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        semi: true
      }
    ],

    // Backup enforcement
    semi: ['error', 'always'],

    // Remove extra blank lines
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0
      }
    ]
  }
};