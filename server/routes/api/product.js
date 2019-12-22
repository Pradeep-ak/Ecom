const express = require('express');
const Product = require('../../models/product');
const Sku = require('../../models/sku');
const router = express.Router();

router.get('/test',(req, res)=>res.json({msg:'Hello Test Api Working..!!!!'}))

router.get('/:seoname',async (req, res)=>{
    try{
        var prodRepo = await Product.find({id:req.query.id}).exec();
        if(prodRepo[0] != null && prodRepo[0].get('skus') != null && prodRepo[0].get('skus').length > 0){
            id = req.query.id
            name = prodRepo[0].get('name').replace('_'+id,'')
            prodRepo[0].set('name', name);
            skuRepos = []
            skus = prodRepo[0].get('skus');
            for (let index = 0; index < skus.length; index++) {
                const sku = skus[index];
                skuRepo = await Sku.findOne({'id':sku}).exec();
                skuRepos.push(skuRepo)
            }
            prodRepo[0].set('skus', skuRepos);
            prodRepo[0].get('attributes').forEach(element => {
                element.name = element.name.capitalize(true);
            });

            var attributes = prodRepo[0].get('attributes');
            var seenNames = {};
            prodRepo[0].set('attributes', attributes.filter(e => {
                if (e.name in seenNames) {
                    return false;
                } else {
                    seenNames[e.name] = true;
                    return true;
                }
            }));
        }
        res.status(200).json(prodRepo[0]);
    }catch(err){
        console.log(err)
        res.status(500).json({mess:err.message})
    }
});

router.get('/skus/details',async(req, res)=>{
    if(req.body.skus){
        skus = await Sku.find({$or:req.body.skus.map(e=>({id:e}))})
        res.status(200).json(skus.map(e=>e.toJSON()))
    }else{
        res.status(500).json("")
    }
});

module.exports=router;