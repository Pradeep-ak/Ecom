const express = require('express');
const cartService = require('../service/cartService')
const router = express.Router();

router.post('/additem',async(req, res)=>{
    console.log('sku_id : ' + req.body.sku_id);
    var cart = await cartService.getCart(req.decoded.sub);
    cart = await cartService.addORupdateItemTocart(cart, req.body.sku_id, 1, false);
    skuDetails = cart.ItemList.map(e=>({
        sku_id : e.sku,
        quantity : e.quantity
    }));
    cart = cartService.saveCart(cart)
    res.status(200).json({msg:req.body.sku_id+' is added to cart.', cart:skuDetails});
});

router.get('/cartTotal',async(req, res)=>{
    var cart = await cartService.getCart(req.decoded.sub);
    skuDetails = []
    if(cart.ItemList){
        skuDetails = cart.ItemList.map(e=>({
            sku_id : e.sku,
            quantity : e.quantity
        }));
    }
    res.status(200).json({cart:skuDetails});
});

router.get('/cartDetails',async(req, res)=>{
    var cart = await cartService.getCart(req.decoded.sub);
    if(cart.ItemList && cart.ItemList.length > 0){
        skus = cart.ItemList.map(e=>e.sku);
        skuDetails = (await cartService.getSkuDetails(skus)).data;
        // console.log(skuDetails)
        await cartService.updateOrderSkuDetails(cart, skuDetails);
        await cartService.getOrderPricing(cart, skuDetails);
        cartService.saveCart(cart)   
        return res.status(200).json(cart);
    }
    return res.status(200).json(null);
    
});

router.post('/updateItem',async(req, res)=>{
    var cart = await cartService.getCart(req.decoded.sub);
    try {
        quantity = parseInt(req.body.quantity);
        cart = await cartService.addORupdateItemTocart(cart, req.body.sku_id, quantity, true);
        skus = cart.ItemList.map(e=>e.sku);
        skuDetails = (await cartService.getSkuDetails(skus)).data;
        await cartService.updateOrderSkuDetails(cart, skuDetails);
        await cartService.getOrderPricing(cart, skuDetails);
        cartService.saveCart(cart)
        res.status(200).json({msg:req.body.sku_id+' is updated.', cart:cart});
    } catch (error) {
        res.status(500).json(error.msg);
    }
});

router.post('/removeItem',async(req, res)=>{
    try {
        var cart = await cartService.getCart(req.decoded.sub);
        cart = await cartService.removeItemFromCart(cart, req.body.sku_id);
        // skus = cart.ItemList.map(e=>e.sku);
        // skuDetails = (await cartService.getSkuDetails(skus)).data;
        // cartService.updateOrderSkuDetails(cart, skuDetails);
        await cartService.getOrderPricing(cart, null);
        await cartService.saveCart(cart)
        res.status(200).json({msg:req.body.sku_id+' is removed.', cart:cart});
    } catch (error) {
        res.status(500).json(error.msg);
    }
});


module.exports=router;