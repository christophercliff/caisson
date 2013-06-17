var async = require('async'),
    AWS = require('aws'),
    bucket = require('./bucket'),
    dns = require('./dns'),
    cdn = require('./cdn');

exports.init = function (options, callback) {
    
    var domain = options.domain,
        s3,
        route53,
        cloudfront;
    
    AWS.config.update(options.awsConfig);
    
    s3 = new AWS.S3();
    route53 = new AWS.Route53();
    cloudfront = new AWS.CloudFront();
    
    async.parallel([
        async.apply(bucket, {
            domain: domain,
            s3: s3
        }),
        async.apply(bucket, {
            domain: domain,
            s3: s3,
            isRedirect: true
        }),
        async.apply(dns, {
            domain: domain,
            route53: route53
        }),
        async.apply(cdn, {
            domain: domain,
            cloudfront: cloudfront
        })
    ], function(err, res){
        if (err) return callback(err);
        return callback();
    });
};

exports.deploy = function () {
    
    
    
};