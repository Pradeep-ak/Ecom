
const MONGO_HOST = process.env.MONGO_SERVICE_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 27017;
const JWT_KEY = process.env.JWT_KEY || 'Ecom-AuthJWT@2019';
const CATALOG_HOST = process.env.CATALOG_SERVICE_HOST || 'node';
const CATALOG_PORT = process.env.CATALOG_SERVICE_PORT || 5000;

module.exports = {
// mongoURI:'mongodb://root:example@'+MONGO_HOST+':'+MONGO_PORT+'/ecomorder',
mongoURI:'mongodb+srv://root:example@cluster0.y8ksr.gcp.mongodb.net/jecomorder?retryWrites=true&w=majority',
JWTSecertKey:JWT_KEY,
catalog_baseurl:'http://'+CATALOG_HOST+':'+CATALOG_PORT
}