var should = require('should'),
    dns = require('../lib/dns');

describe('dns', function(){
    
    var domain = 'yoursite.com',
        hostedZoneId = 'ABC',
        region = 'us-east-1';
    
    beforeEach(function(){
        
    });
    
    describe('#createHostedZoneParams', function(){
        
        it('should create the correct object', function(){
            var params = dns.createHostedZoneParams(domain);
            params.Name.should.equal(domain);
            params.should.have.property('CallerReference')
        });
        
    });
    
    describe('#changeResourceRecordSetsParams', function(){
        
        it('should create the correct object', function(){
            var params = dns.changeResourceRecordSetsParams(domain, hostedZoneId, region);
            params.should.eql({
                HostedZoneId: hostedZoneId,
                ChangeBatch: {
                    Changes: [
                        {
                            Action: 'CREATE',
                            ResourceRecordSet: {
                                Name: domain + '.',
                                Type: 'A',
                                AliasTarget: {
                                    HostedZoneId: 'Z3AQBSTGFYJSTF',
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
            });
        });
        
    });
    
});