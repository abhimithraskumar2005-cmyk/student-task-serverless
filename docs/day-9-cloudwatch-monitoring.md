# Day 9: CloudWatch Monitoring

## Goal

Collect monitoring evidence for the deployed serverless application using Amazon CloudWatch.

## Why CloudWatch Is Important

CloudWatch is used to monitor application activity, logs, errors, duration, and API traffic. It proves that the application is not only deployed, but also observable and debuggable.

## What To Capture

Capture monitoring screenshots for:

- Lambda logs
- Lambda metrics
- API Gateway metrics
- CloudFront metrics
- Optional DynamoDB metrics

## Lambda Logs

AWS Lambda sends logs to CloudWatch Logs by default when the execution role has CloudWatch Logs permissions.

The log group name is:

```text
/aws/lambda/student-task-api
```

### Steps

1. Open AWS Console.
2. Search for **CloudWatch**.
3. Click **Log groups**.
4. Search:

```text
/aws/lambda/student-task-api
```

5. Open the log group.
6. Open the latest log stream.
7. Capture log events showing recent invocations.

### Screenshot

```text
43-cloudwatch-lambda-log-group.png
44-cloudwatch-lambda-log-stream.png
45-cloudwatch-lambda-log-events.png
```

## Lambda Metrics

### Steps

1. Open **Lambda**.
2. Open:

```text
student-task-api
```

3. Click **Monitor**.
4. Capture charts for:

```text
Invocations
Duration
Errors
```

### Screenshot

```text
46-lambda-monitor-metrics.png
```

## API Gateway Metrics

### Steps

1. Open **API Gateway**.
2. Open:

```text
student-task-http-api
```

3. Open **Monitor** or **Metrics**.
4. Capture charts showing request/activity metrics.

### Screenshot

```text
47-api-gateway-metrics.png
```

## CloudFront Metrics

### Steps

1. Open **CloudFront**.
2. Open the distribution.
3. Click **Monitoring**.
4. Capture request/error metrics.

### Screenshot

```text
48-cloudfront-monitoring-metrics.png
```

## Optional DynamoDB Metrics

### Steps

1. Open **DynamoDB**.
2. Open the `StudentTasks` table.
3. Click **Monitor**.
4. Capture read/write metrics.

### Screenshot

```text
49-dynamodb-monitoring-metrics.png
```

## Screenshots To Capture

Minimum required screenshots:

```text
43-cloudwatch-lambda-log-group.png
45-cloudwatch-lambda-log-events.png
46-lambda-monitor-metrics.png
47-api-gateway-metrics.png
48-cloudfront-monitoring-metrics.png
```

Optional but useful:

```text
44-cloudwatch-lambda-log-stream.png
49-dynamodb-monitoring-metrics.png
```

## Report Explanation

Use this paragraph:

```text
Amazon CloudWatch is used to monitor and troubleshoot the serverless application. Lambda execution logs are stored in the CloudWatch log group /aws/lambda/student-task-api. These logs help verify function invocations and debug backend issues. CloudWatch metrics are also used to observe Lambda invocations, duration, and errors. API Gateway and CloudFront metrics provide visibility into API requests and frontend delivery performance.
```

## Official References

- https://docs.aws.amazon.com/lambda/latest/dg/monitoring-functions-logs.html
- https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-view.html
- https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-metrics.html

