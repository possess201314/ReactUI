
// const webpack = require("webpack");
const path = require("path");
// const MiniCssExtractPlugin = require('../node_modules/mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './src/out/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'le_react_components.min.js',
        library: 'le_react_components',
        libraryTarget: 'umd'
    },
    devtool: 'none'
}