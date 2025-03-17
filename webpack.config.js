const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'development', // Cambia a 'production' si es para producción

  entry: './frontend/src/index.js', // Se eliminó 'style' y ahora se importa en index.js

  devtool: 'inline-source-map',

  devServer: {
    static: path.resolve(__dirname, 'frontend/public'),
    hot: true,
    liveReload: true,
    historyApiFallback: true, // Redirige todas las rutas a index.html
    port: 3000, // Puedes cambiar el puerto si es necesario
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/public/index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Se agregó soporte para JSX (React)
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Se agregó soporte para React
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
            ],
          },
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

module.exports = config;
