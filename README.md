# Caisson

## Deploy your static website to the cloud

Caisson aims to make it easy to deploy a static website to the cloud services you already use. You pay the service providers, but Caisson handles the moving parts for free.

Mix and match the following features:

- __static web hosting__ with [AWS S3]()
- __CDN__ with [AWS CloudFront]()
- __root domain__ DNS with [AWS Route 53]()
- __HTTPS__ with an nginx SSL reverse proxy running on a [DigitalOcean]() droplet
- __SSL certificate__ provisioning with [DNSimple]()

> These services were selected based on cost, reliability and ease-of-use. Please [create an issue]() if you think you've found a better provider.

## How it works

Specify your project's build settings in `caisson.json` by running:

```
$ caisson init
```

Once configured, provision services by running (this is when you start spending money):

```
$ caisson up
```

When the services are up, push your build to AWS S3:

```
$ caisson push
```

And shut down services when you're finished:

```
$ caisson down
```

- Configure AWS
    - Type your access key:
    - Type your secret key:
    - Type your region (us-east-1):
    ... Setting up AWS S3
    ... AWS S3 setup complete:
        {
            "buckets": []
        }
- Would you like to provision a CDN (yes/no)?
    ... Setting up AWS CloudFront
    ... AWS CloudFront setup complete:
        {
            "domain_name": "d1ac928fhtcp16.cloudfront.net"
        }
- Would you like to serve your website from the root domain, e.g. http://yoursite.com (yes/no)?
    ... Setting up AWS Route 53
    ... AWS Route 53 setup complete
    {
        "domain_name": "caisson.co.",
        "name_servers": [
            "ns-1415.awsdns-48.org",
            "ns-1608.awsdns-09.co.uk",
            "ns-200.awsdns-25.com",
            "ns-813.awsdns-37.net"
        ]
    }
- Would you like to make your site HTTPS everywhere (hint: YES YOU WOULD!)?
    - Configure DigitalOcean
        - Type your key:
        - Type your secret:
    - Do you already have an SSL certificate (yes/no)?
        - Paste your certificate:
            ... Setting up custom SSL certificate
    - Would you like to provision an SSL certificate (yes/no)?
        - Configure DNSimple
            - Type your key:
            - Type your secret:
        - Type your info:
            ... Setting up DNSimple SSL certificate
            ... DNSimple SSL certificate setup complete
            {

            }
    - Would you like to use a self-signed SSL certificate (yes/no)?
        ... Setting up self-signed SSL certificate
        ...
        {

        }

## Installation

Install with [npm](https://npmjs.org/package/caisson):

```
$ npm install -g caisson
```

## Providers & Services

TODO

## Help

For help, see:

```
$ caission --help
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/caisson/blob/master/LICENSE.md) for details.
