const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
          },
          {
            test: /\.(css|less)$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          {
            test: /\.svg$/,
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/[name].[hash:4].[ext]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.js', '.jsx']
  }
}
