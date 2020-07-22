var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var mail = require('./routes/mail')
var sms = require('./routes/sms');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('app'));

// app.post('/api/mail/sendOrderConfirmation', (req, res)=>{
//   res.status(200).json("OK")
// })
app.use('/api/mail/',mail)
app.use('/api/sms/',sms)


var server = app.listen(8082, function() {
  var host = 'localhost';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});