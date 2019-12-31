

function _getOrderSubTotal(ItemList){
    return ItemList.reduce(function (total, e) {
        if(e.priceInfo && e.priceInfo.totalItemPrice){
            return total + e.priceInfo.totalItemPrice;
        }else{
            return total;
        }
    },0);
}

function _getOrderItemSaving(ItemList){
    return ItemList.reduce(function (total, e){
        if(e.priceInfo && e.priceInfo.totalSaving){
            return total + e.priceInfo.totalSaving;
        }else{
            return total;
        }
    },0);
}

function _getOrderShippingTotal(ShippingInfo){
    if(ShippingInfo && ShippingInfo.priceInfo && ShippingInfo.priceInfo.totalPrice){
        return ShippingInfo.priceInfo.totalPrice;
    } 
    return 0;
}

function _getOrderTaxAmount(ShippingInfo, ItemList, orderShippingTotal, orderSubTotal){
    return 0;    
}

function _getOrderTotal(orderTaxAmount,orderShippingTotal, orderSubTotal){
    return orderTaxAmount + orderShippingTotal + orderSubTotal;
}

function _priceInfo(order){
    var orderSubTotal = _getOrderSubTotal(order.ItemList);
    var orderItemSaving = _getOrderItemSaving(order.ItemList);
    var orderShippingTotal = _getOrderShippingTotal(order.ShippingInfo);
    var orderTaxAmount = _getOrderTaxAmount(order.ShippingInfo, order.ItemList, orderShippingTotal,  orderSubTotal);
    var orderTotal = _getOrderTotal(orderTaxAmount, orderShippingTotal,  orderSubTotal);
    return {
        orderSubTotal:orderSubTotal,
        orderItemSaving:orderItemSaving,
        orderShippingTotal:orderShippingTotal,
        orderTaxAmount:orderTaxAmount,
        orderTotal:orderTotal
    }
}

function _price(order){
    PriceInfo = _priceInfo(order)
    order.PriceInfo=PriceInfo;
    return order;
}

module.exports = {
    price:_price
}