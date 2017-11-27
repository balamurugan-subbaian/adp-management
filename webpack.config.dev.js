import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    resolve : {
        extensions : ["*", ".js", ".json", ".jsx"]
    },
    devtool: "cheap-module-source-map",
    entry:[
        './src/webpack-public-path',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        'babel-polyfill',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
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
              use: ['file-loader']
            },
            {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
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
                    mimetype: 'application/octet-stream'
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
                    mimetype: 'image/svg+xml'
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
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
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
            }
          ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('produnction'),
          __DEV__: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
}