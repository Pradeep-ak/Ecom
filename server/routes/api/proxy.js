const express = require('express');
const router = express.Router();
const aixo = require('axios')

const AU_HOST = 'http://localhost:9000'
const ACC_HOST = 'http://localhost:7000'
const CHECKOUT_HOST = 'http://localhost:8000'

router.all('/au/*',(req,res)=>{
    aixo({
        method:req.method,
        url:AU_HOST+req.baseUrl+req.url,
        data:req.body,
        headers:req.headers
    }).then((cres) => {
        res.status(cres.status).json(cres.data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({mess:err.message})
    })
});

router.all('/a/*',(req,res)=>{
    aixo({
        method:req.method,
        url:ACC_HOST+req.baseUrl+req.url,
        data:req.body,
        headers:req.headers
    }).then((cres) => {
        res.status(cres.status).json(cres.data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({mess:err.message})
    })
});

router.all('/o/*',(req,res)=>{
    aixo({
        method:req.method,
        url:CHECKOUT_HOST+req.baseUrl+req.url,
        data:req.body,
        headers:req.headers
    }).then((cres) => {
        res.status(cres.status).json(cres.data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({mess:err.message})
    })
});

module.exports=router;
