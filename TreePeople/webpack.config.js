'use strict';

const webpack = require('webpack');
const path = require('path');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    DEBUG: true,
    WEBGL_RENDERER: true,
    CANVAS_RENDERER: true
});

module.exports = {

    entry: './src/app.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
          {
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
          }
        ]
    },

    watch: true,
    plugins: [
        definePlugin
    ]

};