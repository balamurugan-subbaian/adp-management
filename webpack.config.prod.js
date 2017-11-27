import webpack from 'webpack';
import WebpackMd5Hash from 'webpack-md5-hash';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
};

export default {
    resolve : {
        extensions : ["*", ".js", ".json", ".jsx"]
    },
    devtool: "source-map",
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.eot(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff',
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/octet-stream',
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'image/svg+xml',
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /(\.css|\.scss|\.sass)$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: true
                }
              }, {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')
                  ],
                  sourceMap: true
                }
              }, {
                loader: 'sass-loader',
                options: {
                  includePaths: [path.resolve(__dirname, 'src', 'scss')],
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
        new WebpackMd5Hash(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedentantAttribute: true,
                useShortDoctype: true,
                removeEmptyAttribute: true,
                removeStyleLinkTypeAttribute: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
}