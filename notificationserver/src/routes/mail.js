// 'use strict';

const express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
var handlebars = require('handlebars');
var config = require('../config/keys');
const router = express.Router();

var templatesDir = path.resolve(__dirname, config.mailTemplateDir);

var fs = require('fs');

var readHTMLFile = (path, callback) => {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
    }
    else {
      return callback(null, html);
    }
  });
};


router.post('/sendOrderConfirmation', (req, res) => {
  
    readHTMLFile(path.join(templatesDir, 'orderConfirmation/email.html'), function (err, html) {
        var template = handlebars.compile(html);
        var paymentInfo = req.body.order.PaymentInfo;
        var replacements = {
            email: config.from,
            userInfo:req.body.order.PersonalInfo,
            OrderId: req.body.order.Order_id,
            shipto: req.body.order.ShippingInfo.address,
            billedto: req.body.order.BillingInfo.address,
            priceInfo: req.body.order.PriceInfo,
            amountPaid: paymentInfo.amount/100,
            items: req.body.order.ItemList,
            site_link: config.server
        };
        var htmlToSend = template(replacements);

        var img = require("fs").readFileSync('/usr/src/prescription/' + req.body.order.PrescriptionDetails.fileName);
        var subToSend = (handlebars.compile(config.orderConfrimationSubject))({orderid:req.body.order.Order_id});
              var mailOptions = {
                  from: config.from,
                  to : req.body.order.PersonalInfo.email,
                  bcc : 'pradeep4jobs@gmail.com',
                  subject : subToSend,
                  html : htmlToSend,
                  attachments: [{
                    'filename': "Prescription.jpeg",
                    'contents': img
                  }]
               };

// nodemailer
var smtpTransport = nodemailer.createTransport('SMTP', {
  host: config.SMTPTransportHostname,
  secure: false,
  port: config.SMTPTransportPort,
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  },
  logger: true,
  debug: true
});

               //console.log(mailOptions)
              smtpTransport.sendMail(mailOptions, (error, response)=> {
                  if (error) {
                    console.log(' Error while sending Mail to : ' + req.body.order.Order_id + ', to - ' + req.body.order.PersonalInfo.email)  
                    console.log(error);
                    //   callback(error);
                  } else {
                        console.log('Mail sending to : ' + req.body.order.Order_id + ', to - ' + req.body.order.PersonalInfo.email)
                        res.status(200).json({msg:response.message});
                    }
		smtpTransport.close();
              });
          });
});

module.exports = router
