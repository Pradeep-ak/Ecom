const ShippingRepo = require('../models/shipping')
const orderRepo = require('../models/order')

_fillPersonalData = order => {
    html = ''//'Pradeep Kulkarni <br/> pradeep4jobs@gmail.com <br/> 9972687910';
    if(order.PersonalInfo){
        html += order.PersonalInfo.fname?order.PersonalInfo.fname:''
        html += order.PersonalInfo.lname?' '+order.PersonalInfo.lname:''
        html += order.PersonalInfo.email?'<br/>' + order.PersonalInfo.email:''
        html += order.PersonalInfo.phoneNumber?'<br/>' + order.PersonalInfo.phoneNumber:''
        return html;
    } else {
        return;
    }
}

_fillShippingAddress = order => {
    html = null
    if(order.ShippingInfo && order.ShippingInfo.address){
        html = order.ShippingInfo.address.address1?order.ShippingInfo.address.address1:''
        html += order.ShippingInfo.address.address2?'<br/>'+order.ShippingInfo.address.address2:''
        html += order.ShippingInfo.address.city?'<br/>'+order.ShippingInfo.address.city:''
        html += order.ShippingInfo.address.state?'<br/>'+order.ShippingInfo.address.state:''
        html += order.ShippingInfo.address.country?'<br/>'+order.ShippingInfo.address.country:''
        html += order.ShippingInfo.address.pincode?' - '+order.ShippingInfo.address.pincode:''
        html += order.ShippingInfo.address.additional?'<br/> LandMark : '+order.ShippingInfo.address.additional:''
        return html;
    } else {
        return;
    }
}

_fillBillingAddress = order => {
    html = null
    if(order.BillingInfo && order.BillingInfo.address){
        html = order.BillingInfo.address.address1?order.BillingInfo.address.address1:''
        html += order.BillingInfo.address.address2?'<br/>'+order.BillingInfo.address.address2:''
        html += order.BillingInfo.address.city?'<br/>'+order.BillingInfo.address.city:''
        html += order.BillingInfo.address.state?'<br/>'+order.BillingInfo.address.state:''
        html += order.BillingInfo.address.country?'<br/>'+order.BillingInfo.address.country:''
        html += order.BillingInfo.address.pincode?' - '+order.BillingInfo.address.pincode:''
        html += order.BillingInfo.address.additional?'<br/> LandMark : '+order.BillingInfo.address.additional:''
        return html;
    } else {
        return;
    }
}

_updateReview = order => {

    var personalFlag = order.PersonalInfo && order.PersonalInfo.PersonalDataInnerHTML && 
    order.PersonalInfo.PersonalDataInnerHTML.length > 0;

    var shippingAddrFrom = order.ShippingInfo && order.ShippingInfo.address && order.ShippingInfo.address.InnerHTML && 
    order.ShippingInfo.address.InnerHTML.length > 0;

    var shippingTypeFrom = order.ShippingInfo && order.ShippingInfo.shippingMethods;

    var billingAddrFrom = order.BillingInfo && order.BillingInfo.address && order.BillingInfo.address.InnerHTML && 
    order.BillingInfo.address.InnerHTML.length > 0;

    var paymentInfoFrom = order.PaymentInfo && order.PaymentInfo.type;

    if(!personalFlag){
        return false;
    }
    if(!shippingAddrFrom){
        return false;
    }
    if(!shippingTypeFrom){
        return false;
    }
    if(!billingAddrFrom){
        return false;
    }
    if(!paymentInfoFrom){
        return false;
    }
    return true;
}

async function _getShippingOption() {
    try{
        var shippingMethod = await ShippingRepo.find({"enable": true}).exec();
        // console.log(shippingMethod)
        var shippingLst = await shippingMethod.map(e=>{
            jsonObj = e.toJSON()
            fromdate = new Date().addDays(jsonObj.minDays).toShortFormat();
            todate = new Date().addDays(jsonObj.maxDays).toShortFormat();
            label = jsonObj.label +' ( ' +fromdate +' - '+todate+' )'
            id = jsonObj.ShippingID
            return {
                id:id,
                label:label
            }
        });
        return shippingLst;
    }catch(err){
        console.log(err)
    }
}

