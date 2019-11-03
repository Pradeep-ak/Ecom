var SolrNode = require('solr-node');
 // Set logger level (can be set to DEBUG, INFO, WARN, ERROR, FATAL or OFF)
require('log4js').getLogger('solr-node').level = 'DEBUG';

class ExtendedSolr extends SolrNode{

LoadedDimVal;

loadDimensionVal(dimVal){
    var query = client. query().q('*:*').facetQuery({
        on: true,
        field:dimVal
    });
    // Search documents using strQuery
    client.search(query, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', Object.keys(result.facet_counts.facet_fields));

        });
}
}

// Create client
var client = new ExtendedSolr({
    host: 'localhost',
    port: '8983',
    core: 'product',
    protocol: 'http'
});

module.exports = client;