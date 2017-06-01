const webpack = require('webpack');

const LIB_NAME = 'XHRShaper';

const configs = [];
const environment = process.env.NODE_ENV;

console.log('Building', LIB_NAME, 'with NODE_ENV:', environment, '\n');

function makeConfig(options) {

    const libName = options.libName || LIB_NAME;

    console.log('Making build config for:', libName, 'with options:\n', options, '\n');

    const baseConfig = {
        context: __dirname,
        devtool: 'source-map',
        entry: options.entry,
        externals: options.externals,
        output: {
            path: __dirname + "/dist",
            publicPath: "/dist/",
            filename: libName + '.' + options.libraryTarget + ".js",
            library: libName,
            libraryTarget: options.libraryTarget,
            sourceMapFilename: '[file].map'
        },
        module: {
          rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
          ]
        },
        plugins: [
            //new webpack.optimize.DedupePlugin(),
            //new webpack.optimize.OccurrenceOrderPlugin()
        ]
    };

    return baseConfig;
}

configs.push(makeConfig({
    libraryTarget: 'umd',
    entry: './index',
}));

configs.push(makeConfig({
    libraryTarget: 'this',
    entry: './index'
}));

module.exports = configs;