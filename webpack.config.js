const path = require("path")
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

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
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },

                    {
                        loader: require.resolve('less-loader')
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',

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
