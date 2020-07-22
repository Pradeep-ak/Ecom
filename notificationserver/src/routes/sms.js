'use strict';

const express = require('express');
const axios = require('axios')
var handlebars = require('handlebars');
var config = require('../config/keys');
const router = express.Router();

router.post('/sendOrderConfirmation', (req, res) => {
//   console.log(req.body)
    var html = "Your Order {{ Orderid }} is booked in Nutri Newron Pediatrix. Track you order on +91-9972687910."
    var template = handlebars.compile(html);
    var htmlToSend = template({Orderid: req.body.order.Order_id});
    console.log('SMS : ' + htmlToSend)

    axios({
        method:'GET',
        url:config.sms_baseurl+'/smsApi.php',
        rejectUnauthorized: false,
        params:{
            from:'Pradeep',
            phone:'9972687910',
            to:req.body.order.PersonalInfo.phoneNumber,
            msg:htmlToSend
        }
    }).then(result => {return res.status(200).json(htmlToSend);})
    .catch(error => {console.error(error); return res.status(500).json('Error while sending SMS.');});;
});

module.exports = router