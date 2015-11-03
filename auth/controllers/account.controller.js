var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Account = require('../models/account.model');
var secret = require('../../config/secret');

var create = function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            res.json({error: err.message});
        } else {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) {
                    res.json({error: err.message});
                } else {
                    var account = new Account();
                    account.firstName = req.body.firstName;
                    account.lastName = req.body.lastName;
                    account.email = req.body.email;
                    account.password = hash;
                    
                    account.save(function(err) {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({confirmation: 'duplicate email'});
                            } else {
                                res.json({error: err.message});
                            }
                        } else {
                            res.json({confirmation: 'succeed'});
                        }
                    });
                }
            });
        }
    });
};

var authenticate = function(req, res) {
    Account.findOne({email: req.body.email}, function(err, account) {
        if (err) {
            res.json({error: err.message});
        } else {
            if (account) {
                bcrypt.compare(req.body.password, account.password, function(err, match) {
                    if (err) {
                        res.json({error: err.message});
                    } else {
                        if (match) {
                            var token = jwt.sign(
                                { email: account.email }, 
                                secret.getTokenPrivateKey(),
                                { algorithm: 'RS256', expiresIn: '1d' }
                            );
                            res.json({
                                confirmation: 'succeed',
                                token: token
                            });
                        } else {
                            res.json({confirmation: 'fail'});
                        }
                    }
                });
            } else {
                res.json({confirmation: 'fail'});
            }
        }
    });
};

module.exports = {
    create: create,
    authenticate: authenticate
};