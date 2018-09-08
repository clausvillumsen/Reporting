var path = require("path");

module.exports = {
    entry: ["./src/index.tsx"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]                
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        {
            test: /\.(png|jp(e*)g|gif|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
        }]
    }
};