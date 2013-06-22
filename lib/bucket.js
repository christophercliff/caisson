var async = require('async'),
    fs = require('fs'),
    util = require('util');

var POLICY = fs.readFileSync('./assets/bucket-policy.json').toString();

var createBucketParams = function (bucket) {
    return {
        Bucket: bucket
    };
};

var putBucketRedirectParams = function (bucket, domain) {
    return {
        Bucket: bucket,
        WebsiteConfiguration: {
            RedirectAllRequestsTo: { HostName: domain }
        }
    };
};

var putBucketPolicyParams = function (bucket, domain) {
    return {
        Bucket: bucket,
        Policy: util.format(POLICY, domain)
    };
};

var putBucketWebsiteParams = function (bucket) {
    return {
        Bucket: bucket,
        WebsiteConfiguration: {
            IndexDocument: { Suffix: 'index.html' },
            ErrorDocument: { Key: '404.html' }
        }
    };
};

var create = function (options, callback) {
    
    var s3 = options.s3,
        domain = options.domain,
        bucket = (options.isRedirect ? 'www.' : '') + domain,
        series = [
            async.apply(s3.createBucket.bind(s3), createBucketParams(bucket))
        ];
    
    console.log('Creating bucket ' + bucket);
    
    if (options.isRedirect)
    {
        series = series.concat([
            async.apply(s3.putBucketWebsite.bind(s3), putBucketRedirectParams(bucket, domain))
        ]);
    }
    else
    {
        series = series.concat([
            async.apply(s3.putBucketPolicy.bind(s3), putBucketPolicyParams(bucket, domain)),
            async.apply(s3.putBucketWebsite.bind(s3), putBucketWebsiteParams(bucket))
        ]);
    }
    
    async.series(series, function(err, res){
        if (err) return callback(new Error(err));
        return callback(console.log('Created bucket ' + bucket));
    });
    
};

exports.create = create;
exports.createBucketParams = createBucketParams;
exports.putBucketRedirectParams = putBucketRedirectParams;
exports.putBucketPolicyParams = putBucketPolicyParams;
exports.putBucketWebsiteParams = putBucketWebsiteParams;