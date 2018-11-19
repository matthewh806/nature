'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './src/app.js',

    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
          {
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
          }
        ]
    },

    plugins: [
    ]

};