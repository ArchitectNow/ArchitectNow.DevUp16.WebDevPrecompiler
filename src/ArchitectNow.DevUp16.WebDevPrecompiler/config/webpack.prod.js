var Webpack = require('webpack');
var WebpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CommonConfig = require('./webpack.common.js');
var Helpers = require('./helpers');
var WriteFilePlugin = require('write-file-webpack-plugin');

const env = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = WebpackMerge(CommonConfig, {
  devtool: 'source-map',
  context: Helpers.src(),
  output: {
    path: Helpers.dist(),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new Webpack.NoErrorsPlugin(),
    new Webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new Webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(env)
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    outputPath: Helpers.dist(),
    // required for html5 router
    historyApiFallback: true,
    stats: 'minimal'
  }
});
