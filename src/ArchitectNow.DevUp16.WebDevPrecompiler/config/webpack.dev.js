var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var WriteFilePlugin = require('write-file-webpack-plugin');

const ENV = process.env.NODE_ENV;

var plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
];

// TODO: find a way to set development variable
plugins.push(new OpenBrowserPlugin({url: 'http://localhost:3001/'}));

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',
  context: helpers.src(),
	output: {
		path: helpers.build(),
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	plugins: plugins,
	devServer: {
    host: '0.0.0.0',
    port: 3001,
    proxy: {
      "/api/*": {
        "target": {
          "host": "localhost",
          "protocol": 'http:',
          "port": 17797
        },
        changeOrigin: true,
        secure: false
      },
			"/swagger/*": {
				"target": {
					"host": "localhost",
					"protocol": 'http:',
					"port": 17797
				},
				changeOrigin: true,
				secure: false
			}
    },
    // required for html5 router
    historyApiFallback: true,
    outputPath: helpers.build(),
		stats: 'minimal'
	}
});
