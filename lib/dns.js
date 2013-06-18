var async = require('async'),
    uuid = require('uuid');

var CALLER_REFERENCE = 'caisson';
var HOSTED_ZONE_ID_RE = /^\/hostedzone\//;

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
                            HostedZoneId: hostedZoneId,
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
    }
};

var parseHostedZoneId = function (res) {
    return res.HostedZone.Id.replace(HOSTED_ZONE_ID_RE, '');
};

var create = function (options, callback) {
    
    var route53 = options.route53,
        domain = options.domain,
        region = options.region;
    
    async.waterfall([
        async.apply(route53.createHostedZone.bind(route53), createHostedZoneParams(domain)),
        function(res, c){
            route53.changeResourceRecordSets(changeResourceRecordSetsParams(domain, parseHostedZoneId(res), region), c);
        }
    ], function(err, res){
        if (err) return callback(new Error(err));
        return callback();
    });
    
};

exports.createHostedZoneParams = createHostedZoneParams;
exports.changeResourceRecordSetsParams = changeResourceRecordSetsParams;
exports.create = create;