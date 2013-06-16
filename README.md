# Caisson

## Usage

```
var caisson = require('caisson');

caisson.init({
    awsConfig: {},
    domain: 'mysite.com'
});
caisson.deploy();
```

### CLI

```
$ caisson init --domain caisson.co --aws-config aws-config.json
$ caisson deploy ./build
```

## What it does

1. Create S3 bucket `mysite.com`
2. Create S3 bucket `www.mysite.com`
3. Create Route 53 hosted zone and records
4. Create CloudFront distribution
5. Copy `./build` directory to S3