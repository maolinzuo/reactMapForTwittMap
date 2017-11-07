var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src','index.js'),
    output:{
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
          {
            test: /\.json$/,
            loader: "json"
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015','react','stage-0']
            }
          }
        ]
    }

};
