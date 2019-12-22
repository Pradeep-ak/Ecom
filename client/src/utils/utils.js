
class Utils{

    roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }
    convertToSlug(Text){
        return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    }

    getDimension(productJson){
        // console.log(productJson.skus)
        var dimMap = {}
        var swatchImg = {}
        productJson.skus.forEach(e => {
            if(e.option){
                e.option.forEach(y=>{
                    if(y.name === 'color'){
                        if(dimMap[y.name] == null){
                            dimMap[y.name] = [y.value]
                        } else {
                            if (dimMap[y.name].indexOf(y.value) === -1) {
                                dimMap[y.name].push(y.value)
                                //Add the Swatch Image info.
                            }
                        }
                    } else{
                        if(dimMap[y.name] == null){
                            dimMap[y.name] = [y.value]
                        } else {
                            if (dimMap[y.name].indexOf(y.value) === -1) {
                                dimMap[y.name].push(y.value)
                            }
                        }
                    }
                });
            }
        });
        // console.log(dimMap)
        return dimMap;
    }
}

export default Utils;