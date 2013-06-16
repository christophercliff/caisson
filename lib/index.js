var async = require('async'),
    bucket = require('./bucket'),
    dns = require('./dns'),
    cdn = require('./cdn');

exports.init = function (options, callback) {
    
    var domain = options.domain,
        awsConfig = options.awsConfig;
    
    async.parallel([
        async.apply(bucket, {
            domain: domain,
            awsConfig: awsConfig
        }),
        async.apply(bucket, {
            domain: 'www.' + domain,
            awsConfig: awsConfig,
            isRedirect: true
        }),
        async.apply(dns, {
            domain: domain,
            awsConfig: awsConfig
        }),
        async.apply(cdn, {
            domain: domain,
            awsConfig: awsConfig
        })
    ], function(err, res){
        if (err) return callback(err);
        return callback();
    });
};

exports.deploy = function () {
    
    
    
};