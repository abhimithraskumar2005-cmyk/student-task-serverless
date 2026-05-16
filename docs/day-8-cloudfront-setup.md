# Day 8: Add Amazon CloudFront

## Goal

Add Amazon CloudFront in front of the S3-hosted frontend so the project uses CDN delivery and HTTPS.

## Current S3 Website Endpoint

```text
http://student-task-serverless-abhimithra-2026-01.s3-website.ap-south-1.amazonaws.com
```

## Important Choice

Because the S3 bucket is already configured for static website hosting, use the S3 **website endpoint** as the CloudFront origin.

CloudFront treats an S3 static website endpoint as a custom origin. This is expected.

## Step 1: Create CloudFront Distribution

1. Open AWS Console.
2. Search for **CloudFront**.
3. Click **Create distribution**.
4. For origin domain, paste the S3 website endpoint domain without `http://`:

```text
student-task-serverless-abhimithra-2026-01.s3-website.ap-south-1.amazonaws.com
```

5. Origin protocol:

```text
HTTP only
```

6. Name:

```text
student-task-s3-origin
```

## Step 2: Default Cache Behavior

Use these settings:

```text
Viewer protocol policy: Redirect HTTP to HTTPS
Allowed HTTP methods: GET, HEAD
Cache policy: CachingOptimized
```

Keep other values as default.

## Step 3: Web Application Firewall

For this capstone project, choose:

```text
Do not enable security protections
```

This keeps the setup simple. You can mention AWS WAF as a future enhancement.

## Step 4: Settings

Default root object:

```text
index.html
```

Price class:

```text
Use only North America and Europe
```

or:

```text
Use all edge locations
```

Either is acceptable for the project. Choose the cheaper/simple option if shown.

## Step 5: Create Distribution

Click:

```text
Create distribution
```

CloudFront may take several minutes to deploy.

Status will change from:

```text
Deploying
```

to:

```text
Enabled
```

## Step 6: Test CloudFront URL

Copy the distribution domain name. It will look like:

```text
https://dxxxxxxxxxxxxx.cloudfront.net
```

Open it in the browser.

Expected result:

```text
Student Task Cloud Tracker
AWS API Mode
Tasks loaded
```

## Screenshots To Capture

Take these screenshots:

```text
34-cloudfront-create-origin.png
35-cloudfront-cache-behavior-settings.png
36-cloudfront-default-root-object.png
37-cloudfront-distribution-created.png
38-cloudfront-distribution-enabled.png
39-cloudfront-domain-name.png
40-cloudfront-hosted-frontend-working.png
41-cloudfront-add-task-success.png
42-dynamodb-cloudfront-task-created.png
```

Most important screenshots:

- CloudFront origin pointing to S3 website endpoint
- Viewer protocol policy redirecting HTTP to HTTPS
- Default root object `index.html`
- Distribution domain name
- CloudFront URL opening the frontend
- CloudFront-hosted frontend adding a task successfully

## Report Explanation

Use this paragraph:

```text
Amazon CloudFront is used as a content delivery network for the S3-hosted frontend. The CloudFront distribution uses the S3 static website endpoint as its origin and serves the application through a CloudFront domain name. Viewer protocol policy is configured to redirect HTTP to HTTPS, improving security and user experience. CloudFront also improves performance by caching static frontend files at edge locations.
```

## Official References

- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-creating-console.html
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html

