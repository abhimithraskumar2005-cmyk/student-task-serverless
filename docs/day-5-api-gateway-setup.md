# Day 5: API Gateway Setup

## Goal

Create a public HTTP API endpoint that sends frontend requests to the Lambda backend.

## API Type

Use:

```text
HTTP API
```

HTTP API is simpler, cheaper, supports Lambda proxy integration, and includes easy CORS configuration.

## API Details

API name:

```text
student-task-http-api
```

Integration:

```text
AWS Lambda
```

Lambda function:

```text
student-task-api
```

Region:

```text
ap-south-1
```

Stage:

```text
$default
```

Auto-deploy:

```text
Enabled
```

## Routes

Create these routes:

```text
POST /tasks
GET /tasks
PUT /tasks/{taskId}
DELETE /tasks/{taskId}
```

Attach all routes to the same Lambda integration:

```text
student-task-api
```

## CORS Settings

Use these CORS settings while developing:

```text
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
```

For the AWS Console, enter:

```text
Allow origins: *
Allow headers: content-type,authorization
Allow methods: GET,POST,PUT,DELETE,OPTIONS
```

## Step 1: Create HTTP API

1. Open AWS Console.
2. Search for **API Gateway**.
3. Click **Create API**.
4. Under **HTTP API**, click **Build**.
5. Click **Add integration**.
6. Choose:

```text
Lambda
```

7. Select region:

```text
ap-south-1
```

8. Select Lambda function:

```text
student-task-api
```

9. API name:

```text
student-task-http-api
```

10. Click **Next**.

## Step 2: Configure Routes

Create these routes:

```text
POST /tasks
GET /tasks
PUT /tasks/{taskId}
DELETE /tasks/{taskId}
```

Then click **Next**.

## Step 3: Configure Stage

Use:

```text
$default
```

Keep:

```text
Auto-deploy enabled
```

Then click **Next**.

## Step 4: Review And Create

Review:

```text
API name: student-task-http-api
Integration: student-task-api
Routes: 4
Stage: $default
```

Click:

```text
Create
```

## Step 5: Enable CORS

1. Open the created API.
2. Go to **CORS**.
3. Click **Configure** or **Edit**.
4. Add:

```text
Allow origins: *
Allow methods: GET,POST,PUT,DELETE,OPTIONS
Allow headers: content-type,authorization
```

5. Save changes.

## Step 6: Copy Invoke URL

Open **Stages** and copy the invoke URL.

It will look like:

```text
https://abc123.execute-api.ap-south-1.amazonaws.com
```

## Step 7: Test API In Browser

For GET route, open:

```text
https://YOUR_API_ID.execute-api.ap-south-1.amazonaws.com/tasks?userId=demo-student
```

Expected result:

```json
{
  "tasks": [
    {
      "userId": "demo-student"
    }
  ]
}
```

## Step 8: Test POST With CloudShell Or Postman

Use this command in CloudShell or terminal:

```bash
curl -X POST "https://YOUR_API_ID.execute-api.ap-south-1.amazonaws.com/tasks" \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"demo-student\",\"title\":\"API Gateway test\",\"description\":\"Created through API Gateway\",\"status\":\"Pending\",\"deadline\":\"2026-05-22\"}"
```

Expected result:

```text
statusCode 201
```

## Screenshots To Capture

Take these screenshots:

```text
14-api-gateway-api-created.png
15-api-gateway-routes.png
16-api-gateway-lambda-integration.png
17-api-gateway-cors-settings.png
18-api-gateway-stage-invoke-url.png
19-api-gateway-get-test-success.png
20-api-gateway-post-test-success.png
```

Most important screenshots:

- API overview showing API name
- Routes page showing all four routes
- Integration page showing Lambda function `student-task-api`
- CORS page
- Invoke URL
- Successful GET test result

## Report Explanation

Use this paragraph:

```text
Amazon API Gateway is used to expose the Lambda backend as HTTP endpoints. The HTTP API contains routes for creating, reading, updating, and deleting tasks. Each route is integrated with the student-task-api Lambda function using Lambda proxy integration. CORS is enabled so that the frontend hosted on a separate domain can call the API securely from the browser.
```

## Official References

- https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html
- https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop.html
- https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html

