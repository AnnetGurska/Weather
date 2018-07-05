
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var paths = {
    client: path.join(__dirname, "react"),
    local: path.join(__dirname, "local"),
    pictPath:path.join(__dirname, "node_modules/react-icons"),
 };

module.exports = {
    context: paths.client,

   devtool :  'source-map', /* fixes bug with not stopping on break points in Chrome dev tool on initial page load*/
    entry: {
        app:  './index.js',
       vendor: ['react', 'lodash','react-dom', 'react-redux', 'redux-thunk', 'moment', 'react-router-transition', 'react-bootstrap'],
             css: [ "./theme/css/bootstrap.css", "./theme/css/font-awesome.css",  './theme/css/style.scss'],
     },
    output: {
        path: paths.local,
       publicPath : '/', /* to load files when opening non-Root path */
      filename: "[name].[hash].js",
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/ ,/* do not apply babel to files in node_modules */
                use: {
                    loader: 'babel-loader',

                    query: {
                        cacheDirectory: true,
                        babelrc: false,
                         presets: ["es2015", "stage-1", "react"],
                        plugins: ["transform-object-rest-spread","transform-es2015-arrow-functions",
                            "transform-decorators-legacy",
                            ["react-transform", {
                                "transforms": [{
                                    "transform": "react-transform-hmr",
                                    // if you use React Native, pass "react-native" instead:
                                    "imports": ["react"],
                                    // this is important for Webpack HMR:
                                    "locals": ["module"]
                                }]
                            }]

                        ],
                    }
                },

            },
            {
                test: /react-icons\/(.)*(.js)$/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: ["es2015", "stage-1", "react"],
                        plugins: ["transform-object-rest-spread","transform-es2015-arrow-functions",
                            "transform-decorators-legacy",
                            ["react-transform", {
                                "transforms": [{
                                    "transform": "react-transform-hmr",
                                    // if you use React Native, pass "react-native" instead:
                                    "imports": ["react"],
                                    // this is important for Webpack HMR:
                                    "locals": ["module"]
                                }]
                            }]

                        ],
                    }
                },
                include: paths.pictPath
            },

            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/,
            },
            {
                use: ['style-loader', 'css-loader','sass-loader'],
                test: /\.scss$/,
            },
            {
                test: /\.gif$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.(jpe|png|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?limit=100000'
            }
 

        ]
    },
    node: { /* to resolve error with missing Missing Net and Dns dependencies in webpack , https://github.com/hapijs/joi/issues/665*/
        net: 'empty',
        dns: 'empty'
    },
    plugins: [
     new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('local'),
        }
    }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'css',  'manifest']
        }), /* to make reload faster*/
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
     cache: true,
    resolve: {
        extensions: [".jsx", ".js", ".json"],
            modules: [
                paths.client,
         "node_modules"
        ]
    },
    devServer: {
        historyApiFallback: true, // to enable webpack found react routes
            hot: true,
          inline:true,
        contentBase: './local',
    }
};