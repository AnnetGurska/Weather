var path = require('path'),
    WeatherData = require(path.resolve('./server/models/weatherData')),
    config = require(path.resolve('./config')),
    moment = require('moment'),
    _ = require('lodash'),
    request = require('request'),

    Q = require('q');

var API_KEY = 'b420a15d34a1858449c48f7d331581a7';

module.exports = function () {
    return function (req, res) {

        var deferred = Q.defer();
       var start = moment().startOf('day').toDate()
       var end = moment().endOf('day').toDate()
        if (!req.body.zipCode) {
            return Q.reject({'clientMessage': 'Parameter Zip Code not specified'});
        }
        if (!req.body.city) {
            return Q.reject({'clientMessage': 'Parameter City Name not specified'});
        }
        WeatherData.findOne({
            CityName: req.body.city,
            ZipCode: req.body.zipCode,
            Date: {$gte: start, $lt: end}
         // "$expr": { "$eq": [{ "$month": "$Date" }, 9] }
        }).exec(function (err, weatherData) {
            if (err) return deferred.reject(err);
            if (  weatherData) {
                return deferred.resolve(weatherData);
            } else {


               request('http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + req.body.latitude + '&lon=' + req.body.longitude + '&appid=' + API_KEY, function (err, response, body) {
                  //  request('http://api.openweathermap.org/data/2.5/forecast?units=metric&q=' + req.body.city + ','+req.body.countryCode.toLowerCase()+'&appid=' + API_KEY, function (err, response, body) {
                   var responseData = JSON.parse(response.body);


                        if (response.statusCode == 200) {
                            var objectToCreate = new WeatherData( {
                                CityName: req.body.city,
                                ZipCode: req.body.zipCode,
                                Date:moment().startOf('day').toDate(),
                                WeatherDataList:responseData.list,
                            });

                            objectToCreate.save(
                                function (err, savedRecord) {
                                    if (err) {
                                        return deferred.reject(err)
                                    }
                                    deferred.resolve(savedRecord);
                                });


                            // if (_.get(responseData, ['results', '0', 'geometry', 'location', 'lat'], false)) {
                            // }
                        }

                })
            }

        })
        return deferred.promise;
    }
};
