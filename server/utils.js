
function Utils () {
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

Array.prototype.pushArray = function(arr) {
    this.push.apply(this, arr);
};

Utils.prototype.getQf = function (params) {
    returnArr = [];
    var i, len;
    for (i = 0, len = params.length; i < len; i++) {
        returnArr.push( {
            'field' : 'qf',
            'value' : params[i]
        });
    }
    return returnArr;
};
Utils.prototype.getMM = function (params) {
    return [{
            'field' : 'mm',
            'value' : params
        }];
};
Utils.prototype.getSort = function (params) {
    return [{
            'field' : 'sort',
            'value' : 'termfreq(name, "'+params+'")desc'
        }];
};

Utils.prototype.getFq = function (params) {
    returnArr = [];
    var i, len;
    query = '';
    for (let index = 0; index < Object.keys(params).length; index++) {
        const ele = Object.keys(params)[index];
        if (ele === 'searchTerm')
            continue;

        if(params[ele] instanceof Array){
            var paramVal = params[ele];
            for (let count = 0; count < paramVal.length; count++) {
                const element = paramVal[count];
                returnArr.push({
                    'field' : 'fq',
                    'value' : getDimMapping(ele)+':'+element
                });
            }
        }else{
            returnArr.push({
                'field' : 'fq',
                'value' : getDimMapping(ele)+':'+params[ele]
            });    
        }
    }
    return returnArr;
};

function getDimMapping(val) {
    if(val==='id'){
        return 'categories';
    }
    return val;
};

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
  };

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
  };

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
  };

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
  };

Utils.prototype.convertToSlug = (Text) => {
return Text
    .toLowerCase().trim()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
};

module.exports = Utils;