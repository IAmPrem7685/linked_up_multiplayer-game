const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Your main JS file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Serve files from 'dist'
        port: 8080,
        open: true, // Automatically open the browser
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Point to your HTML file
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // If you're using Babel
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
