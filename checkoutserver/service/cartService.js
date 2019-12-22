const orderRepo = require('../models/order')
const RepoTemplates = require('../models/orderTemplate')
const axios = require('axios')
const config = require('../config/keys')
const pricingEngine = require('../utils/priceEngine/priceEngine')

async function _getCart(acc_id){
    var orderItem = await orderRepo.findOne({Acc_id:acc_id, Status:'INPROGRESS'}).exec();
    // console.log('Order data from DB : ' + orderItem)
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

async function _addORupdateItemTocart(cart, skuId, quantity, repalce){
    if(!cart.ItemList){
        cart['ItemList'] = []
    }
    skuJson = cart.ItemList.find(e=>e.sku===skuId);
    if(skuJson === undefined){
        console.log('create the new items')
        cart.ItemList.push({
            sku:skuId,
            quantity:quantity
        });
        console.log(cart)
    } else {
        if(repalce === false){
            skuJson.quantity = skuJson.quantity + quantity;
            console.log('update the quantity')
        } else {
            skuJson.quantity = quantity;
            console.log('replace the quantity')
        }
    }
    // var newCart = await orderRepo.findByIdAndUpdate(cart._id, {$set:cart},{new:true});
    if(cart._id){
        return cart;
    } else {
        return cart.toJSON();
    }
    
}

async function _removeItemFromCart(cart, skuId){
    if(cart.ItemList){
        for (let index = 0; index < cart.ItemList.length; index++) {
            const element = cart.ItemList[index];
            if(element.sku===skuId){
                delete cart.ItemList[index]
                console.log(skuId + ' is removed.')
            }
        }
        cart.ItemList = cart.ItemList.filter(x => x !== null);   
    }
    if(cart._id){
        return cart;
    } else {
        return cart.toJSON();
    }
}

async function _getSkuDetails(skus){
    console.log(skus)
    return axios({
        method:'GET',
        url:config.catalog_baseurl+'/api/p/skus/details',
        data:{skus:skus}
    });
}

function _updateOrderSkuDetails(cart, skuDetails){
    if(cart.ItemList){
        cart.ItemList.forEach(ele => {
            var productImage, attributes;
            skuDetail = skuDetails.find(e=>e.id===ele.sku);
            if(skuDetail.option && skuDetail.option.length > 0){
                attributes = skuDetail.option.map(e => ({
                    name:e.name, value:e.value
                }));
                skuDetail.option.forEach(ele => {
                    if(ele.productImage){
                        productImage = ele.productImage.url
                    }
                });
            }
            ele.itemInfo={
                name:ele.sku,
                attributes:attributes,
                productImage:productImage,
                InventoryStatus: 'AH',
                Reservation_id:''
            }
        });
    }
}

async function _saveCart(cart){
    var newCart = await orderRepo.findOneAndUpdate({Order_id:cart.Order_id}, {$set:cart},{new:true, upsert:false});
    console.log(cart.Order_id)
    return newCart.toJSON();
}

function _getOrderPricing(cart, skuDetails){
    pricingEngine.runPrice(cart, skuDetails)
}

module.exports = {
    getCart:_getCart,
    addORupdateItemTocart:_addORupdateItemTocart,
    removeItemFromCart:_removeItemFromCart,
    getSkuDetails:_getSkuDetails,
    updateOrderSkuDetails:_updateOrderSkuDetails,
    getOrderPricing:_getOrderPricing,
    saveCart:_saveCart
}