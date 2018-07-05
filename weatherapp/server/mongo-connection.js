var mongoose = require('mongoose'),
 path = require('path'),
     serverConfig = require(path.resolve('./serverConfig'));
var url = 'mongodb://localhost:27017/weather_app'
url = 'mongodb://admin:pass234678@ds125181.mlab.com:25181/weather_data'
 var options = {
   useMongoClient: true
};
module.exports = function (cb) {
    mongoose.connect(url, options, cb);
};