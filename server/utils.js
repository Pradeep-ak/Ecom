function Utils () {
}

function getDimMapping(val) {
    if(val==='id'){
        return 'categories';
    }
    return val;
}

Utils.prototype.getQuery = (param) => {
    query = '';
    for (let index = 0; index < Object.keys(param).length; index++) {
        const ele = Object.keys(param)[index];
        if(param[ele] instanceof Array){
            var paramVal = param[ele];
            for (let count = 0; count < paramVal.length; count++) {
                const element = paramVal[count];
                query = query + getDimMapping(ele)+':'+element+' AND '    
            }
        }else{
            query = query + getDimMapping(ele)+':'+param[ele]+' AND '    
        }
    }
    return query.slice(0, -5);
  }

Utils.prototype.addParamToQuery = (uri, param, name, value) => {
    query = '?';
    for (let index = 0; index < Object.keys(param).length; index++) {
        const ele = Object.keys(param)[index];
        if(param[ele] instanceof Array){
            var paramVal = param[ele];
            for (let count = 0; count < paramVal.length; count++) {
                const element = paramVal[count];
                console.log('param' + element)
                query = query + ele+'='+element+'&'    
            }
        }else{
            query = query + ele+'='+param[ele]+'&'    
        }
    }
    query = query + name + '=' + value
    return uri+query;
  }

  Utils.prototype.removeParamToQuery = (uri, param, name, value) => {
    query = '?';
    for (let index = 0; index < Object.keys(param).length; index++) {
        const ele = Object.keys(param)[index];
        if(param[ele] instanceof Array){
            var paramVal = param[ele];
            for (let count = 0; count < paramVal.length; count++) {
                const element = paramVal[count];
                if(name === ele && element === value){
                    continue
                } else {
                    query = query + ele+'='+element+'&'
                }   
            }
        }else{
            if(name === ele && param[ele] === value){
                continue
            } else {
                query = query + ele+'='+param[ele]+'&'
            }   
        }
    }
    query = query.slice(0, -1);
    return uri+query;
  }

Utils.prototype.isSelected = (param, name, value) => {

    for (let index = 0; index < Object.keys(param).length; index++) {
        const ele = Object.keys(param)[index];
        if(param[ele] instanceof Array){
            var paramVal = param[ele];
            for (let count = 0; count < paramVal.length; count++) {
                const element = paramVal[count];
                if(name === ele && element === value){
                    return true
                }
            }
        }else{
            if(name === ele && param[ele] === value){
                return true
            }
        }
    }
    return false;
  }

module.exports = Utils;