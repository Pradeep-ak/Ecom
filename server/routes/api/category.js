const express = require('express');
const Category = require('../../models/category');
const client = require('../../config/solrClient')
const Utils = require('../../utils')

const router = express.Router();

router.get('/:dept/:seoName', async (req, res)=>{
    try{
        var catRepo = await Category.find({id:req.query.id}).exec();
        currentPage = 1;
        currentPage = req.query.pg === undefined ? currentPage:parseInt(req.query.pg);

        var query = client.query().q(new Utils().getQuery(req.query))
        .start((currentPage-1)*24).rows(24).facetQuery({
            on: true,
            field:['brand','color','size','ITEM_TYPE','PRODUCT_TYPE','price_type']
        });

        ProductCount = 0;
        products = []
        try {
            const result = await client.search(query);
            //console.log('Response:', result);
            ProductCount = result.response.numFound;
            products = result.response.docs.map((e,i) => {
                //console.log('Response:', e);
                var IsPirce = false
                var Maxprice = 'Click to check price'
                var Minprice = 'Click to check price'
                var Marketinglabel = ''
                if(e.price_type != null){
                    IsPirce = true
                    Maxprice = (e.price_type[0]=='SALE'?e.S_price[0]:e.price_type=='CLEARANCE'?e.C_price[0]:e.O_price[0]);
                    Minprice = (e.price_type[0]=='SALE'?e.S_price[0]:e.price_type=='CLEARANCE'?e.C_price[0]:e.O_price[0]);
                    Marketinglabel = e.price_type[0];
                }
                return {
                    index:i,
                    id:e.id,
                    Name:e.name[0].replace('_'+e.id,''),
                    PrimImg:{
                        link:'https://s7d4.scene7.com/is/image/JCPenney/'+e.image[0]+'?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2',
                        alttxt:e.name[0].replace('_'+e.id,'')
                    },
                    skuImg:[],
                    IsPirce: IsPirce,
                    Maxprice:Maxprice,
                    Minprice:Minprice,
                    Marketinglabel:Marketinglabel,
                    productLink:'/p/'+new Utils().convertToSlug(e.name[0].replace('_'+e.id,''))+'?id='+e.id
                }
            });

            keys = Object.keys(result.facet_counts.facet_fields);
            dim =[]
            for (let index = 0, k=0; index < Object.keys(result.facet_counts.facet_fields).length; index++) {
                dimName = Object.keys(result.facet_counts.facet_fields)[index];
                dimVal = []
                //console.log(result.facet_counts.facet_fields['brand'])
                dimArr = result.facet_counts.facet_fields[dimName];
                
                for (let j = 0, i=0; j < dimArr.length; j++) {
                    if(dimArr[j+1] > 0){
                        var selected = new Utils().isSelected(req.query, dimName, dimArr[j])
                        url = '#'
                        if(selected){
                            url = new Utils().removeParamToQuery('/c/'+req.params.dept+'/'+req.params.seoName, req.query, dimName, dimArr[j])
                        } else {
                            url = new Utils().addParamToQuery('/c/'+req.params.dept+'/'+req.params.seoName, req.query, dimName, dimArr[j])
                        }
                        dimVal[i]={ 
                            label:dimArr[j].replace('_', ' ').toLowerCase(),
                            selected:selected,
                            count:dimArr[j+1],
                            url: url
                        }
                        i++;
                    }
                    j++;   
                }
                if(dimVal.length == 0){
                    continue
                }

                dim[k]={
                    'index':k,
                    'dimName':dimName.replace('_', ' ').toLowerCase(),
                    'dimVal':dimVal
                } 
                k++;               
            }

            //console.log(dim)
         } catch(e) {
            console.error(e);
        }

        var response = {
            sort:'Featured',
            sortOption:[
                'Featured',
                'Arrivals',
                'Best Sellers',
                'Price L-H',
                'Price H-L',
                'Rating H-L'
            ],
            Department:req.params.dept,
            CategoryName:catRepo[0].get('name'),
            ProductCount:ProductCount,
            Products:products,
            Dim:dim
        }
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({mess:err.message})
    }
});

// router.get('/',(req, res) => res.json());

module.exports=router;