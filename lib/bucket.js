var async = require('async'),
    path = require('path'),
    _ = require('underscore'),
    fs = require('fs'),
    util = require('util');

var POLICY = fs.readFileSync(path.resolve(__dirname, '../assets/bucket-policy.json')).toString();

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

var getOrCreateBucket = function (s3, bucket, callback) {
    s3.listBuckets(function(err, res){
        if (err) return callback(err);
        if (_.findWhere(res.Buckets, { Name: bucket })) return callback();
        s3.createBucket(createBucketParams(bucket), callback);
    });
};

var create = function (options, isRedirect, callback) {
    
    var bucket = isRedirect ? options.redirect_domain : options.domain,
        series = [
            async.apply(getOrCreateBucket, options.s3, bucket)
        ];
    
    if (isRedirect)
    {
        series.push(async.apply(options.s3.putBucketWebsite.bind(options.s3), putBucketRedirectParams(bucket, options.domain)));
    }
    else
    {
        series.push(async.apply(options.s3.putBucketPolicy.bind(options.s3), putBucketPolicyParams(bucket, options.domain)));
        series.push(async.apply(options.s3.putBucketWebsite.bind(options.s3), putBucketWebsiteParams(bucket)));
    }
    
    async.series(series, function(err, res){
        if (err) return callback(err);
        return callback(null, {
            bucket: bucket,
            endpoint: util.format('%s.s3-website-%s.amazonaws.com', bucket, options.region)
        });
    });
    
};

exports.create = create;