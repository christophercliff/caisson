var _ = require('underscore');

var DEFAULT_OUTPUT = {
        root_url: 'http://caisson.co',
        redirect_url: 'http://www.caisson.co',
        s3: [
            {
                bucket: 'caisson.co',
                endpoint: 'caisson.co.s3-website-us-east-1.amazonaws.com'
            },
            {
                bucket: 'www.caisson.co',
                endpoint: 'www.caisson.co.s3-website-us-east-1.amazonaws.com'
            }
        ],
        route53: {
            domain_name: 'caisson.co.',
            name_servers: [
                'ns-400.awsdns-50.com',
                'ns-748.awsdns-29.net',
                'ns-1140.awsdns-14.org',
                'ns-1840.awsdns-38.co.uk'
            ]
        },
        cloudFront: {
            domain_name: 'd1ac928fhtcp16.cloudfront.net'
        }
    };

module.exports = exports = function (res) {
    console.log(111, res);
    return _.defaults({}, DEFAULT_OUTPUT);
};