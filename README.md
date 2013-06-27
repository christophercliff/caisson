# Caisson

A command line utility for deploying your static website to AWS. Configures S3, Route 53, and CloudFront to serve `http://yoursite.com` with one command.

[![Build Status](https://secure.travis-ci.org/christophercliff/caisson.png?branch=master)](https://travis-ci.org/christophercliff/caisson)

## Installation

Install with [npm](https://npmjs.org):

```
$ npm install -g caisson
```

## Quick Start

Initialize the AWS services:

```
$ caisson init yoursite.com
```

Then push your build directory to S3:

```
$ caisson push
```

You will need to manually update your DNS to use to Route 53's name servers. Caisson will create a log of this information in a file `caisson.json`.

## Help

For additional help, see:

```
$ caission --help
```

## Running Tests

Clone the repo, install the dependencies and run.

```
$ npm install
$ npm test
```
