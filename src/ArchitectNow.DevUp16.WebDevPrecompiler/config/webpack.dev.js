const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const openBrowserPlugin = require('open-browser-webpack-plugin');

/**
 * Webpack Plugins
 */
const definePlugin = require('webpack/lib/DefinePlugin');
const namedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

/**
 * Webpack Constants
 */
const env = process.env.ENV = process.env.NODE_ENV = 'development';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;
const proxyPort = process.env.PROXY_PORT || 17797; // backend port
const metadata = webpackMerge(commonConfig.metadata, {
	host: host,
	port: port,
	proxyPort:proxyPort,
	ENV: env
});


/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {
	/**
	 * Merged metadata from webpack.common.js for index.html
	 *
	 * See: (custom attribute)
	 */
	metadata: metadata,

	/**
	 * Switch loaders to debug mode.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#debug
	 */
	debug: true,

	/**
	 * Developer tool to enhance debugging
	 *
	 * See: http://webpack.github.io/docs/configuration.html#devtool
	 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
	 */
	devtool: 'cheap-module-source-map',

	/**
	 * Options affecting the output of the compilation.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#output
	 */

	output: {
		/**
		 * The output directory as absolute path (required).
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-path
		 */
		path: helpers.build(),
		publicPath: '/',
		/**
		 * Specifies the name of each output file on disk.
		 * IMPORTANT: You must not specify an absolute path here!
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-filename
		 */
		filename: '[name].bundle.js',

		/**
		 * The filename of the SourceMaps for the JavaScript files.
		 * They are inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		 */
		sourceMapFilename: '[name].map',

		/**
		 * The filename of non-entry chunks as relative path
		 * inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
		 */
		chunkFilename: '[id].chunk.js',
	},
	plugins: [
		/**
		 * Plugin: DefinePlugin
		 * Description: Define free variables.
		 * Useful for having development builds with debug logging or adding global constants.
		 *
		 * Environment helpers
		 *
		 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
		 */
		// NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
		new definePlugin({
			'ENV': JSON.stringify(metadata.ENV),
			'process.env': {
				'ENV': JSON.stringify(metadata.ENV),
				'NODE_ENV': JSON.stringify(metadata.ENV)
			}
		}),

		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery'
		}),
		new openBrowserPlugin({url: 'http://localhost:' + port})
	],
	devServer: {
		host: '0.0.0.0',
		port: port,
		outputPath: helpers.build(),
		stats: 'minimal',
		// required for html5 router
		historyApiFallback: true,
		proxy: {
			"/api/*": {
				"target": {
					"host": "localhost",
					"protocol": 'http:',
					"port": proxyPort
				},
				changeOrigin: true,
				secure: false
			},
			"/swagger/*": {
				"target": {
					"host": "localhost",
					"protocol": 'http:',
					"port": proxyPort
				},
				changeOrigin: true,
				secure: false
			}
		}
	}
});
