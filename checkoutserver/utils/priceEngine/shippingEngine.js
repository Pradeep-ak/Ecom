const ShippingRepo = require('../../models/shipping')


function _getShippingPrice(shippingMethodsRepo){
    if(shippingMethodsRepo){
        return {
            eachPrice:shippingMethodsRepo.price,
            priceType:'ShippingType',
            savingamount:0,
            totalPrice:shippingMethodsRepo.price,
            totalSaving:0,
            discountPrice:0
        }
    }
}
async function _getShippingMethods(shippingMethodId){
    try{
        var shippingMethod = await ShippingRepo.find({"ShippingID": shippingMethodId}).exec();
        if (shippingMethod){
            console.log(shippingMethod)
            return shippingMethod[0].toJSON()   
        }
    }catch(err){
        console.log(err)
    }
}

async function _price(ShippingInfo){
    if(ShippingInfo){
        console.log('Calc price for Shipping.')
        var shippingMethodsRepo= await _getShippingMethods(ShippingInfo.shippingMethods);
        console.log('Fetchinh Option is completed.')
        priceInfo = _getShippingPrice(shippingMethodsRepo)
        ShippingInfo.priceInfo = priceInfo
        console.log('Calc price for Shipping is completed')
    }
    return ShippingInfo;
}

module.exports = {
    price:_price
}