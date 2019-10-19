const express = require('express');
const mongoose = require('mongoose');

const home = require('./routes/api/home');
//const department = require('./routes/api/department');
//const category = require('./routes/api/category');

const app = express();

const db = require('./config/keys').mongoURI
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));

app.get('/',(req, res)=>res.send('Hello World'))

app.use('/api/home',home);
//app.use('/api/d',department);
//app.use('/api/c',category);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log('Server running on port ' + port))