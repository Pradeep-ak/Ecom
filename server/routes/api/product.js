const express = require('express');
const Product = require('../../models/product');
// const Sku = require('../../models/sku');
const catalogrepo = require('../dao/catalogRepo')
const router = express.Router();

router.get('/test',(req, res)=>res.json({msg:'Hello Test Api Working..!!!!'}))

router.get('/:seoname',async (req, res)=>{
    try{
        var prodRepo = await catalogrepo.getproduct(req.query.id) //Product.find({id:req.query.id}).exec();//
        //prodRepo = prod[0].toJSON();
        if(prodRepo != null && prodRepo['skus'] != null && prodRepo['skus'].length > 0){
            id = req.query.id
            name = prodRepo['name'].replace('_'+id,'')
            prodRepo['name']= name;
            var skuRepos = []
            skus = prodRepo['skus'];
            if(skus && skus.length > 0){
                for (let index = 0; index < skus.length; index++) {
                    let sku = await catalogrepo.getsku(skus[index])
                    skuRepos.push(sku)
                }
                // skuRepos = await Promise.all(skus.map(e=>Sku.find({id:e}))).then(val => {                        
                //         return val.map(e=>e[0]);
                // });
            }
            prodRepo['skus']= skuRepos;
            prodRepo['attributes'].forEach(element => {
                element.name = element.name.capitalize(true);
            });

            var attributes = prodRepo['attributes'];
            var seenNames = {};
            prodRepo['attributes'] = attributes.filter(e => {
                if (e.name in seenNames) {
                    return false;
                } else {
                    seenNames[e.name] = true;
                    return true;
                }
            });
        }
        res.status(200).json(prodRepo);
    }catch(err){
        console.log(err)
        res.status(500).json({mess:err.message})
    }
});

router.get('/skus/details',async(req, res)=>{
    if(req.body.skus){
        // skus = await Sku.find({$or:req.body.skus.map(e=>({id:e}))})
        var skuRepos = []
        for (let index = 0; index < req.body.skus.length; index++) {
            let sku = await catalogrepo.getsku(req.body.skus[index])
            skuRepos.push(sku)
        }
        res.status(200).json(skuRepos)
    }else{
        res.status(500).json("")
    }
});

module.exports=router;