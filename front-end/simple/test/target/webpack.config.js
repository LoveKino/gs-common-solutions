'use strict';

const webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/assets',
        filename: 'app.js',
        publicPath: 'js'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'babel-preset-env'],
                    plugins: ['wildcard']
                }
            }
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
