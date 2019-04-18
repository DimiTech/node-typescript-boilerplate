const path = require('path')

module.exports = {
  target: 'node',
  entry: './src/main.ts',
  devtool: 'source-map',
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
    extensions: [ '.ts', '.js' ],
    alias: {
      '@app': path.resolve(__dirname, 'src', 'app'),
      '@infrastructure': path.resolve(__dirname, 'src', 'infrastructure'),
    }
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  }
}

