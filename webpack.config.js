const webpack = require("webpack");
const path = require("path");

module.exports = {
	mode: 'development',
	entry: {
		main: [path.resolve(`${__dirname}/_src/assets/js/main.js`)],
		top: [path.resolve(`${__dirname}/_src/assets/js/top.js`)],
		under: [path.resolve(`${__dirname}/_src/assets/js/under.js`)],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(`${__dirname}/_dist/assets/js/`)
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})
	],
};
