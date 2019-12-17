const orderRepo = require('../models/order')
const RepoTemplates = require('../models/orderTemplate')

async function _getCart(acc_id){
    var orderItem = await orderRepo.findOne({Acc_id:acc_id, Status:'INPROGRESS'}).exec();
    console.log('Order data from DB : ' + orderItem)
    if(orderItem){
        return orderItem.toJSON();
    }else{
        order_id = Date.now()+[...Array(1)].map(i=>Math.random().toString(36).slice(2)).join('')
        var order=RepoTemplates.getOrder();
        order.Order_id = order_id;
        order.Acc_id = acc_id;
        var newOrder = await orderRepo.create(order);
        return newOrder.toJSON();
    }
}

async function _addItemTocart(cart, skuId, quantity){
    console.log('Order data in addItemTocart : ' + cart)
    if(!cart.ItemList){
        cart['ItemList'] = []
    }
    console.log(cart)
    skuJson = cart.ItemList.find(e=>e.sku===skuId);
    if(skuJson === undefined){
        console.log('create the new items')
        cart.ItemList.push({
            sku:skuId,
            quantity:quantity
        });
        console.log(cart)
    } else {
        console.log('update the quantity')
        skuJson.quantity = skuJson.quantity + quantity;
    }
    console.log(cart)
    var newCart = await orderRepo.findByIdAndUpdate(cart._id, {$set:cart},{new:true});
    return newCart.toJSON();
}

module.exports = {
    getCart:_getCart,
    addItemTocart:_addItemTocart
}