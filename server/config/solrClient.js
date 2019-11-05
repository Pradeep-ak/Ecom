var SolrNode = require('solr-node');
 // Set logger level (can be set to DEBUG, INFO, WARN, ERROR, FATAL or OFF)
require('log4js').getLogger('solr-node').level = 'DEBUG';

class ExtendedSolr extends SolrNode{

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

const SOLR_HOST = process.env.SOLR_HOST || 'localhost';
const SOLR_PORT = process.env.SOLR_PORT || 8983;

// Create client
var client = new ExtendedSolr({
    // host: 'solr',
    host: SOLR_HOST,
    port: SOLR_PORT,
    core: 'product',
    protocol: 'http'
});

module.exports = client;