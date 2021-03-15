const path = require("path");
const ExtractTextPlugin = "extract-text-webpack-plugin";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    filename: "js/[name].[fullhash:8].js",
    chunkFilename: "js/[name].[fullhash:8].chunk.js",
    // publicPath: path.resolve(__dirname, '../dist'),
    path: path.resolve(__dirname, "../dist")
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      },
      minSize: 1000
    }
    // minimizer: [new OptimizeCssAssetsPlugin({})]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]_[fullhash:8].css",
      chunkFilename: "css/[id].[fullhash:8].css"
    }),
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              jsx: true
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: "css-loader",
            options: {
              // modules: true,
              importLoaders: 1
              // localIdentName: '[name]',
            }
          },
          "postcss-loader",
          "resolve-url-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: "css-loader",
            options: {
              // modules: true,
              importLoaders: 3
              // localIdentName: '[name]'
            }
          },
          "postcss-loader",
          "resolve-url-loader",
          "less-loader"
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]"
        }
      },
      // {
      //   loader: "file-loader",
      //   exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
      //   options: {
      //     name: "[name].[hash:8].[ext]"
      //   }
      // }
    ]
  }
};
