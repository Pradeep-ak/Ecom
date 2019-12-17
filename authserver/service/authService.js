const tokens = require('../models/tokens');

function _getRefreshToken(token){
    console.log('_getRefreshToken' + token)
    return tokens.findOne({token:token});
}

function _getCreateToken(token, accId, loggedInStatus){
    return tokens.create({
        token:token,
        accId:accId,
        loggedInStatus:loggedInStatus
    });
}

module.exports = {
    getRefreshToken:_getRefreshToken,
    createToken:_getCreateToken
}