# Caisson

## Deploy your static website to AWS

Caisson makes it easy to host and deploy a static website to [AWS](https://aws.amazon.com/) via the root domain, e.g. `http://yoursite.com`.

## Why?

It's a [tedious process](http://aws.typepad.com/aws/2012/12/root-domain-website-hosting-for-amazon-s3.html) to configure services via the AWS web console. Caisson initializes all of the necessary services in a single `init` command and syncs your build directory using a smart `push` command.

## What does it do?

Caisson creates two [S3](http://aws.amazon.com/s3/) buckets, a [Route 53](http://aws.amazon.com/route53/) Hosted Zone, and a [CloudFront](http://aws.amazon.com/cloudfront/) CDN. It also manages a small cache in S3 for fast pushes.

## Installation

Install with [npm](https://npmjs.org/package/caisson):

```
$ npm install -g caisson
```

## Usage

Initialize AWS and push your build directory to S3:

```
$ caisson init yoursite.com
$ caisson push
```

You need to manually update your domain to use Route 53's name servers. Caisson will log this information in `caisson.json`.

## Help

For additional help, see:

```
$ caission --help
```

## Tests

Clone the repo, then run:

```
$ npm install
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/caisson/blob/master/LICENSE.md) for details.
