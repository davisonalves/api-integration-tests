module.exports = {
  transform: {
    '.js$': 'esbuild-jest'
  },
  setupFiles: ['dotenv/config'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports',
      filename: 'report.html'
    }]
  ]
};
