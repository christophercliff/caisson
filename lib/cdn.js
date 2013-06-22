var uuid = require('uuid'),
    _ = require('underscore');

var createDistributionParams = function (domain) {
    var originId = uuid.v1();
    return {
        DistributionConfig: {
            CallerReference: uuid.v1(),
            Aliases: {
                Quantity: 0,
                Items: []
            },
            DefaultRootObject: 'index.html',
            Origins: {
                Quantity: 1,
                Items: [
                    {
                        Id: originId,
                        DomainName: domain + '.s3.amazonaws.com',
                        S3OriginConfig: {
                            OriginAccessIdentity: ''
                        }
                    }
                ]
            },
            DefaultCacheBehavior: {
                TargetOriginId: originId,
                ForwardedValues: {
                    QueryString: false,
                    Cookies: {
                        Forward: 'none'
                    }
                },
                TrustedSigners: {
                    Enabled: false,
                    Quantity: 0
                },
                ViewerProtocolPolicy: 'allow-all',
                MinTTL: 0
            },
            CacheBehaviors: {
                Quantity: 0
            },
            Comment: 'Created by Caisson',
            Logging: {
                Enabled: false,
                IncludeCookies: false,
                Bucket: '',
                Prefix: ''
            },
            PriceClass: 'PriceClass_100',
            Enabled: true
        }
    };
};

var findDistribution = function (items, name) {
    return _.find(items, function(item){
        return item.Origins.Items[0].DomainName === name;
    });
};

var create = function (options, callback) {
    
    var cloudFront = options.cloudFront,
        domain = options.domain,
        name = domain + '.s3.amazonaws.com';
    
    console.log('Creating CloudFront Distribution ' + name);
    
    cloudFront.listDistributions(function(err, res){
        if (err) return callback(new Error(err));
        if (findDistribution(res.Items, name)) return callback(console.log('CloudFront Distribution ' + name + ' already exists'));
        cloudFront.createDistribution(createDistributionParams(domain), function(err, res){
            if (err) return callback(new Error(err));
            console.log('Created CloudFront Distribution ' + name)
            return callback();
        });
    });
    
};

exports.createDistributionParams = createDistributionParams;
exports.create = create;