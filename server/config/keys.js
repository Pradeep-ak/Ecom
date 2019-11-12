
const MONGO_HOST = process.env.MONGO_SERVICE_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 27017;

module.exports = {
// mongoURI:'mongodb+srv://pkulkar4:Sape1234@ecomm-kutht.mongodb.net/test?retryWrites=true&w=majority'
// mongoURI:'mongodb://root:example@mongo:27017/ecom'
mongoURI:'mongodb://root:example@'+MONGO_HOST+':'+MONGO_PORT+'/ecom'
}