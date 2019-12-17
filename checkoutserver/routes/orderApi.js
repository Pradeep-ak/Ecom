const express = require('express');
const cartService = require('../service/cartService')
const router = express.Router();

router.post('/additem',async(req, res)=>{
    console.log('sku_id : ' + req.body.sku_id);
    var cart = await cartService.getCart(req.decoded.sub);
    cart = await cartService.addItemTocart(cart, req.body.sku_id, 1);
    res.status(200).json(cart);
});

module.exports=router;