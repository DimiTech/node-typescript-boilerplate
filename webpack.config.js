const path = require('path')

module.exports = {
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts' ],
    alias: {
      '@app': path.resolve(__dirname, 'src', 'app'),
    }
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  }
}

