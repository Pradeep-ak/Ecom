const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DepartmentSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    uri:{
        type:String,
        required:true
    },
    seo:[seoItemsSchema],
    categories:[{type: ObjectId, ref: 'Category'}]

});
var seoItemsSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    html:{
        type:String,
        required:false
    }
});

exports.Department = mongoose.model('Department', DepartmentSchema);