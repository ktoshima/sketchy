const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	entry: {
		popup: './src/pages/Popup/index.js',
		app: './src/pages/App/index.js',
		background: './src/background/background.js',
		contentScript: './src/contentScript/contentScript.js',
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
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
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
			]
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/Popup/index.html',
			filename: 'popup.html',
			chunks: ['popup'],
			cache: false,
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/App/index.html',
			filename: 'app.html',
			chunks: ['app'],
			cache: false,
		}),
	],
};

module.exports = (_env, argv) => {
	if (argv.mode === 'development') {
		config.devtool = 'inline-source-map';
		config.module.rules.push(
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			}
		)
	}
	if (argv.mode === 'production') {
		config.plugins.push(new MiniCssExtractPlugin());
		config.module.rules.push(
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			}
		)
	}

	return config;
}
