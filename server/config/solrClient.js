var SolrNode = require('solr-node');
 // Set logger level (can be set to DEBUG, INFO, WARN, ERROR, FATAL or OFF)
require('log4js').getLogger('solr-node').level = 'DEBUG';

class ExtendedSolr extends SolrNode{

async loadDimensionVal () {
    var brand, color, productType, itemType;

    var query = client.query().q('*:*').facetQuery({
        on: true,
        field:['brand','color','PRODUCT_TYPE','ITEM_TYPE']
    });

    // Search documents using strQuery
    const result = await client.search(query);

    // console.log('Response:', Object.keys(result.facet_counts.facet_fields));
    for (let index = 0; index < Object.keys(result.facet_counts.facet_fields).length; index++) {
        const element = Object.keys(result.facet_counts.facet_fields)[index];
        if(element === 'brand'){
            brand = result.facet_counts.facet_fields.brand.filter((e,i)=>{
                return (i%2)===0
            }).map(y=>{
                return y.split("_").join(' ').trim()
            })
        } else if(element === 'color'){
            color = result.facet_counts.facet_fields.color.filter((e,i)=>{
                return (i%2)===0
            }).map(y=>{
                return y.split("_").join(' ').trim()
            })
        }else if(element === 'PRODUCT_TYPE'){
            productType = result.facet_counts.facet_fields.PRODUCT_TYPE.filter((e,i)=>{
                return (i%2)===0
            }).map(y=>{
                return y.split("_").join(' ').trim()
            })
        }else if(element === 'ITEM_TYPE'){
            itemType = result.facet_counts.facet_fields.ITEM_TYPE.filter((e,i)=>{
                return (i%2)===0
            }).map(y=>{
                return y.split("_").join(' ').trim()
            })
        }
    }
    var value = {brand,color,productType,itemType}
    // console.log(value)
    return value
    }
}



const SOLR_HOST = process.env.SOLR_SERVICE_HOST || 'localhost';
const SOLR_PORT = process.env.SOLR_SERVICE_PORT || 8983;

// Create client
var client = new ExtendedSolr({
    // host: 'solr',
    host: SOLR_HOST,
    port: SOLR_PORT,
    core: 'product',
    protocol: 'http'
});

module.exports = client;