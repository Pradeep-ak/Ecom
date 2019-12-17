const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({}, { strict: false });

var Product = mongoose.model('Product', ProductSchema, 'product');

module.exports = Product;