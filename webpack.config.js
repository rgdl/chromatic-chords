const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ['@babel/preset-env'] }
                },
            },
            {
                test: /\.less$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" },
                ],
            },
        ],
    },
};
