module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-es2015'
                        ],
                        plugins: [
                            "@babel/plugin-proposal-object-rest-spread"
                        ]
                    }
                }
            }
        ]
    }
};