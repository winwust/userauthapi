var express = require('express');
var router = express.Router();

require('../routes/todo.routes')(router);

module.exports = router;