_fillInnerHTML = async (order) => {
    if(!order.PersonalInfo){
        order.PersonalInfo = {}
    }
    order.PersonalInfo.PersonalDataInnerHTML = _fillPersonalData(order);
    
    ShippingHTML = _fillShippingAddress(order);
    if(ShippingHTML){
        order.ShippingInfo.address.InnerHTML = ShippingHTML
    }
    
    BillingHTML = _fillBillingAddress(order);
    if(BillingHTML){
        order.BillingInfo.address.InnerHTML = BillingHTML
    }
    
    order.review = _updateReview(order);
    
    var shippingLst = await _getShippingOption();
    order.shippingOption = shippingLst;
}

_updatePersonalInfo = async (order, data) => {
    order.PersonalInfo = {
        fname:data.fname,
        lname:data.lname,
        email:data.email,
        phoneNumber:data.pnumber        
    }
}

_updateShippingAddress = async (order, data) => {
    if(!order.ShippingInfo){
        order.ShippingInfo = {}
    } 
    order.ShippingInfo.address = {
        address1:data.addr1,
        address2:data.addr2,
        city:data.city,
        state:data.state,
        country:data.country,
        pincode:data.pincode,
        additional:data.additional 
    }
}

_updateShippingType = async (order, data) => {
    if(!order.ShippingInfo){
        order.ShippingInfo = {}
    }
    order.ShippingInfo.shippingMethods = data.shippingType
}

_copyShippingToBillingAddr = (order) => {
    if(!order.BillingInfo){
        order.BillingInfo = {}
    }
    order.BillingInfo.address = {
        address1:order.ShippingInfo.address.address1,
        address2:order.ShippingInfo.address.address2,
        city:order.ShippingInfo.address.city,
        state:order.ShippingInfo.address.state,
        country:order.ShippingInfo.address.country,
        pincode:order.ShippingInfo.address.pincode,
        additional:order.ShippingInfo.address.additional 
    }
    order.BillingInfo.sameAsShippingAdd = true
}

_updateBillingAddress = (order, data) => {
    if(!order.BillingInfo){
        order.BillingInfo = {}
    } 
    order.BillingInfo.address = {
        address1:data.addr1,
        address2:data.addr2,
        city:data.city,
        state:data.state,
        country:data.country,
        pincode:data.pincode,
        additional:data.additional 
    }
    order.BillingInfo.sameAsShippingAdd = false
}

_updatePaymentInfo = (order, data) => {
    if(!order.PaymentInfo){
        order.PaymentInfo = {}
    }
    order.PaymentInfo.type = data.paymentType
}

_submitOrder = (order, userAgent, IPaddress) => {
    //Validation
    if(!order.orderDetails){
        order.orderDetails = {}
    }
    order.orderDetails.submittedDate = Math.floor(new Date() / 1000)
    order.orderDetails.userAgent = userAgent
    order.orderDetails.IpAddress = IPaddress
    order.Status = 'SUBMITTED'

}

async function _getSubmittedOrder(acc_id, orderId){
    console.log('order id : ' + orderId + ', Acc Id : ' + acc_id)
    if(orderId){
        console.log('Query the mongo.')
        var orderItem = await orderRepo.findOne({Acc_id:acc_id, Order_id: orderId, Status:'SUBMITTED'}).exec();
        console.log('Order data from DB : ' + orderItem)
        if(orderItem){
            return orderItem.toJSON();
        }
    }
    return;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.toShortFormat = function() {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    return "" + day + "-" + month_names[month_index];
}

module.exports = {
    fillInnerHTML:_fillInnerHTML,
    updatePersonalInfo:_updatePersonalInfo,
    updateShippingAddress:_updateShippingAddress,
    updateShippingType:_updateShippingType,
    copyShippingToBillingAddr:_copyShippingToBillingAddr,
    updateBillingAddress:_updateBillingAddress,
    updatePaymentInfo:_updatePaymentInfo,
    submitOrder:_submitOrder,
    getSubmittedOrder:_getSubmittedOrder
}