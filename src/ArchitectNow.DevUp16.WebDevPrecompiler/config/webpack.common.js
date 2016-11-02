var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Helpers = require('./helpers');
var ExtractCss = new ExtractTextPlugin('css/main.css');
/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const forkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
// const HtmlElementsPlugin = require('./html-elements-plugin');

/*
 * Webpack Constants
 */
const metadata = {
	baseUrl: '/',
	isDevServer: Helpers.isWebpackDevServer()
};

module.exports = {
	/*
	 * Static metadata for index.html
	 *
	 * See: (custom attribute)
	 */
	metadata: metadata,
	// context: helpers.src(),
	/*
	 * The entry point for the bundle
	 * Our Angular.js app
	 *
	 * See: http://webpack.github.io/docs/configuration.html#entry
	 */
	entry: {
		'scripts/vendor': Helpers.src('app', 'vendor.ts'),
		'scripts/app': Helpers.src('app', 'bootstrap.ts'),
		'scripts/polyfills': Helpers.src('app', 'polyfills.ts')
	},

	/*
	 * Options affecting the resolving of modules.
	 *
	 * See: http://webpack.github.io/docs/configuration.html#resolve
	 */
	resolve: {
		/*
		 * An array of extensions that should be used to resolve modules.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
		 */
		extensions: ['', '.ts', '.js'],
		// Make sure root is src
		// root: helpers.src(),
		// remove other default values
		modulesDirectories: ['node_modules'],

	},

	module: {
		/*
		 * An array of automatically applied loaders.
		 *
		 * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
		 * This means they are not resolved relative to the configuration file.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#module-loaders
		 */
		loaders: [
			/*
			 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
			 * Replace templateUrl and stylesUrl with require()
			 *
			 * See: https://github.com/s-panferov/awesome-typescript-loader
			 * See: https://github.com/TheLarkInn/angular2-template-loader
			 */
			{
				test: /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-router-loader'
				],
				exclude: [/\.(spec|e2e)\.ts$/]
			},
			/*
			 * Json loader support for *.json files.
			 *
			 * See: https://github.com/webpack/json-loader
			 */
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file?name=assets/[name].[hash].[ext]'
			},
			{
				test: /\.scss$/,
				include: [
					Helpers.src('app')
				],
				loader: 'raw-loader!sass-loader'
			},
			{
				// application wide styles
				test: /\.scss$/,
				include: [
					Helpers.src('scss'),
				],
				loader: ExtractCss.extract(['raw-loader', 'sass-loader'])
			}
		]
	},
	postcss : function () {
		return [require('autoprefixer')];
	},
	plugins: [
		new Webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			Helpers.src()
		),
		/*
		 * Plugin: ForkCheckerPlugin
		 * Description: Do type checking in a separate process, so webpack don't need to wait.
		 *
		 * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
		 */
		// new ForkCheckerPlugin(),
		ExtractCss,
		/*
		 * Plugin: CommonsChunkPlugin
		 * Description: Shares common code between the pages.
		 * It identifies common modules and put them into a commons chunk.
		 *
		 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
		 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
		 */
		new Webpack.optimize.CommonsChunkPlugin({
			name: [
				'scripts/vendor',
				'scripts/polyfills'
			]
		}),
		new copyWebpackPlugin([ { from: Helpers.src('images'), to: 'images' } ]),
		new copyWebpackPlugin([ { from: Helpers.src('fonts'), to: 'fonts' } ]),
		new htmlWebpackPlugin({
			template: Helpers.src('index.html')
		})
	],

	/*
	 * Include polyfills or mocks for various node stuff
	 * Description: Node configuration
	 *
	 * See: https://webpack.github.io/docs/configuration.html#node
	 */
	node: {
		global: 'window',
		crypto: 'empty',
		process: true,
		module: false,
		clearImmediate: false,
		setImmediate: false
	}
};
