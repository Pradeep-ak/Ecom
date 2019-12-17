const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config/keys');
const authService = require('./service/authService.js');
const bodyParser = require('body-parser');

const app = express();

const db = config.mongoURI

mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// R0: Login user
// R1: Login user, but need to login once more.
// R2: Guset user or logged out.

app.get('/api/au/ping',(req, res)=>{
    console.log('Auth Server');
    res.status(200).json({message:'Hello World'})
});

app.post('/api/au/create',(req, res)=>{
    refresh_token = [...Array(5)].map(i=>Math.random().toString(36).slice(2)).join(''); 
    authService.createToken(refresh_token, req.body.accountId, req.body.loggedIn)
    .then(function (db) { // <- db as first argument
        user = req.body.loggedIn===true?{Role:'R0'}:{Role:'R2'};
        var atoken = jwt.sign(user,require('./config/keys').JWTSecertKey, {expiresIn:config.accessExpireTime, issuer:'ecom', subject:req.body.accountId});
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

app.post('/api/au/refresh',(req, res)=>{
    //Issue the Access Token as Refresh token is validated.
    if(req.body.refresh_token){
        authService.getRefreshToken(req.body.refresh_token)
        .then(data => {
            console.log('Refresh Token Hnalder : ' + data)
            if(data){
                var accId = data.get('accId');
                user = data.get('loggedInStatus')===true?{Role:'R1'}:{Role:'R2'};
                var atoken = jwt.sign(user,require('./config/keys').JWTSecertKey, {expiresIn:config.accessExpireTime, issuer:'ecom', subject:accId})
                return res.status(201).json({
                    refresh_token: req.body.refresh_token,
                    access_token: atoken
                });
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

const port = process.env.PORT || 9000;
app.listen(port, ()=> console.log('Auth Server running on port ' + port))