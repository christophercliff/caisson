# Caisson

## Deploy your static website to AWS

Caisson initializes [S3](http://aws.amazon.com/s3/), [Route 53](http://aws.amazon.com/route53/), and [CloudFront](http://aws.amazon.com/cloudfront/) and deploys your site in one command.

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
