const mongoose = require('mongoose');
require('log4js').getLogger('mongoose').level = 'DEBUG';
const DepartmentSchema = new mongoose.Schema({}, { strict: false });

var Department = mongoose.model('Department', DepartmentSchema, 'department');

module.exports = Department;