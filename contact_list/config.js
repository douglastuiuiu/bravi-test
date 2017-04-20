var config = {};
dbSchemas = {}; //global

var mongoose = require('mongoose');
mongoose.connect('mongodb://douglastuiuiu:Doug1987@ds015584.mlab.com:15584/bravi_teste');
config.db = mongoose;

config.port = 3333;

module.exports = config;