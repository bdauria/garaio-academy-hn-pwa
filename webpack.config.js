const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/global.css'
      }
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['global.css'],
      append: false
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, user-scalable=no'
        }
      ]
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true
  }
};
