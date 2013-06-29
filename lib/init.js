var async = require('async'),
    AWS = require('aws-sdk'),
    _ = require('underscore'),
    bucket = require('./bucket'),
    dns = require('./dns'),
    cdn = require('./cdn');

var initStorage = function (options, callback) {
    async.parallel([
        async.apply(bucket.create, options, false),
        async.apply(bucket.create, options, true)
    ], callback);
};

var initServices = function (options, callback) {
    async.parallel([
        async.apply(dns.create, options),
        async.apply(cdn.create, options)
    ], callback);
};

createManifest = function (options) {
    if (!_.isString(options.domain)) throw new Error('You must specify a domain');
    if (!_.isObject(options.awsConfig)) throw new Error('You must specify an AWS config');
    return _.chain({})
        .extend(options)
        .defaults({
            s3: new AWS.S3(options.awsConfig),
            route53: new AWS.Route53(options.awsConfig),
            cloudFront: new AWS.CloudFront(options.awsConfig),
            region: options.awsConfig.region,
            redirect_domain: 'www.' + options.domain
        })
        .value();
};

var outputManifest = function (manifest, res) {
    return {
        root_domain: manifest.domain,
        redirect_domain: manifest.redirect_domain,
        s3: res[0],
        route_53: {
            domain_name: manifest.domain + '.',
            name_servers: res[1][0].DelegationSet.NameServers
        },
        cloud_front: {
            domain_name: res[1][1].DomainName
        }
    };
};

var init = function (options, callback) {
    
    if (!_.isFunction(callback)) callback = function () {};
    
    var manifest;
    
    try
    {
        manifest = createManifest(options);
        AWS.config.update(manifest.awsConfig);
    }
    catch (ex)
    {
        return callback(ex);
    }
    
    async.series([
        async.apply(initStorage, manifest),
        async.apply(initServices, manifest)
    ], function(err, res){
        if (err) return callback(new Error(err));
        callback(null, outputManifest(manifest, res));
    });

};

exports.action = init;