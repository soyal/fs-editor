const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'fs-editor.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    library: 'fs-editor',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'assets/[name].[hash:4].[ext]'
            }
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
          },
          {
            test: /\.(css|less)$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
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
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              },

              {
                loader: require.resolve('less-loader')
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'assets/[name].[hash:4].[ext]'
            }
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
    'decorate-component-with-props',
    'draft-convert',
    'draft-js',
    'draft-js-export-html',
    'draft-js-plugins-editor',
    'draft-js-focus-plugin',
    'draft-js-image-plugin',
    'draftjs-utils',
    'linkify-it',
    'tlds',
    'noty'
  ]

  const result = {}
  exs.forEach(ex => {
    result[ex] = {
      commonjs: ex,
      commonjs2: ex
    }
  })

  return result
}
