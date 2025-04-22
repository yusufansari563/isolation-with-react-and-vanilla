const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const TerserPlugin = require('terser-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

const renameClassSuffix = "t__";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-react'],
              plugins: [
                function renameClassPlugin() {
                  return {
                    visitor: {
                      JSXAttribute(path) {
                        if (path.node.name.name !== 'className') return;

                        const valueNode = path.node.value;

                        // Handle className="fixed w-full"
                        if (valueNode.type === 'StringLiteral') {
                          path.node.value.value = valueNode.value
                            .split(/\s+/)
                            .map(cls => `${renameClassSuffix}${cls}`)
                            .join(' ');
                        }

                        // Handle className={'fixed w-full'}
                        if (
                          valueNode.type === 'JSXExpressionContainer' &&
                          valueNode.expression.type === 'StringLiteral'
                        ) {
                          valueNode.expression.value = valueNode.expression.value
                            .split(/\s+/)
                            .map(cls => `${renameClassSuffix}${cls}`)
                            .join(' ');
                        }
                      },
                    },
                  };
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }, // Make sure PostCSS and Sass are applied before
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  function (css) {
                    css.walkRules((rule) => {
                      rule.selector = rule.selector.replace(
                        /\.([a-zA-Z0-9_-]+)(?=[^:]|$)/g, // Match class names
                        (match, cls) => `.${renameClassSuffix}${cls}`
                      );
                    });
                  },
                ],
              },
            },
          },
          'sass-loader', // Make sure Sass runs first
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',      // 'server' | 'static' | 'disabled'
      analyzerHost: '127.0.0.1',   // Default: localhost
      analyzerPort: 8888,          // Port for report
      openAnalyzer: false,          // Auto-open in browser
      generateStatsFile: false,    // Set true to create stats.json
    }),
    new ModuleFederationPlugin({
      name: "react_consumer",
      remotes: {
        chat_provider: "ChatComponent@http://localhost:8080/remoteEntry.js",
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
      watch: true,
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true, // Handles dots in URLs
    },
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".html", ".css", ".scss"],
  },
};
