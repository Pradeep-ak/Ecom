const itemEngine = require('./itemEngine')
const shippingEngine = require('./shippingEngine')
const taxEngine = require('./taxEngine')
const orderEngine = require('./orderEngine')


async function _runPrice(order, skuDetails){
    console.log('Pricing Engine' + order.Order_id)
    if(order.ItemList && skuDetails){
        itemEngine.price(order.ItemList, skuDetails)
    }
    if(order.ShippingInfo){
        order.ShippingInfo = await shippingEngine.price(order.ShippingInfo)
    }
    if(order.ItemList){
        order = orderEngine.price(order)
    }
    return order;
}

module.exports = {
    runPrice:_runPrice
}