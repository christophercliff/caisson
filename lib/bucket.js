var async = require('async'),
    fs = require('fs'),
    util = require('util'),
    errors = require('./errors');

var POLICY = fs.readFileSync('./assets/bucket-policy.json').toString();

module.exports = exports = function (options, callback) {
    
    var s3 = options.s3,
        domain = options.domain,
        bucket = (options.isRedirect ? 'www.' : '') + domain,
        series = [
            async.apply(s3.createBucket.bind(s3), {
                Bucket: bucket
            })
        ];
    
    if (options.isRedirect)
    {
        series = series.concat([
            async.apply(s3.putBucketWebsite.bind(s3), {
                Bucket: bucket,
                WebsiteConfiguration: {
                    RedirectAllRequestsTo: { HostName: domain }
                }
            })
        ]);
    }
    else
    {
        series = series.concat([
            async.apply(s3.putBucketPolicy.bind(s3), {
                Bucket: bucket,
                Policy: util.format(POLICY, domain)
            }),
            async.apply(s3.putBucketWebsite.bind(s3), {
                Bucket: bucket,
                WebsiteConfiguration: {
                    IndexDocument: { Suffix: 'index.html' }
                }
            })
        ]);
    }
    
    async.series(series, function(err, res){
        if (err) return callback(new errors.BucketError(err));
        callback();
    });
    
};