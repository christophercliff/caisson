# Caisson

## Usage

```
var caisson = require('caisson');

caisson.init({
    awsConfig: 'aws-config.json',
    domain: 'mysite.com'
});

caisson.deploy();
```

### CLI

```
$ caisson init --domain mysite.com --aws-config aws-config.json
$ caisson deploy
```

## What it does

1. Create S3 bucket `mysite.com`
2. Create S3 bucket `www.mysite.com`
3. Create Route 53 hosted zone and records
4. Create CloudFront distribution
5. Copy `./build` directory to S3

Write a `caisson.json` file:

```js
{
    site: 'mysite.com',
    redirect: 'www.mysite.com',
    cdn: 'd11sswu48y9djf.cloudfront.net'
}
```