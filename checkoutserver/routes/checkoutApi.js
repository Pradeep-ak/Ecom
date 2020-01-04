const express = require('express')
const cartService = require('../service/cartService')
const checkoutService = require('../service/checkoutService')
const validator = require('../utils/validator')
const utils = require('../utils/utils')
const router = express.Router();

router.get('/ping', (req, res) =>{
    res.status(200).json({msg:'Checkout Server.'})
});

router.get('/order', async (req, res) =>{
    var order = await cartService.getCart(req.decoded.sub);
    if(!order.ItemList && !order.PriceInfo && !order.PriceInfo.orderSubTotal) {
        redirecturl = '/cart'
        res.status(200).json({"REDIRECT_URL":redirecturl})
    }
    await checkoutService.fillInnerHTML(order);
    res.status(200).json(order);
});

router.get('/orderReview', async (req, res) =>{
    var order = await cartService.getCart(req.decoded.sub);
    await checkoutService.fillInnerHTML(order);
    if(!order.review) {
        redirecturl = '/cart'
        return res.status(200).json({"REDIRECT_URL":redirecturl})
    }
    res.status(200).json(order);
});

router.post('/orderSubmit', async (req, res) =>{
    try{
        var orderRepo = await cartService.getCart(req.decoded.sub);
        var order = utils.clone(orderRepo)
        await checkoutService.fillInnerHTML(order);
        if(!order.review) {
            redirecturl = '/cart'
            res.status(200).json({"REDIRECT_URL":redirecturl})
        }
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await checkoutService.submitOrder(orderRepo, req.headers['user-agent'], ip);
        await cartService.saveCart(orderRepo)
        res.status(200).json({'status':'SUBMITTED', id: order.Order_id});
    } catch(err){
        res.status(400).json({msg: err.message});
    }
});

router.get('/loadOrderConfirmation', async (req, res) =>{
    try{
        var orderRepo = await checkoutService.getSubmittedOrder(req.decoded.sub, req.query.orderId);
        if(!orderRepo) {
            redirecturl = '/cart'
            return res.status(200).json({"REDIRECT_URL":redirecturl})
        }
        orderRepo.Status='CONFIRMED'
        await cartService.saveCart(orderRepo)
        res.status(200).json(orderRepo);
    } catch(err){
        console.error(err)
        res.status(400).json({msg: err.message});
    }
});


router.put('/personalInfo', async (req,res) => {
    console.log('Update the Personal Info.')
    if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.pnumber){
        res.status(400).json({msg:'Personal Data is missing, Please provide all the data.'})
    }
    var order = await cartService.getCart(req.decoded.sub);
    //Update the order with Info.
    await checkoutService.updatePersonalInfo(order, req.body);
    cartService.saveCart(order)
    await checkoutService.fillInnerHTML(order);
    res.status(200).json(order);
});

router.put('/shippingInfo', async (req,res) => {
    console.log('Update the Shipping Info.')
    if(await !validator.validatedPincode(req.body.pincode)){
        console.error('Shipping Validation failed.')
        res.status(400).json({msg:'Shipping Address is missing, Please provide all the data.'})
    }
    var order = await cartService.getCart(req.decoded.sub);
    //Update the order with Info.
    await checkoutService.updateShippingAddress(order, req.body);
    if(order.BillingInfo && order.BillingInfo.sameAsShippingAdd && order.BillingInfo.sameAsShippingAdd === 'true'){
        checkoutService.copyShippingToBillingAddr(order);
    }
    cartService.saveCart(order)
    await checkoutService.fillInnerHTML(order);
    res.status(200).json(order);
});

router.put('/shippingType', async (req,res) => {
    console.log('Update the Shipping Type.')
    // if(!validator.validatedPincode(req.body.pincode)){
    //     console.error('Shipping Validation failed.')
    //     res.status(400).json({msg:'Shipping Address is missing, Please provide all the data.'})
    // }
    var order = await cartService.getCart(req.decoded.sub);
    //Update the order with Info.
    await checkoutService.updateShippingType(order, req.body);
    await cartService.getOrderPricing(order, null);
    cartService.saveCart(order)
    await checkoutService.fillInnerHTML(order);
    res.status(200).json(order);
});

router.put('/billingInfo', async (req,res) => {
    console.log('Update the Billing Info.')
    var order = await cartService.getCart(req.decoded.sub);

    if(req.body.SASA && req.body.SASA === 'true' && (!order.ShippingInfo || !order.ShippingInfo.address)){
        res.status(400).json({msg:'Shipping Address is missing, Please provide all the data.'})
    }
    if(req.body.SASA && req.body.SASA === 'false' && !validator.validatedPincode(req.body.pincode)){
        console.error('Billing Validation failed.')
        res.status(400).json({msg:'Billing Address is missing, Please provide all the data.'})
    }
    //Update the order with Info.
    if(req.body.SASA && req.body.SASA === 'true'){
        checkoutService.copyShippingToBillingAddr(order);
    } else {
        checkoutService.updateBillingAddress(order, req.body);
    }
    cartService.saveCart(order)
    await checkoutService.fillInnerHTML(order);
    res.status(200).json(order);
});

router.put('/paymentInfo', async (req,res) => {
    console.log('Update the Payment Info.')
    var order = await cartService.getCart(req.decoded.sub);

    // if(!order.ShippingInfo || !order.ShippingInfo.address){
    //     res.status(400).json({msg:'Shipping Address is missing, Please provide all the data.'})
    // }
    //Update the order with Info.
    checkoutService.updatePaymentInfo(order, req.body)
    cartService.saveCart(order)
    await checkoutService.fillInnerHTML(order);
    res.status(200).json(order);
});

module.exports = router