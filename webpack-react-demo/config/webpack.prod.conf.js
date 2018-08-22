const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, '../src/main.jsx'),
  output: {
    // filename: "bundle.js",
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: "[name].[hash:8].css",
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[hash:8].css",
      chunkFilename: '[id].[hash:8].css',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        // styles: {
        //   // name: 'styles',
        //   // test: /\.css$/,
        //   // chunks: "all",
        //   // enforce: true
        // }
        commons: {
          // name: 'commons',
          // chunks: 'initial',
          // minChunks: 2
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      },
      minSize: 8000
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../'
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              // importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          },
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '../'
            // }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              // importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          },
          'resolve-url-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5
            }
          }
        ]
      }
    ],
  },
};