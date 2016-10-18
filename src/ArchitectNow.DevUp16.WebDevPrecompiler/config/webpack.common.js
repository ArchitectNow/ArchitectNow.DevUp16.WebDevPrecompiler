var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var extractCSS = new ExtractTextPlugin('css/main.scss');
module.exports = {
	entry: {
		'css/main': helpers.src('scss', 'bootstrap.scss'),
		'scripts/vendor': helpers.src('app', 'vendor.ts'),
		'scripts/bootstrap': helpers.src('app', 'bootstrap.ts'),
		'scripts/polyfills': helpers.src('app', 'polyfills.ts')
  },
	
	resolve: {
		extensions: ['', '.ts', '.js']
	},

	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader'
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
          helpers.src('app')
        ],
				loader: 'raw-loader!sass-loader'
			},
      {
        // application wide styles
        test: /\.scss$/,
        include: [
          helpers.src('scss')
        ],
        loader: extractCSS.extract(['raw-loader', 'sass-loader'])
      }
		]
	},

	plugins: [
    extractCSS,
		new webpack.optimize.CommonsChunkPlugin({
			name: [
				'scripts/vendor',
				'scripts/polyfills'
			]
		}),
		new HtmlWebpackPlugin({
			template: helpers.src('index.html')
		})
	]
};
