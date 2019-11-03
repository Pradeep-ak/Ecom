const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({}, { strict: false });
// new Schema ({
//     name:{
//         type:String,
//         require:true
//     },
//     desc:{
//         type:String,
//         require:true
//     },
//     startDate:{
//         type:Date,
//         require:true
//     },
//     endDate:{
//         type:Date,
//         require:true
//     },
//     sku:[{type: ObjectId, ref: 'Sku'}]
// });

exports.Product = mongoose.model('Product', ProductSchema, 'product');