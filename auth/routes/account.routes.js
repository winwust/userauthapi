var express = require('express');
var router = express.Router();

var AccountController = require('../controllers/account.controller');
    
router.route('/').post(AccountController.create);
router.route('/authenticate').post(AccountController.authenticate);

module.exports = router;