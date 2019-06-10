const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    // 入口文件配置项
    entry: {
        // 里面的main可以随便写
        main: './src/main.js',
        main2: './src/main2.js'
    },
    // 出口文件配置项
    output: {
        // 打包的路径
        path: path.resolve(__dirname, '../dist'),
        // 打包的文件名
        filename: '[name].js', // [name]入口文件是什么名字，打包出来是同样的名字
        publicPath: '',
    },
    // 模块，例如解读css,图片如何转换、压缩
    module: {
        rules: [
            // css loader
            {
                test: /\.css$/, // 对以css结尾的文件都进行loader
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // 图片
            {
                test: /\.(png|gif|jpg|jpeg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                    }
                }]
            }
        ]
    },
    // 插件，用于生产模板和各项功能
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: { // 对html进行压缩
                removeAttributeQuotes: true // 去掉属性的双引号
            },
            hash: true, // 加入hash，避免js缓存
            template: './src/index.html' // 需要打包的html路径和文件名称
        }),
        new extractTextPlugin("css/[name].css")
    ],
    // 配置webpack开发服务功能
    devServer: {
        // 设置项目的基本目录结构
        contentBase: path.resolve(__dirname, '../dist'),
        // 服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        // 服务端压缩是否开启
        compress: true,
        // 配置服务端口号
        port: 8888
    },
};