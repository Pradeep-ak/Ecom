const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AccountSchema = new Schema({}, { strict: false });

var Account = mongoose.model('Account', AccountSchema, 'account');

module.exports = Account;