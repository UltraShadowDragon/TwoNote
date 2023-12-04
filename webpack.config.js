const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',

  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
  },
  

  entry: {
    // define HTML files here
    index: './docs/index.html',  // => dist/index.html
    signup: './docs/signup.html', // => dist/signup.html
    // ...
  },

  plugins: [
    new HtmlBundlerPlugin({
      js: {
        // output filename of extracted JS from source script loaded in HTML via `<script>` tag
        filename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        // output filename of extracted CSS from source style loaded in HTML via `<link>` tag
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      // Note: enable processing of HTML files from entry
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader, // HTML loader
      },
      // styles
      {
        test: /\.(css)$/,
        use: ['css-loader'],
      },
      // images
      {
        test: /\.(png|jpe?g|svg|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
    },
    ],
  },

  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve("crypto-browserify"),
      "path": require.resolve("path-browserify"), // Add this line
      "zlib": require.resolve("browserify-zlib"),
      "https": require.resolve("https-browserify"),
    },
  },    
  
};