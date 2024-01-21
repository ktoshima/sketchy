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

const modifyManifest = (browser, content) => {
	const manifest = JSON.parse(content.toString());
	if (browser === 'chrome') {
		// remove manifest.background.scripts from manifest.json for chrome
		// to avoid Chrome refusing to load manifest with background.scripts
		delete manifest.background.scripts;
	} else if (browser === 'firefox') {
		// remove manifest.background.service_worker from manifest.json for firefox
		// to avoid Firefox raising warning upon loading manifest with background.service_worker
		delete manifest.background.service_worker;
	}
	return JSON.stringify(manifest, null, 2);
}

module.exports = (env, argv) => {
	config.output = {
		path: path.resolve(__dirname, 'dist', env.browser),
		filename: '[name].bundle.js',
	}

	config.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: './src/manifest.json',
					to: path.join(__dirname, 'dist', env.browser, 'manifest.json'),
					transform: (content, _path) => modifyManifest(env.browser, content)
				},
			]
		})
	)
	// compile mode config
	// use inline-source-map in development mode for debug purpose
	// use MiniCssExtractPluging in production mode to separate css files for optimization
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
