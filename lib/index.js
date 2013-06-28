var async = require('async'),
    fs = require('fs'),
    AWS = require('aws-sdk'),
    _ = require('underscore'),
    bucket = require('./bucket'),
    dns = require('./dns'),
    cdn = require('./cdn');

var init = function (options, callback) {

    if (!_.isFunction(callback)) callback = function () {};
    if (!_.isString(options.domain)) return callback(new Error('You must specify a domain'));
    if (!_.isObject(options.awsConfig)) return callback(new Error('You must specify an AWS config'));
    console.log(222);
    return callback();
    var domain = options.domain,
        s3,
        route53,
        cloudfront;

    AWS.config.update(options.awsConfig);

    s3 = new AWS.S3();
    route53 = new AWS.Route53();
    cloudFront = new AWS.CloudFront();

    async.parallel([
        async.apply(bucket.create, {
            domain: domain,
            s3: s3
        }),
        async.apply(bucket.create, {
            domain: domain,
            s3: s3,
            isRedirect: true
        })
    ], function(err, res){
        if (err) return callback(err);
        async.parallel([
            async.apply(dns.create, {
                domain: domain,
                route53: route53,
                region: options.awsConfig.region
            }),
            async.apply(cdn.create, {
                domain: domain,
                cloudFront: cloudFront
            })
        ], function(err, res){
            if (err) return callback(err);
            return callback();
        });
    });

};

exports.init = init;
exports.push = require('./push');
