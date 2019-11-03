const express = require('express');
const Department = require('../../models/department');
const Category = require('../../models/category');

const router = express.Router();

router.get('/:name', async (req, res)=>{
    try{
        var dept = await Department.find({name:req.params.name}).exec();
        catLst = dept[0].get('categories');
        catResult = [
            { 
                index:0,
                name:'Categories',
                link: false,
            }
        ]
        for (let index = 0, j=1; index < catLst.length; index++) {
            const element = catLst[index];
            if(element.toLowerCase().startsWith('dept')){
                continue
            }
            cat = await Category.find({id:element})
            if(cat[0]!= null) {
                catName = cat[0].get('name');
                catResult[j]= {
                    index:j,
                    name: cat[0].get('name'),
                    link: true,
                    href: '/c/' + req.params.name+'/'+catName.replace(/[^a-zA-Z]/g, "")+'?id='+element
                }
                j++;
            }
        }
        var response = {
            Department:dept[0].get('name'),
            h1tag:dept[0].get('h1tag'),
            Categories:catResult
        }
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({mess:err.message})
    }
});

// router.get('/',(req, res) => res.json());

    
module.exports=router;