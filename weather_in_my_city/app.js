var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('./config'),
	weather = require('openweathermap');

var	app = express();
var port = process.env.PORT || config.port; 
app.use(bodyParser.json()); 

weather.defaults({
    appid: '2a1d6ba8f1f58bb8239b36ea035476df',
    method: 'name',
    format: 'JSON',
    accuracy: 'accurate',
    units: 'imperial'
});

app.get('/:city', function (req, res) {	
	var city = req.params.city;
	city = (city.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));

	weather.now({q:city}, function(err, json){
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} else{
			res.status(200).send(json);
		}
	});
});

app.listen(port);
console.log('[weather_in_my_city] Server started on port ' + port);