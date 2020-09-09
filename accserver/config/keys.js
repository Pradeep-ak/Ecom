
const MONGO_HOST = process.env.MONGO_SERVICE_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 27017;
const AUTH_HOST = process.env.AUTH_SERVICE_HOST || 'localhost';
const AUTH_PORT = process.env.AUTH_SERVICE_PORT || 9000;
const JWT_KEY = process.env.JWT_KEY || 'Ecom-AuthJWT@2019';

module.exports = {
// mongoURI:'mongodb://root:example@'+MONGO_HOST+':'+MONGO_PORT+'/ecomaccount',
mongoURI:'mongodb+srv://root:example@cluster0.y8ksr.gcp.mongodb.net/jecomaccount?retryWrites=true&w=majority',
authURI:'http://'+AUTH_HOST+':'+AUTH_PORT,
JWTSecertKey:JWT_KEY
}