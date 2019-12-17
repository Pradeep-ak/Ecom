const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TokenSchema = new Schema({}, { strict: false });

var Tokens = mongoose.model('Tokens', TokenSchema, 'tokens');

module.exports = Tokens;