/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Start server and initialized mongo db
var express = require('express');
var mongoose = require('mongoose');
// Require config file, which is the index.js file inside of the environment folder
var config = require('./config/environment');

// Connect to database
var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(config.mongo.uri, {useNewUrlParser: true});

// Populate or Seed DB with sample data
if (config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app); // Define the name and location of routes

// Start server (and run it on the port number being defined)
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  console.log("KwonStyle has started"); 
});

// Expose app
exports = module.exports = app;