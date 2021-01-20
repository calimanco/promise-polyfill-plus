module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/promise-polyfill-plus.umd.js',
            label: 'JS umd'
          },
          {
            path: 'dist/promise-polyfill-plus.umd.min.js',
            label: 'JS umd min'
          }
        ]
      }
    ]
  ]
}
