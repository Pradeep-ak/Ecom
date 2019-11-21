solr = require('solr-node');

solr.Query.prototype.qf = function (params) {
        var self = this;
        var i, len;
        for (i = 0, len = params.length; i < len; i++) {
          self.params.push('qf=' + encodeURIComponent(params[i].value));
        }
        return self;
    };
    
solr.Query.prototype.mm = function (count) {
        var self = this;
        self.params.push('mm=' + encodeURIComponent(count));
        return self;
    };

module.exports = Query;
