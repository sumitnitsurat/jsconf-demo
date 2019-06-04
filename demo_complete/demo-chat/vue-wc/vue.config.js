const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          context: 'node_modules/@webcomponents/webcomponentsjs',
          from: '**/*.js',
          to: 'webcomponents'
        }
      ])
    ]
  }
};