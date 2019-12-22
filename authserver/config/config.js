const axios = require('axios')

var configData={};
class config {
    async init(baseUrl) {
        var resp = await axios.get(baseUrl+'/api/au/config/config.json');
        console.log(resp && resp.status==200)
        if(resp && resp.status==200){
            console.log(resp.data)
            this.configData = resp.data
        }
    }

    configurations() {
        return this.configData;
    }
}
module.exports = new config()