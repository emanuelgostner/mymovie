var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    //template: __dirname + '/app/templates/index.html',
    template: __dirname + '/src/main/resources/templates/index.html',
    filename: __dirname + '/src/main/resources/static/index.html',
    inject: 'body'
});
module.exports = {
    entry: __dirname + '/app/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test:/\.(jpg|png)$/,
                use: [
                    {loader: "url-loader"}
                ]
            }
        ]
    },
    output: {
        filename: 'app.js',
        publicPath:"/",
        path: __dirname + '/src/main/resources/static'
    },
    devServer: {
        historyApiFallback: true
    },
    //plugins: [HTMLWebpackPluginConfig]
};