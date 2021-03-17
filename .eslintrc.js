module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['standard-with-typescript', 'prettier'],
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off'
      }
    },
    {
      files: ['*.spec.ts', '*.test.ts'],
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
