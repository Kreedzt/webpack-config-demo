const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    host: "0.0.0.0",
    port: 8080
  },
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    })
  ],
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
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
