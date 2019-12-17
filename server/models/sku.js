const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SkuSchema = new Schema({}, { strict: false });

var sku = mongoose.model('Sku', SkuSchema, 'sku');

module.exports = sku;