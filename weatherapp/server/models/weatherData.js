var uuid = require('node-uuid');
var mongoose = require('mongoose');
var Inventory = mongoose.Schema;
var _ = require('lodash');
require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;

var weatherDataSchema = new Inventory({
    _id: {type: UUID, default: uuid.v4},
    CityName: {type: String, required: true},
    ZipCode:{type: String, required: true},
    Date: {type: Date ,  required: true},
    WeatherDataList:[],
 }, { collection: 'weatherData',timestamps: true }, { id: false });

module.exports =  mongoose.model('weatherData', weatherDataSchema);