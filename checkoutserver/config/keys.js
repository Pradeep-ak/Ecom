
const MONGO_HOST = process.env.MONGO_SERVICE_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 27017;
const JWT_KEY = process.env.JWT_KEY || 'Ecom-AuthJWT@2019';

module.exports = {
mongoURI:'mongodb://root:example@'+MONGO_HOST+':'+MONGO_PORT+'/ecomorder',
JWTSecertKey:JWT_KEY
}