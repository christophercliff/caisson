var async = require('async'),
    _ = require('underscore'),
    uuid = require('uuid');

var CALLER_REFERENCE = 'caisson',
    HOSTED_ZONE_ID_RE = /^\/hostedzone\//,
    S3_HOSTED_ZONE_IDS = {
        // Listed here: http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region
        'us-east-1': 'Z3AQBSTGFYJSTF',
        'us-west-1': 'Z2F56UZL2M1ACD',
        'us-west-2': 'Z3BJ6K6RIION7M',
        'eu-west-1': 'Z1BKCTXD74EZPE',
        'ap-southeast-1': 'Z3O0J2DXBE1FTB',
        'ap-southeast-2': 'Z1WCIGYICN2BYD',
        'ap-northeast-1': 'Z2M4EHUR26P7ZW',
        'sa-east-1': 'Z7KQH4QJS55SO'
    };

var createHostedZoneParams = function (domain) {
    return {
        Name: domain,
        CallerReference: uuid.v1()
    }
};

var changeResourceRecordSetsParams = function (domain, hostedZoneId, region) {
    return {
        HostedZoneId: hostedZoneId,
        ChangeBatch: {
            Changes: [
                {
                    Action: 'CREATE',
                    ResourceRecordSet: {
                        Name: domain + '.',
                        Type: 'A',
                        AliasTarget: {
                            HostedZoneId: S3_HOSTED_ZONE_IDS[region],
                            DNSName: 's3-website-' + region + '.amazonaws.com.',
                            EvaluateTargetHealth: false
                        }
                    }
                },
                {
                    Action: 'CREATE',
                    ResourceRecordSet: {
                        Name: 'www.' + domain + '.',
                        Type: 'CNAME',
                        TTL: 300,
                        ResourceRecords: [
                            {
                                Value: 'www.' + domain + '.s3-website-' + region + '.amazonaws.com'
                            }
                        ]
                    }
                }
            ]
        }
    };
};

var parseHostedZoneId = function (res) {
    return res.HostedZone.Id.replace(HOSTED_ZONE_ID_RE, '');
};

var create = function (options, callback) {
    
    var route53 = options.route53,
        domain = options.domain,
        region = options.region;
    
    console.log('Creating hosted zone ' + domain);
    
    route53.listHostedZones(function(err, res){
        if (err) return callback(new Error(err));
        if (_.findWhere(res.HostedZones, { Name: domain + '.' })) return callback(console.log('Hosted zone ' + domain + ' already exists'));
        async.waterfall([
            async.apply(route53.createHostedZone.bind(route53), createHostedZoneParams(domain)),
            function(res, c){
                route53.changeResourceRecordSets(changeResourceRecordSetsParams(domain, parseHostedZoneId(res), region), c);
            }
        ], function(err, res){
            if (err) return callback(new Error(err));
            return callback(console.log('Created hosted zone ' + domain + ''));
        });
    });
    
};

exports.createHostedZoneParams = createHostedZoneParams;
exports.changeResourceRecordSetsParams = changeResourceRecordSetsParams;
exports.create = create;