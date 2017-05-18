var config = {

	entry: './src/components/app.js',

	output: {
		filename: './bundle.js'
	},

	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader'}
		]
	}

}

module.exports = config;