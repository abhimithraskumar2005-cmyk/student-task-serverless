# AWS Setup Checklist

## 1. DynamoDB

- Create table name: `StudentTasks`
- Partition key: `userId` as String
- Sort key: `taskId` as String
- Use on-demand capacity
- Detailed Day 3 guide: `docs/day-3-dynamodb-setup.md`
- CLI input file: `aws/dynamodb-create-table.json`

## 2. Lambda

- Runtime: Python 3.12 or Python 3.11
- Handler: `tasks.handler`
- Upload code from `backend/lambda/tasks.py`
- Environment variable:

```text
TABLE_NAME=StudentTasks
```
- Detailed Day 4 guide: `docs/day-4-lambda-setup.md`
- DynamoDB IAM policy template: `aws/lambda-dynamodb-policy.json`
- Lambda test event files:
  - `aws/lambda-test-create-task.json`
  - `aws/lambda-test-get-tasks.json`

## 3. IAM Permissions

Lambda execution role needs:

- `dynamodb:PutItem`
- `dynamodb:Query`
- `dynamodb:UpdateItem`
- `dynamodb:DeleteItem`
- `logs:CreateLogGroup`
- `logs:CreateLogStream`
- `logs:PutLogEvents`

Use least privilege by limiting DynamoDB permissions to the `StudentTasks` table ARN.

## 4. API Gateway

Create routes:

```text
POST /tasks
GET /tasks
PUT /tasks/{taskId}
DELETE /tasks/{taskId}
OPTIONS /tasks
OPTIONS /tasks/{taskId}
```

Enable CORS:

```text
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE
```

Detailed Day 5 guide: `docs/day-5-api-gateway-setup.md`

## 5. S3 Static Website Hosting

- Create a general purpose S3 bucket
- Upload frontend files: `index.html`, `styles.css`, `app.js`
- Enable static website hosting
- Set index document to `index.html`
- Add public read bucket policy
- Detailed Day 7 guide: `docs/day-7-s3-frontend-deployment.md`
- Bucket policy template: `aws/s3-public-read-policy-template.json`

## 6. CloudFront CDN

- Create CloudFront distribution
- Use S3 website endpoint as origin
- Set viewer protocol policy to redirect HTTP to HTTPS
- Set default root object to `index.html`
- Detailed Day 8 guide: `docs/day-8-cloudfront-setup.md`

## 7. CloudWatch Monitoring

- Capture Lambda log group and latest log events
- Capture Lambda monitor metrics
- Capture API Gateway metrics
- Capture CloudFront metrics
- Detailed Day 9 guide: `docs/day-9-cloudwatch-monitoring.md`

## 5. Frontend API URL

After API Gateway deployment, copy the invoke URL and update:

```js
const API_BASE_URL = "https://your-api-id.execute-api.ap-south-1.amazonaws.com";
```

This line is in:

```text
frontend/app.js
```

## 6. S3 Hosting

- Create S3 bucket
- Upload `frontend/index.html`, `frontend/styles.css`, and `frontend/app.js`
- Enable static website hosting or use CloudFront origin

## 7. CloudFront

- Create distribution
- Origin: S3 bucket
- Viewer protocol policy: Redirect HTTP to HTTPS
- Default root object: `index.html`

## 8. CloudWatch

Capture screenshots of:

- Lambda logs
- API Gateway metrics
- Lambda invocation/error metrics
