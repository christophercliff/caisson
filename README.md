# Caisson

## Deploy your static website to the cloud

Caisson is a *pluggable* cloud deployment utility. It aims to make it easy to deploy a static website to the cloud services you already use. You pay the service providers, but Caisson handles the moving parts for free.

## Usage

Provisioning operations are bundled into plugins and can be mixed and matched as needed. For a simple example, you could provision an S3 bucket and upload your build directory to it using:

```js
Caisson()
    .use(s3())
    .up()
```

For a more complex example, let's say we wanted to deploy our site to S3 and serve it over HTTPS from `https://yourdomain.com`:

```js
Caisson()
    .use(s3())
    .use(cloudfront())
    .use(route53())
    .use(sslCert())
    .use(sslProxy())
    .up()
```

## Plugins

- [caisson-aws-s3][#]
- [caisson-aws-cloudfront][#]
- [caisson-aws-route53][#]
- [caisson-digitalocean-ssl-proxy][#]
- [caisson-dnsimple-ssl-cert][#]

## Installation

Install with npm:

```
$ npm install -g caisson
```

## License

MIT License, see [LICENSE][license] for details.

[#]: #
[license]: https://github.com/christophercliff/caisson/blob/master/LICENSE.md
