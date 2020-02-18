const orderRepo = require('../models/order')

_getOrder = (orderId, emailID, telNum) => {
    // console.log({
    //     "Status" : { $in: ["SUBMITTED","CONFIRMED"] },
    //     "Order_id" : orderId,
    //     "PersonalInfo.email" : {"$eq" : emailID, "$exists" : true},
    //     "PersonalInfo.phoneNumber" : {"$eq" : telNum, "$exists" : true}
    // })
    return orderRepo.findOne(
        {
            "Status" : { $in: ["SUBMITTED","CONFIRMED"] },
            "Order_id" : orderId,
            "PersonalInfo.email" : {"$eq" : emailID, "$exists" : true},
            "PersonalInfo.phoneNumber" : {"$eq" : telNum, "$exists" : true}
        }
    )
}


module.exports = {
    getOrder:_getOrder
}