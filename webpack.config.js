const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');

module.exports = {
  target: 'web',
  // 入口
  entry: './src/index.ts',
  // 模式 development
  mode: 'development',
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash].js',
  },
  // loader
  /**
   * loader專注在處理個別檔案
   * Webpack 本身只能處理 JavaScript 模組，
   * 如果要處理其他類型的文件，就需要使用相關的 Loader 進行轉換
   * @see https://dev.to/kamesh_dev/webpack-loader-vs-plugin-1l20
   */
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          /**
           * 將 CSS 給單獨抽離出來
           */
          MiniCssExtractPlugin.loader,
          /**
           * css-loader 只是單純將 entry 內相關的 CSS 檔案抽取出來做轉換
           * css-loader 会对 @import 和 url() 进行处理
           */
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ],
      },
      {
        test: /\.gif/,
        type: 'asset/resource'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // 插件
  /**
   * Plugin專注在打包最後階段的任務
   * @see https://dev.to/kamesh_dev/webpack-loader-vs-plugin-1l20
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.[hash].css'
    }),
    /**
     * 可搭配gzip、Brotli
     */
    new CompressionPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  /**
   * false: console 的指向為打包後的代碼
   * eval: console 的指向為生成後的代碼
   * cheap-eval-source-map: console 的指向為轉換過的代碼，你可以把它想像成已經被 babel-loader 與 corejs 處理過後的代碼，但裡面 import 的模組還尚未被解析
   * 
   * 開發推薦使用
   * cheap-module-eval-source-map: console 的指向為原始源代碼。非常適合我們在 development 環境使用，兼具速度與其指向正確性
   * eval-source-map: 類型與 cheap-module-eval-source-map 大同小異，差別在於 eval-source-map 連同列也幫我們做了指向
   * 
   * 正式推薦使用
   * cheap-module-source-map
   * source-map
   * hidden-source-map
   * @see https://awdr74100.github.io/2020-04-02-webpack-devtool/
   */
  devtool: 'inline-source-map',
}