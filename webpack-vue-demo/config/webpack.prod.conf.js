const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, '../src/main.js'),
  //   // 对应：指定数组方式
  //   vendor: ['vue']
  // },
  output: {
    // publicPath: path.resolve(__dirname, '../dist/assets'),
    path: path.resolve(__dirname, '../dist'),
    filename: "js/[name].[fullhash:8].js",
    chunkFilename: "js/[name].[fullhash:8].chunk.js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 正则匹配方式
        // vendor: {
        //   test: /vue|angular/,
        //   chunks: "initial",
        //   name: "common-framework",
        //   enforce: true
        // }
        // 指定匹配数组方式
        // vendor: {
        //   chunks: "initial",
        //   test: "vendor",
        //   name: 'common-lib',
        //   enforce: true
        // },
        // 全部打包方式
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      },
      minSize: 1000
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]_[fullhash:8].css",
      chunkFilename: 'css/[id].[fullhash:8].css',
      minimize: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ],
  resolve: {
    // modules: [
    //   path.resolve(__dirname, 'node_modules')
    // ],
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          },
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[fullhash:base64:5]',
            }
          },
          'postcss-loader',
          'resolve-url-loader',
        ]
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        // exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        use: [
          {
            loader: 'vue-loader',
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
};
