const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		background: './src/background.js',
		content_script: './src/content_script.js',
		index: './src/index.js',
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
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}
		]
	},
	plugins: [
		// new CopyPlugin([{from: './public/manifest.json', to:'manifest.json'}])
	],
};
