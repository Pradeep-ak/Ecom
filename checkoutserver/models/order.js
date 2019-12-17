const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({}, { strict: false });

var Order = mongoose.model('Order', OrderSchema, 'order');

module.exports = Order;