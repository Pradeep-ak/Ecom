

function _getItemPrice(sku_id, quantity,skuDetails){
    console.log('Item Engine : ' + sku_id)
    skuDetail = skuDetails.find(e=>e.id===sku_id);

    price = skuDetail.price.amounts.find(e=>e.type==='ORIGINAL');    
    price_current = skuDetail.price.amounts.find(e=>e.type==='CLEARANCE');
    if(price_current === undefined){
        price_current = skuDetail.price.amounts.find(e=>e.type==='SALE');
    }
    if(price_current === undefined){
        price_current = price
    }
    
    return {
        eachItemPrice:price_current.max,
        priceType:price_current.type,
        savingamount:price.max-price_current.max,
        totalItemPrice:(price_current.max * quantity),
        totalSaving:((price.max-price_current.max) * quantity),
        discountPrice:0
    }
}

function _price(ItemList, skuDetails){
    if(ItemList && skuDetails){
        for (let index = 0; index < ItemList.length; index++) {
            console.log('Calc price for item '+ItemList[index].sku)
            var item = ItemList[index];
            skuDetail = skuDetails.find(e=>e.id===item.sku);
            priceInfo = _getItemPrice(item.sku, item.quantity, skuDetails)
            item.priceInfo = priceInfo
        }
    }
}

module.exports = {
    price:_price
}