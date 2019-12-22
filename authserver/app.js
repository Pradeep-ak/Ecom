const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/keys');
const bodyParser = require('body-parser');
const api = require('./routes/api')
const configuration = require('./config/config');


configuration.init('http://localhost:9000');
console.log(configuration.configurations())

const app = express();

mongoose
    .connect(config.mongoURI)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/au/ping',(req, res)=>{
    console.log('Auth Server');
    res.status(200).json({message:'Hello World'})
});

app.use('/api/au',api);

app.use('/api/au/config', express.static('config'))

// /// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// /// error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         log.error("Something went wrong:", err);
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     log.error("Something went wrong:", err);
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

const port = process.env.PORT || 9000;
app.listen(port, ()=> console.log('Auth Server running on port ' + port))