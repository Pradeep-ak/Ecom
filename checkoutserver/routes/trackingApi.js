const express = require('express');
const trackingService = require('../service/trackingService')
const router = express.Router();

router.get('/myorders',async(req, res)=>{
    try {
        if(req.query.id && req.query.email && req.query.phone){
            trackingService.getOrder(
                req.query.id,
                req.query.email,
                req.query.phone
                ).then(result=>{
                // console.log(result)
                if(result){
                    res.status(200).json({myOrder:result});
                } else{
                    res.status(404).json({message: "1.Could not find any order for a given details."});
                }
            }).catch(err=>{
                console.log(err)
                res.status(404).json(error.msg);
            })
        }else {
            res.status(404).json({message: "2.Could not find any order for a given details."});
        }
    } catch (error) {
        console.log(error)
        res.status(404).json(error.msg);
    }
});

module.exports=router;