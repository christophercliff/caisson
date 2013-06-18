# Caisson

A utility to deploy your static website to AWS. Configures S3 hosting, Route 53 DNS, and CloudFront CDN to serve `http://yoursite.com` with one command.

## Installation

Install using [npm](https://npmjs.org).

```
$ npm install -g caisson
```

## Quick Start

Configure AWS by creating a file `aws-config.json` in the root of your project:

```json
{
  "accessKeyId": "YOUR_KEY",
  "secretAccessKey": "YOUR_SECRET",
  "region": "us-east-1"
}
```

Initialize the services:

```
$ caisson init yoursite.com
```

Then copy your `build` directory to S3:

```
$ caisson deploy
```

You will need to manually update your DNS provier to use to Route 53's name servers. Caisson will log the name server information in a file `caisson.json`.

## Running Tests

Install the dependencies and run.

```
$ npm install
$ npm test
```