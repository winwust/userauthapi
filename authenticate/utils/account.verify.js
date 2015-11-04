var jwt = require('jsonwebtoken');
var secret = require('../../config/secret');

var respond403 = function(res, msg) {
    res.status(403).send({
        confirmation: 'fail',
        reason: msg
    });
};

module.exports = function(req, res, next) {
    var token = req.get('Authorization');
    if (token) {
        jwt.verify(token, secret.getTokenPublicKey(), { algorithm: 'RS256' }, function(err, decoded) {
            if (err) {
                respond403(res, 'Invalid authentication token');
            } else {
                req.account = decoded;
                next();
            }
        });
    } else {
        respond403(res, 'No authentication token')
    }
};