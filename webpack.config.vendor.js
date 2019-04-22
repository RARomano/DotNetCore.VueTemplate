const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("extract-text-webpack-plugin");

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  return [
    {
      stats: { modules: false },
      resolve: { extensions: [".js"] },
      entry: {
        vendor: [
          "element-ui/lib/theme-chalk/index.css",
          "element-ui",
          "moment",
          "event-source-polyfill",
          "isomorphic-fetch",
          "jquery",
          "vue",
          "vue-router"
        ]
      },
      module: {
        rules: [
          {
            test: /\.css(\?|$)/,
            use: isDevBuild
              ? ["style-loader", "css-loader"]
              : MiniCssExtractPlugin.extract({ use: "css-loader?minimize" })
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
            use: "url-loader?limit=100000"
          }
        ]
      },
      output: {
        path: path.join(__dirname, "wwwroot", "dist"),
        publicPath: "dist/",
        filename: "[name].js",
        library: "[name]_[hash]"
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: `vendor.css`
        }),
        new webpack.NormalModuleReplacementPlugin(
          /element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/,
          "element-ui/lib/locale/lang/en"
        ),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": isDevBuild ? '"development"' : '"production"'
        }),
        new webpack.DllPlugin({
          path: path.join(__dirname, "wwwroot", "dist", "[name]-manifest.json"),
          name: "[name]_[hash]"
        })
      ].concat(isDevBuild ? [] : [new webpack.optimize.UglifyJsPlugin()])
    }
  ];
};
