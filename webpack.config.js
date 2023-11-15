const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		popup: './src/popup.js',
		index: './src/index.js',
		background: './src/background.js',
		createGallery: './src/createGallery.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$|jsx/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-react', {"runtime": "automatic"}]
						]
					}
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
				exclude: /node_modules/,
			},
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{from: './src/manifest.json', to: 'manifest.json'}
			]
		}),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: './public/popup.html',
			filename: 'popup.html',
			chunks: ['popup'],
			cache: false,
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			chunks: ['index'],
			cache: false,
		}),
	],
};
