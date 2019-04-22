const path = require('path')

const nodeExternals = require('webpack-node-externals')

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
      '@test'           : path.resolve(__dirname, 'test'),
      '@web'            : path.resolve(__dirname, 'src', 'web'),
      '@app'            : path.resolve(__dirname, 'src', 'app'),
      '@domain'         : path.resolve(__dirname, 'src', 'domain'),
      '@infrastructure' : path.resolve(__dirname, 'src', 'infrastructure'),
    }
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [
    nodeExternals()
  ]
}

