var config = require('../config');
var mongoose = config.db;

var ContactSchema = new mongoose.Schema({
  phone: String,
  email: String,
  whatsapp: String,
  updated_at: { type: Date, default: Date.now },
});

dbSchemas.Contact = config.db.model('contact', ContactSchema);