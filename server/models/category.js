const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CategorySchema = new Schema({}, { strict: false });

var Category = mongoose.model('Category', CategorySchema, 'category');

module.exports = Category;
