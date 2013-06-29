# Caisson

A utility for deploying your static website to AWS.

Caisson sets up S3, Route 53, and CloudFront and deploys `http://yoursite.com` in one command.

[![Build Status](https://secure.travis-ci.org/christophercliff/caisson.png?branch=master)](https://travis-ci.org/christophercliff/caisson)

## Installation

Install with [npm](https://npmjs.org/package/caisson):

```
$ npm install -g caisson
```

## Get Started

Initialize the AWS services:

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