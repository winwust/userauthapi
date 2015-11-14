var fs = require('fs');

var privateKey = null;
var publicKey = null;

var getTokenPrivateKey = function() {
    if (!privateKey) {
        privateKey = fs.readFileSync('./config/rsa/private.pem');
    }
    return privateKey;
};

var getTokenPublicKey = function() {
    if (!publicKey) {
        publicKey = fs.readFileSync('./config/rsa/public.pem');         
    }
    return publicKey;
};

module.exports = {
    getTokenPrivateKey: getTokenPrivateKey,
    getTokenPublicKey: getTokenPublicKey
};