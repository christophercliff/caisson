# Caisson

A utility to deploy your static website to AWS. Configures S3 hosting, Route 53 DNS, and CloudFront CDN to serve `http://yoursite.com` with one command.

Recommended for use with static site generators like [Wintersmith](http://wintersmith.io/) or [Jekyll](http://jekyllrb.com/).

[![Build Status](https://secure.travis-ci.org/christophercliff/caisson.png?branch=master)](https://travis-ci.org/christophercliff/caisson)

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

Initialize AWS services:

```
$ caisson init yoursite.com
```

Then push your files to S3:

```
$ caisson push
```

You will need to manually update your DNS provider to use to Route 53's name servers. Caisson will log name server information in a file `caisson.json` in the root your project.

## Running Tests

Clone the repo, install the dependencies and run.

```
$ npm install
$ npm test
```