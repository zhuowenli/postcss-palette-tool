/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-11-05 10:12:25
 */
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './example/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js',
        },
        extensions: ['.js', '.vue', '.json'],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s(a|c)ss/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('./src'),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
};
