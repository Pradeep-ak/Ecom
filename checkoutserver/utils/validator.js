const axios = require('axios')

_validatedPincode = async (pincode) => {
    console.log('Validate the pincode')
    url = `http://www.postalpincode.in/api/pincode/${pincode}`;
    await axios.get(url).then(res=>{
        if(res.data.Status==='Error'){
            console.error('Failed the pincode validation.')
            return false;        
        }
    }).catch(err=>{
        console.error(err.message);
    });
    return true;
}

module.exports = {
    validatedPincode:_validatedPincode
}