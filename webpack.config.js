const path = require("path")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'fs-editor.js',
        publicPath: "/dist/",
        path: path.resolve(__dirname, "dist"),
        library: 'fs-editor',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    devtool: 'source-map',

    plugins: [
        new ExtractTextPlugin('fs-editor.css')
    ],

    // externals: {
    //     react: 'React'
    // }
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        },
        'draft-js': {
            root: 'Draftjs',
            commonjs: 'draft-js',
            commonjs2: 'draft-js',
            amd: 'draft-js'
        },
        'draft-convert': {
            commonjs: 'draft-convert',
            commonjs2: 'draft-convert',
            amd: 'draft-convert'
        },
        'draft-js-export-html': {
            commonjs: 'draft-js-export-html',
            commonjs2: 'draft-js-export-html',
            amd: 'draft-js-export-html'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom'
        },
        'prop-types': {
            root: 'PropTypes',
            commonjs: 'prop-types',
            commonjs2: 'prop-types',
            amd: 'prop-types'
        },
        '@fs/noty': {
            root: 'Noty',
            commonjs: '@fs/noty',
            commonjs2: '@fs/noty',
            amd: '@fs/noty'
        }
    }
}
