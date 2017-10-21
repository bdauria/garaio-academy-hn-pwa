const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const PwaManifestPlugin = require('webpack-pwa-manifest');

module.exports = [
  {
    name: 'client',
    entry: ['./src/index.js'],
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js'
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        )
      }),
      new MinifyPlugin(),
      // new HtmlWebpackPlugin({
      //   inject: false,
      //   template: require('html-webpack-template'),
      //   meta: [
      //     {
      //       name: 'viewport',
      //       content: 'width=device-width, initial-scale=1.0, user-scalable=no'
      //     }
      //   ]
      // }),
      new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 200000,
        maxSize: 300000
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'init',
        minChunks: Infinity
      }),
      new WorkboxPlugin({
        globDirectory: 'dist',
        globPatterns: ['**/*.{html,js,css}'],
        globIgnores: ['**/service-worker.js'],
        swSrc: path.join('src', 'service-worker.js'),
        swDest: path.join('dist', 'service-worker.js')
      }),
      new PwaManifestPlugin({
        filename: 'manifest.json',
        fingerprints: false,
        inject: false,
        theme_color: '#4CAF50',
        name: 'GARAIO Hacker News Client',
        short_name: 'GARAIO-HN',
        description:
          'An experimental implementation of the Hacker News Client for the Academy 2017',
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/GHN.png'),
            sizes: [96, 128, 192, 256, 512]
          }
        ]
      })
    ],
    recordsOutputPath: path.join(__dirname, 'dist', 'records.json'),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true
    }
  },
  {
    name: 'server',
    entry: './src/functions.js',
    target: 'node',
    output: {
      library: '',
      libraryTarget: 'commonjs',
      path: path.join(__dirname, 'functions'),
      publicPath: '/',
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
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
    externals: [require('webpack-node-externals')()]
  }
];
