const axios = require('axios')

class config {
    init(baseUrl) {
        this.baseUrl=baseUrl;    
    }

    async loadConfig(){
        var resp = await axios.get(this.baseUrl+'/api/au/config/config.json');
        console.log(resp && resp.status==200)
        if(resp && resp.status==200){
            console.log(resp.data)
            this.configData = resp.data
        }
    }
     configurations() {
        if (this.configData === undefined){
            this.loadConfig()
        }
        return this.configData;
    }
}
module.exports = config