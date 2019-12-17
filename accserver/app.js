const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes/api');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./config/keys').mongoURI

mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));


app.get('/api/a/ping',(req, res)=>{
    console.log('Account Server');
    res.status(200).json({message:'Account Server: Hello World'})
});

app.use('/api/a', api)

const port = process.env.PORT || 7000;
app.listen(port, ()=> console.log('Account Server running on port ' + port))