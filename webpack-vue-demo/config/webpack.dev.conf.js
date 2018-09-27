const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, '../src/main.js'),
  devServer: {
    // publicPath: "localhost:8080/assets/",
    port: 8080
  },
  output: {
    // publicPath: 'localhost:8080/assets/',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
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
          'vue-style-loader',
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            },
          },
          'resolve-url-loader'
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        use: [
          'vue-style-loader',
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          'resolve-url-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
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
              limit: 5
            }
          }
        ]
      }
    ]
  },
  devtool: "source-map"
};