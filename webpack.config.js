const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
		filename: '[name].bundle.js',
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
			},
			{
				test: /\.(sass|scss|css)$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: './src/manifest.json',
					to: path.join(__dirname, 'dist')
				},
				{
					from: './src/assets/styles/index.css',
					to: path.join(__dirname, 'dist')
				},
				{
					from: './src/assets/styles/popup.css',
					to: path.join(__dirname, 'dist')
				},
			]
		}),
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
