let webpack = require('webpack');

let config = {

	entry: './src/app.js',

	output: {
		filename: './dist/bundle.js'
	},

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ],

    node: {
        fs: "empty"
    },

	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader'}
		]
	}

};

module.exports = config;