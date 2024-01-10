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

module.exports = (env, argv) => {
	config.output = {
		path: path.resolve(__dirname, 'dist', env.browser),
		filename: '[name].bundle.js',
	}
	// until chrome 121 rolls out, separate manifest file is neccesary to avoid Chrome refusing to load manifest with background.scripts
	if (env.browser === 'firefox') {
		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: './src/manifest.json',
						to: path.join(__dirname, 'dist', env.browser, 'manifest.json')
					},
				]
			})
		)
	} else if (env.browser === 'chrome') {
		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: './src/manifest-chrome.json',
						to: path.join(__dirname, 'dist', env.browser, 'manifest.json')
					},
				]
			})
		)
	}
	// compile mode config
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
	} else if (argv.mode === 'production') {
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
