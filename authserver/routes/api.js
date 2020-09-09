const authService = require('../service/authService');
let jwt = require('jsonwebtoken');
const config = require('../config/keys')
const express = require('express')

const router = express.Router();

// R0: Login user
// R1: Login user, but need to login once more.
// R2: Guset user or logged out.

router.post('/create',(req, res)=>{
    refresh_token = [...Array(5)].map(i=>Math.random().toString(36).slice(2)).join(''); 
    authService.createToken(refresh_token, req.body.accountId, req.body.loggedIn)
    .then(function (db) { // <- db as first argument
        user = req.body.loggedIn===true?{Role:'R0'}:{Role:'R2'};
        var atoken = jwt.sign(user,config.JWTSecertKey, {expiresIn:config.accessExpireTime, issuer:'ecom', subject:req.body.accountId});
        return res.status(201).json({
            refresh_token: refresh_token,
            access_token: atoken
        });
      }
    ).catch(err=>{
        return res.status(500).json({
            mgs:err.message
        });
    })

});

router.post('/refresh',(req, res)=>{
    //Issue the Access Token as Refresh token is validated.
    if(req.body.refresh_token){
        authService.getRefreshToken(req.body.refresh_token)
        .then(data => {
            console.log('Refresh Token Handler : ' + data)
            if(data){
                var accId = data.get('accId');
                user = data.get('loggedInStatus')===true?{Role:'R1'}:{Role:'R2'};
                var atoken = jwt.sign(user,config.JWTSecertKey, {expiresIn:config.accessExpireTime, issuer:'ecom', subject:accId})
                return res.status(201).json({
                    refresh_token: req.body.refresh_token,
                    access_token: atoken
                });
            }else{
                console.log('refresh token not found.')
                return res.status(401).json({});
            }
       }).catch(err => {//failure callback
            console.log(err)
            return res.status(403).json({
                mgs: err.message
            });
       }); 
       res.status(403);
    } else {
        //Issue the Access Token & Refresh token as Refresh token is not validated.
        res.status(403);
    }
    
});

module.exports = router;

