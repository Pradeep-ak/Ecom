
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
    // return params.split(" ").map(e=>{
    //     return {
    //         'field' : 'sort',
    //         'value' : 'termfreq(name, "'+e+'")desc'
    //     }
    // })
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
        if (ele === 'searchTerm' || ele === 'pg')
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

Utils.prototype.getBoostQuery = function(searchQuery, boostDimVal){
    returnArr = [];
    for(var attributename in boostDimVal){
        // console.log(attributename)
        switch(attributename){
            case 'brand':
                boostQ = boostDimVal[attributename].filter(e=>{
                    //console.log(searchQuery.toLowerCase() + ' = ' + e.toLowerCase() + ' | ' + searchQuery.toLowerCase().includes(e.toLowerCase()))
                    return searchQuery.toLowerCase().includes(e.toLowerCase())
                }).map(y=>{
                    // console.log("y => " + y)
                    return "brand:\""+y+"\""+"^3";
                });
                returnArr.pushArray(boostQ);
                continue;
            case 'color':
                boostQ = boostDimVal[attributename].filter(e=>{
                    //console.log(searchQuery.toLowerCase() + ' = ' + e.toLowerCase() + ' | ' + searchQuery.toLowerCase().includes(e.toLowerCase()))
                    return searchQuery.toLowerCase().includes(e.toLowerCase())
                }).map(y=>{
                    // console.log("y => " + y)
                    return "color:\""+y+"\""+"^2";
                });
                returnArr.pushArray(boostQ);
                continue;
            case 'productType':
                boostQ = boostDimVal[attributename].filter(e=>{
                    //console.log(searchQuery.toLowerCase() + ' = ' + e.toLowerCase() + ' | ' + searchQuery.toLowerCase().includes(e.toLowerCase()))
                    return searchQuery.toLowerCase().includes(e.toLowerCase())
                }).map(y=>{
                    // console.log("y => " + y)
                    return  "PRODUCT_TYPE:\""+y+"\""+"^20";
                });
                returnArr.pushArray(boostQ);
                continue;
            case 'itemType':
                boostQ = boostDimVal[attributename].filter(e=>{
                    //console.log(searchQuery.toLowerCase() + ' = ' + e.toLowerCase() + ' | ' + searchQuery.toLowerCase().includes(e.toLowerCase()))
                    return searchQuery.toLowerCase().includes(e.toLowerCase())
                }).map(y=>{
                    // console.log("y => " + y)
                    return  "ITEM_TYPE:\""+y+"\""+"^20";
                });
                returnArr.pushArray(boostQ);
                continue;
        }
    }
    // console.log(returnArr.join(' '));
    return {
        'field' : 'bq',
        'value' : returnArr.join(' ')
    }
    
}

function getDimMapping(val) {
    if(val==='id'){
        return 'categories';
    }
    return val;
};
//It's used in catgeory page to get the Solr Query.
Utils.prototype.getQuery = (param) => {
    query = '';
    for (let index = 0; index < Object.keys(param).length; index++) {
        const ele = Object.keys(param)[index];
        if (ele === 'searchTerm' || ele === 'pg')
            continue;
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

//It is used to construct the URL for Dim values.
Utils.prototype.addParamToQuery = (uri, param, name, value) => {
    query = '?';
    for (let index = 0; index < Object.keys(param).length; index++) {
        const ele = Object.keys(param)[index];
        //Skip the pagation param from Dim selection URL
        if (ele === 'pg')
            continue;

        if(param[ele] instanceof Array){
            var paramVal = param[ele];
            for (let count = 0; count < paramVal.length; count++) {
                const element = paramVal[count];
                // console.log('param' + element)
                query = query + ele+'='+element+'&'    
            }
        }else{
            query = query + ele+'='+param[ele]+'&'    
        }
    }
    if(name != null){
        query = query + name + '=' + value
    }else{
        query = query.slice(0, -1);
    }
    return uri+query;
  };

  Utils.prototype.removeParamToQuery = (uri, param, name, value) => {
    query = '?';
    for (let index = 0; index < Object.keys(param).length; index++) {
        const ele = Object.keys(param)[index];

        //Skip the pagation param from Dim selection URL
        if (ele === 'pg')
            continue;

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

Utils.prototype.previousPage = (currentPage) => {
    return (currentPage>1)?currentPage-1:undefined
}
Utils.prototype.previousPageUrl = (currentPage, uri, param) => {
    return (currentPage>1)? new Utils().addParamToQuery(uri, param, 'pg', (currentPage-1)) : undefined
}
Utils.prototype.nextPage = (currentPage, TotalProduct, eachPageCount) => {
    var maxPage = Math.floor(TotalProduct/eachPageCount);
    if(Math.floor(TotalProduct%eachPageCount)!=0){
        maxPage++;
    }
    return (currentPage<maxPage)?currentPage+1:undefined
}
Utils.prototype.nextPageUrl = (currentPage, TotalProduct, eachPageCount, uri, param) => {
    var maxPage = Math.floor(TotalProduct/eachPageCount);
    if(Math.floor(TotalProduct%eachPageCount)!=0){
        maxPage++;
    }
    return (currentPage<maxPage)? new Utils().addParamToQuery(uri, param, 'pg', (currentPage+1)) : undefined
}
Utils.prototype.totalPage = (currentPage, TotalProduct, eachPageCount) => {
    var maxPage = Math.floor(TotalProduct/eachPageCount);
    return maxPage+1
}

Utils.prototype.convertToSlug = (Text) => {
return Text
    .toLowerCase().trim()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
};

module.exports = Utils;