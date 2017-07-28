var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');

var config = require('./config');
var routes = require('./routes');


 
let app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieparser());

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}

app.use(allowCrossDomain);
routes.configure(app);

let server = app.listen(config.server_port, config.server_ip_address, function() {
  console.log('Server active, listening on port ' + server.address().port + '.');
});

module.exports = server