const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ShippingSchema = new Schema({}, { strict: false });

var Shipping = mongoose.model('Shipping', ShippingSchema, 'shipping');

module.exports = Shipping;