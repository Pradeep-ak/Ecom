const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ContentSchema = new Schema({}, { strict: false });
// new Schema({
//   id:{
//       type:Number,
//       require:true
//     },
//     type:{
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
//     slot:{
//         type:Number,
//         require:true
//     },
//     html:{
//         type:String,
//         require:false
//     }
// })

exports.Content = mongoose.model('Content', ContentSchema, 'content');