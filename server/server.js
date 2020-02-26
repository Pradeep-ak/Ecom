const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const client = require('./config/solrClient')

const home = require('./routes/api/home');
const department = require('./routes/api/department');
const category = require('./routes/api/category');
const search = require('./routes/api/search');
const product = require('./routes/api/product');
const proxy = require('./routes/api/proxy');

const app = express();

const db = require('./config/keys').mongoURI

mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));

client.loadDimensionVal().then(e=>{
    app.set("solr_dim_set", e);    
})

app.set("json spaces", 2);
app.use(bodyParser.json());

// simple logger for this router's requests
// all requests to this router will first hit this middleware
app.use(function (req, res, next) {
    console.log(req.method, req.url)
    next()
  })

app.get('/api/h/createconnection',(req, res)=>{

    mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e))
    res.send('Hello World')
})

app.use('/api/h',home);
app.use('/api/d',department);
app.use('/api/c',category);
app.use('/api/s',search);
app.use('/api/p',product);

app.use('/api/',proxy);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        log.error("Something went wrong:", err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    log.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log('Server running on port ' + port))