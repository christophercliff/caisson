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

var getBucketOutput = function (options) {
    return {
        s3: {
            bucket: options.domain,
            endpoint: options.domain
        }
    };
};

var create = function (options, callback) {
    
    var s3 = options.s3,
        domain = options.domain,
        bucket = (options.isRedirect ? 'www.' : '') + domain,
        series = [
            async.apply(s3.createBucket.bind(s3), createBucketParams(bucket))
        ],
        output = getBucketOutput(options);
    
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
    
    getOrCreateBucket(options, function(err, res){
        if (err) return callback(new Error(err));
        if (res.Bucket) return callback(console.log('Bucket ' + bucket + ' already exists'), output);
        async.series(series, function(err, res){
            if (err) return callback(new Error(err));
            return callback(console.log('Created bucket ' + bucket), output);
        });
    });
    
};

exports.create = create;
exports.createBucketParams = createBucketParams;
exports.putBucketRedirectParams = putBucketRedirectParams;
exports.putBucketPolicyParams = putBucketPolicyParams;
exports.putBucketWebsiteParams = putBucketWebsiteParams;
exports.getBucketOutput = getBucketOutput;