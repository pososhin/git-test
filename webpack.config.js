//npm i -g http-server
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

const PROJECT_DIR = 'ts/'
// const PROJECT_DIR = '';

// const MODE = 'production'
// const MODE = 'development'

const devServer = (isDev) => {
  return {}
  // devServer: {
  //   open:true,
  //   hot: true,
  //   static: {
  //     directory: path.join(__dirname, 'atr-quiz'),
  //   },
  //   compress: true,
  //   port: 3000,
  // },
}

const esLintPlugin = (isDev) =>
  isDev ? [] : [new ESLintWebpackPlugin({ extensions: ['ts', 'js'] })]

module.exports = ({ dev }) => ({
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'inline-source-map' : false,
  entry: {
    app: './' + PROJECT_DIR + 'src/js/app.ts',
  },
  output: {
    path: path.resolve(__dirname, PROJECT_DIR + 'dist'),
    publicPath: './',
    filename: 'index.js',
    library: 'someName',
    libraryTarget: 'umd',
    globalObject: 'this',
    assetModuleFilename: 'assets/[name][hash][ext]',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, PROJECT_DIR + 'src/app.html'),
      filename: path.resolve(__dirname, PROJECT_DIR + 'dist/index.html'),
      favicon: path.resolve(__dirname, PROJECT_DIR + 'src/favicon.png'),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, 'art-quiz/assets'), to: path.resolve(__dirname, 'art-quiz/assets') },
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
    }),
    ...esLintPlugin(dev),
  ],
  module: {
    rules: [
      { test: /\.[tj]s$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: { resources: `./${PROJECT_DIR}src/css/var.scss` },
          },
        ],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg)$/i, type: 'asset/inline' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  ...devServer(dev),
})
