var express = require('express'),
	bodyParser = require('body-parser'),
	schemas = require('./schemas/contact.js'),
	config = require('./config');

var	app = express();
app.use(bodyParser.json()); 

var port = process.env.PORT || config.port; 
var basePath = '/api/contact';

app.get(basePath, function(req, res) {
	dbSchemas.Contact.find(function (err, contacts) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		}else{
			res.status(200).send(contacts);
		}
	});
});	
app.get(basePath + '/:id', function (req, res) {
	dbSchemas.Contact.findById(req.params.id, function(err, contact){
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} else if (!contact) {
			res.status(404).send({'message':'no contact found with id'});
		} else{
			res.status(200).send(contact);
		}	
	});
});
app.post(basePath, function(req, res) {
	var contact = new dbSchemas.Contact(req.body);
	contact.save(function(err){
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.status(201).send(contact);
		}
	});  
});
app.put(basePath + '/:id', function(req, res) {
	dbSchemas.Contact.findById(req.params.id, function(err, contact) {
        if(err) {
			console.log(err);
			res.status(400).send(err);
		} else if (!contact) {
			res.status(404).send({'message':'no contact found with id'});
		}
		
		if(!!req.body.whatsapp) contact.whatsapp = req.body.whatsapp;
		if(!!req.body.email) contact.email = req.body.email;
		if(!!req.body.phone) contact.phone = req.body.phone;
		contact.update_at = new Date();

		contact.save(function(err) {
            if(err) {
				console.log(err);
				res.status(400).send(err);
			} else {
				res.status(200).send(contact);
			}
        });
    });
});
app.delete(basePath + '/:id', function(req, res) {
	dbSchemas.Contact.findByIdAndRemove(req.params.id, function (err, contact) {
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else if (!contact) {
			res.status(404).send({'message':'no contact found with id'});
		} else {
			res.status(204).send({'message': 'contact removed'});
		}
	});  
});

app.listen(port);
console.log('[contact_list] Server started on port ' + port);