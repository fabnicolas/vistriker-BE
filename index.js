var config = require('./config');
let app = require("./app");
let server = app.listen(config.server_port, config.server_ip_address, function() {
  console.log('Server active, listening on port ' + server.address().port + '.');
});