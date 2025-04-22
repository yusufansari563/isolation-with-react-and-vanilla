const path = require("path");
const HtmlRspackPlugin = require("html-rspack-plugin");
// const { ModuleFederationPlugin } = require("@rspack/plugin-module-federation");
const { ModuleFederationPlugin } = require('@module-federation/enhanced-rspack');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:8080/",
    uniqueName: 'federation_provider'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              exportType: "string",
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "ChatComponent",  // your module name
      filename: "remoteEntry.js",
      exposes: {
        './ChatMessage': './src/components/chat-message.js',
        './ChatBox': './src/components/chat-box.js',
      },
    }),
    new HtmlRspackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8080,
    hot: true,
  },
};
