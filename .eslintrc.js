module.exports = {
  extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['standard-with-typescript', 'prettier/@typescript-eslint'],
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    },
    {
      files: ['*.spec.ts'],
      rules: {
        'prefer-promise-reject-errors': 'off',
        'promise/param-names': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/promise-function-async': 'off'
      }
    },
    {
      files: ['*.md'],
      plugins: ['markdown']
    }
  ]
}
