# Caisson

## Deploy your static website to AWS

Caisson does everything you need to host and deploy a static website on [AWS](https://aws.amazon.com/) via the root domain, e.g. `http://yoursite.com`.

## How does it work?

AWS allows root domain website hosting via an [elaborate setup process](http://aws.typepad.com/aws/2012/12/root-domain-website-hosting-for-amazon-s3.html). Caisson streamlines this process by initializing the necessary [S3](http://aws.amazon.com/s3/) buckets, [Route 53](http://aws.amazon.com/route53/) DNS settings, and a [CloudFront](http://aws.amazon.com/cloudfront/) CDN for good measure.

## Installation

Install with [npm](https://npmjs.org/package/caisson):

```
$ npm install -g caisson
```

## Get Started

Initialize AWS:

```
$ caisson init yoursite.com
```

Then push your build directory to S3:

```
$ caisson push
```

You need to manually update your DNS to use Route 53's name servers. Caisson will log this information in `caisson.json`.

## Help

For additional help, see:

```
$ caission --help
```

## Tests

Clone the repo, install the dependencies and run.

```
$ npm install
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/caisson/blob/master/LICENSE.md) for details.