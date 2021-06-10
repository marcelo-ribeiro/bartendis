const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
    "./src/styles/main.scss", "./src/scripts/index.js"
  ],
  output: {
    filename: "src.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // process.env.NODE_ENV !== "production"
          //   ? "style-loader"
          //   : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          // {
            // loader: "sass-loader",
            // options: {
            //   sourceMap: true,
            //   sassOptions: {
            //     outputStyle: "compressed"
            //   }
            // },
          // },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/index.html", to: "index.html" },
        { from: "src/assets/", to: "assets/" },
        { from: "src/favicon.png", to: "favicon.png" },
        { from: "src/humans.txt", to: "humans.txt" },
        { from: "src/robots.txt", to: "robots.txt" },
        { from: "src/service-worker.js", to: "service-worker.js" },
        { from: "src/manifest.webmanifest", to: "manifest.webmanifest" }
      ],
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "style.css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // watchContentBase: true,
    // public: 'myapp.test:80',
    index: 'index.html',
    compress: true,
    port: 8000, //process.env.PORT, // Defaults to 8080
    open: true,
    hot: true,
    liveReload: false,
    // lazy: true,
    // filename: 'src.bundle.js',
  },
  // devServer: {
  //   stats: 'errors-only',
  //   index: 'index.php',
  //   contentBase: path.resolve(__dirname, 'wp-content/themes/beepix/'),
  //   watchContentBase: true,
  //   publicPath: 'http://localhost:8080/wp-content/themes/beepix',
  //   proxy: {
  //     context: () => true,
  //     target: 'http://localhost/beepix-webpack/dist'
  //   },
  //   host: process.env.HOST, // Defaults to `localhost`
  //   port: process.env.PORT, // Defaults to 8080
  //   open: true
  // }
};
