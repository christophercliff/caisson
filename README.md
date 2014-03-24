# Caisson

## Deploy your static website to the cloud

Caisson is a *pluggable* cloud deployment utility for static websites. It makes it easy to deploy your static website to your favorite cloud services.

## Usage

Provisioning operations are bundled into plugins and can be mixed and matched as needed. For example, the following will provision an S3 bucket and upload your build directory:

```js
var caisson = Caisson.create()

caisson
    .use(s3())
    .up()
    .then(caisson.push)
    .done(done)
```

For a more complex example, let's say you want to deploy our site to S3 and serve it over HTTPS from `https://yourdomain.com`. The follwing will provision an S3 bucket, a CloudFront CDN, a Route53 DNS entry for `yourdomain.com`, provision a DigitalOcean Droplet and install an nginx SSL proxy with your certificate:

```js
caisson
    .use(s3())
    .use(cloudfront())
    .use(route53())
    .use(sslCert())
    .use(sslProxy())
    .up()
    .then(caisson.push)
    .done(done)
```

## Plugins

- [caisson-s3][s3]
- [caisson-cloudfront][#]
- [caisson-route53][#]
- [caisson-digitalocean-ssl-proxy][#]
- [caisson-dnsimple-ssl-cert][#]

## Installation

Install with npm:

```
$ npm install -g caisson
```

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE][license] for details.

[#]: #
[license]: https://github.com/christophercliff/caisson/blob/master/LICENSE.md
[s3]: https://github.com/christophercliff/caisson-s3
