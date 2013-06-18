# Caisson

A utility to deploy your static website to AWS. Configures S3 hosting, Route 53 DNS, and CloudFront CDN to serve `http://yoursite.com` in one command.

## Installation

Install globally via npm to use the CLI.

```
$ npm install -g caisson
```

## Usage

```
$ caisson init yoursite.com
$ caisson deploy
```

## Also...

You need a valid AWS account. To configure, create a file `aws-config.json` in the root of your project (add this file to `.gitignore`):

```json
{
  "accessKeyId": "YOUR_KEY",
  "secretAccessKey": "YOUR_SECRET",
  "region": "us-east-1"
}
```

You also need a domain name. After initialization, you will need to update your DNS to point to Amazon's name servers.

## Tests

Install and run.

```
$ npm install
$ npm test
```