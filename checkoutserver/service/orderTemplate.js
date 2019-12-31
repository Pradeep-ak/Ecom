function _getOrder(){
    return  {
        Order_id:'',
        Acc_id:'',
        Status:'INPROGRESS',
        // orderDetails:{
        //     createdDate:'',
        //     submittedDate:'',
        //     userAgent:'',
        //     IpAddress:''
        // }
        // ItemList:[
        //     {
        //         sku:'',
        //         qantity:0,
        //         itemInfo:{
        //             name:'',
        //             InventoryStatus:'',
        //             Reservation_id:''
        //         },
        //         priceInfo:{
        //             amount:0,
        //             discount:0,
        //             total:0
        //         }
        //     }
        // ],
        // ShippingInfo:{
        //     address:{
        //         address1:'',
        //         address2:'',
        //         city:'',
        //         state:'',
        //         country:'',
        //         pincode:''
        //         additional:'' 
        //     },
        //     shippingMethods:0,
        //     shippingDateMin:0,
        //     shippingDateMax:0,
        //     priceInfo:{
    
        //     }
        // },
        // BillingInfo:{
        //     sameAsShippingAdd : true|false,
        //     address:{
        //         address1:'',
        //         address2:'',
        //         city:'',
        //         state:'',
        //         country:'',
        //         pincode:''
        //         additional:''  
        //     }
        // },
        // PersonalInfo:{
        //     fname:'',
        //     lname:'',
        //     email:'',
        //     phoneNumber:''
        // },
        // PriceInfo:{
        //     amount:0,
        //     discount:0,
        //     coupon:{
        //         code:'',
        //         discount:0
        //     }
        // },
        // PaymentInfo:{
        //     type:'',
        //     value:0,
        //     paymentDetails:{
    
        //     }
        // }        
        // 
    };
} 

module.exports={
    getOrder:_getOrder
}