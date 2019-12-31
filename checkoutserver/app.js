const express = require('express');
const mongoose = require('mongoose');
let middleware = require('./utils/middleware');
const bodyParser = require('body-parser');
const orderApi = require('./routes/orderApi')
const checkoutApi = require('./routes/checkoutApi')
const ShippingRepo = require('./models/shipping')
var shippingMethodRepo = require('./config/shippingMethods.json')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./config/keys').mongoURI

//config.init('http://authserver:9000');

mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));


app.get('/api/o/ping',(req, res)=>{
    console.log('Checkout Server');
    res.status(200).json({message:'CS.Hello World'})
});

app.use('/api/o/checkout/',middleware.checkToken,checkoutApi);
app.use('/api/o/',middleware.checkToken,orderApi);

app.post('/api/config/loadShippingMethod', (req, res)=>{
    ShippingRepo.create(shippingMethodRepo)
    res.status(201).json({msg:'Created the Shipping Methods.'})
});


/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         console.error("Something went wrong:", err);
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     console.error("Something went wrong:", err);
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log('Checkout Server running on port ' + port))