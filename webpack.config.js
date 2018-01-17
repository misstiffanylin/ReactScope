const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/chrome-ext/frontend/app.jsx'),
  output: {
    path: path.join(__dirname, '/chrome-ext/build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
};
