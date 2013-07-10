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

Copyright (C) 2013 Christopher Cliff

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.