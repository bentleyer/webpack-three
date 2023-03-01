const path = require('path') // 处理绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack'); // 访问内置的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const portfinder = require('portfinder');


    module.exports = {
        entry: {
          'index': path.join(__dirname, '/src/index.js'), // 入口文件,
          'start': path.join(__dirname, '/src/pages/start/main.js'), // 入口文件,
          'geometry': path.join(__dirname, '/src/pages/geometry/main.js'), // 入口文件
          'point': path.join(__dirname, '/src/pages/point/main.js'), // 入口文件
          'webgl': path.join(__dirname, '/src/pages/webgl/main.js'), // 入口文件
          'earth': path.join(__dirname, '/src/pages/earth/main.js'), // 入口文件
          'lantern': path.join(__dirname, '/src/pages/lantern/main.js'), // 入口文件
          'smoke': path.join(__dirname, '/src/pages/smoke/main.js'), // 入口文件
        },
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, './dist'),
          chunkFilename: '[name].bundle.js',
        },
        resolve: {
          alias: {
            '@':  path.resolve(__dirname, './src'),
          }
        },
        devServer: {
          hot: true,
          port: 8088, // 设置端口号为8088
        },
        module: {
          rules: [
            {
                // For pure CSS - /\.css$/i,
                // For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
                // For Less - /\.((c|le)ss)$/i,
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                    // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                    // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                    },
                },
                {
                    loader: "postcss-loader",
                    options: {
                    postcssOptions: {
                        plugins: [
                        [
                            "postcss-preset-env",
                            {
                            // Options
                            },
                        ],
                        ],
                    },
                    },
                },
                // Can be `less-loader`
                {
                    loader: 'sass-loader',
                },
                ],
            },
            {
              test: /\.(png|svg|jpg|gif|hdr|jpeg|glb)$/,
              use: {
                  loader: 'url-loader'
              }
            },
            {
              test: /\.glsl$/,
              loader: 'webpack-glsl-loader'
            }
            
          ]
        },
        plugins: [
          // new HtmlWebpackPlugin({
          //   filename: 'index.html',
          //   template: 'index.html',
          //   inject: true,
          //   minify: {
          //     removeComments: true,
          //     collapseWhitespace: true,
          //     removeAttributeQuotes: true
          //   }
          // }),
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({ template: './src/pages/start/index.html', chunks: ['start'], filename: 'start.html' }),
          new HtmlWebpackPlugin({ template: './src/pages/geometry/index.html', chunks: ['geometry'], filename: 'geometry.html' }),
          new HtmlWebpackPlugin({ template: './src/index.html', chunks: ['index'], filename: 'index.html' }),
          new HtmlWebpackPlugin({ template: './src/pages/geometry/index.html', chunks: ['point'], filename: 'point.html' }),
          new HtmlWebpackPlugin({ template: './src/pages/webgl/index.html', chunks: ['webgl'], filename: 'webgl.html' }),
          new HtmlWebpackPlugin({ template: './src/pages/earth/index.html', chunks: ['earth'], filename: 'earth.html' }),
          new HtmlWebpackPlugin({ template: './src/pages/lantern/index.html', chunks: ['lantern'], filename: 'lantern.html' }),
          new HtmlWebpackPlugin({ template: './src/pages/smoke/index.html', chunks: ['smoke'], filename: 'smoke.html' }),
          // new HtmlWebpackPlugin({ template: './src/index.html'}),
          new webpack.HotModuleReplacementPlugin(),
          new MiniCssExtractPlugin()
        ]
      }

