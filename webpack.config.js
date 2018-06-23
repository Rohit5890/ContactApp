var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin =  require('html-webpack-plugin');


module.exports = {
    entry: [
        path.join(__dirname,'./index.js')
    ],
    output: {
        path:__dirname + '/dist',
        filename:'bundle.js'
    },
    module:{
        rules:[
            {   
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            hash:true,
            myPageTitle:"My Contacts",
            template:path.join(__dirname,'./index.html'),
            filename:path.join(__dirname,'./dist/index.html')
        })
    ],
    devServer:{
        contentBase:__dirname + '/dist/',
        historyApiFallback: true,
        port: 9000
    }
}