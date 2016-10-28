module.exports = {
  entry: {
    js: './scripts/react/app.js',
  },
  output: {
    path: `${__dirname}/out`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
