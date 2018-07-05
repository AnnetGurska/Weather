(function () {
    "use strict";


    var path = require('path'),
         PORT = process.env.PORT || 8081,
        express = require('express'),
        bodyParser = require('body-parser'),
        config = require(path.resolve('./config.js')),
        serverConfig = require(path.resolve('./serverConfig.js')),
        app = express(),
         webpack = require('webpack'),
        _ = require('lodash'),
        errorHandler = require('./server/error-handler'),
        exphbs = require('express-handlebars')


    if (process.env.NODE_ENV == 'local') {
        var cors = require('cors');
        app.use(cors());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));



    // Set the template engine
    app.engine('handlebars', exphbs());
    // Set views path and view engine
    app.set('view engine', 'handlebars');
    app.set('views', './');

    require('./server/mongo-connection')(function (err, dbConnection) {
        if (err) {
            return console.log('no db connection');
        }
         app.post('/weather_data', function (req, res, next) {
            require('./server/api/weatherData/get')()(req).then(function (response) {
                return res.send(response);
            }).catch(function (error) {
                return next(error);
            });
        });



        if (process.env.NODE_ENV == 'local') {
            app.use(express.static('react/local'));
            app.use(function (req, res, next) {
                res.sendFile(__dirname + '/local/index.html');
            });
        }
         /* error handler */
        app.use(function (err, req, res, next) {
            res.status(err.status || 400);
            var error = errorHandler.getErrorObject(err);
            return res.send(error);
        });
        var server = app.listen(PORT, function () {
            console.log("server started on port " + PORT, process.env.NODE_ENV);
        });
        server.timeout = 252000;
    });
}());