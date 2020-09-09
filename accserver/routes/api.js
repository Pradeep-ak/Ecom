const express = require('express');
const accountService = require('../service/accountService');
const router = express.Router();

router.post('/createToken',(req,res) => {
    acc_ID =accountService.createGuestAccount();
    accountService.createToken(acc_ID, false)
    .then((cres) => {
        res.status(cres.status).json(cres.data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({mess:err.message})
    });
});

router.post('/refresh',(req,res) => {
    // console.log(req.body.refresh_token)
    accountService.refreshToken(req.body).then((cres) => {
        console.log(cres.status)
        res.status(cres.status).json(cres.data)
    }).catch((error)=>{
        console.log('error.response.status : '+error)
        if (error.response) {
            if(error.response.status===401){
                acc_ID =accountService.createGuestAccount();
                accountService.createToken(acc_ID, false)
                .then((cres) => {
                    return res.status(cres.status).json(cres.data)
                }).catch((err)=>{
                    console.log(err)
                    return res.status(500).json({mess:err.message})
                });
            } else {
                return res.status(error.response.status).json({msg:'Internal Server Error'})
            }
        } else {
            console.log(err)
            return res.status(500).json({mess:err.message})
        }
    })
});

module.exports = router;