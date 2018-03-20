const path = require("path")
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: './src/index.jsx',
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
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, './src')],
        extensions: ['.js', '.jsx']
    },

    devtool: 'source-map',

    externals: _externals()
}

function _externals() {
    const exs = [
        'react',
        'react-dom',
        'prop-types',
        'classnames',
        'draft-js',
        'draft-convert',
        'draft-js-export-html',
        'noty',
        'draft-js-plugins-editor',
        'draft-js-focus-plugin'
    ]

    const result = {}
    exs.forEach(ex => {
        result[ex] = {
            'commonjs': ex,
            'commonjs2': ex
        }
    })

    return result
}
