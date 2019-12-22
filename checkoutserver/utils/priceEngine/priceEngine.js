const itemEngine = require('./itemEngine')
const shippingEngine = require('./shippingEngine')
const taxEngine = require('./taxEngine')
const orderEngine = require('./orderEngine')


function _runPrice(order, skuDetails){
    console.log('Pricing Engine' + order.Order_id)
    if(order.ItemList && skuDetails){
        itemEngine.price(order.ItemList, skuDetails)
    }
    if(order.ShippingInfo){
        
    }
    if(order.ItemList){
        orderEngine.price(order)
    }    
}

module.exports = {
    runPrice:_runPrice
}