const express = require('express');

const router = express.Router();

router.get('/test/',(req, res)=>res.json({msg:'Hello Test Api Working..!!!!'}))

router.get('/',(req, res)=>res.json(
    {
        slots:[
            {
                id:1,
                html:'<div style="width:200px"></div>'
            },{
                id:2,
                html:'<div style="width:200px"></div>'
            }
        ]
    }));

    
module.exports=router;

