const Account = require('../models/account');
const axios = require('axios');
const config = require('../config/keys')
const utils = require('../utils/utils')

function _createGuestAccount(){
    Acc_ID = Date.now()+[...Array(1)].map(i=>Math.random().toString(36).slice(2)).join('')
    Account.create({
        ID:Acc_ID,
        createDate:Date.now(),
        type:'GUEST',
        username:null,
        password:null,
        email:null,
        phoneNumber:null
    })
    return Acc_ID;
}

function _createToken(Acc_ID, IsLoggedIn){
    return axios({
        method:'POST',
        url:config.authURI+'/api/au/create',
        data:utils.formUrlEncoded({
            accountId:Acc_ID,
            loggedIn:IsLoggedIn
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
}

function _refreshToken(data){
    // console.log('data.refresh_token = '+data.refresh_token)
    return axios({
        method:'POST',
        url:config.authURI+'/api/au/refresh',
        data:utils.formUrlEncoded({
            refresh_token:data.refresh_token,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
}


module.exports = {
    createGuestAccount:_createGuestAccount,
    createToken:_createToken,
    refreshToken:_refreshToken
}
    
