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
            path: 'dist/promise-polyfill-plus.umd.auto.js',
            label: 'umd.auto.js'
          },
          {
            path: 'dist/promise-polyfill-plus.umd.auto.min.js',
            label: 'umd.auto.min.js'
          }
        ]
      }
    ]
  ]
}
