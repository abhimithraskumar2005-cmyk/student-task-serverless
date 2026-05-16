# Day 6: Connect Frontend To API Gateway

## Goal

Connect the static frontend application to the real API Gateway endpoint created in Day 5.

## API Gateway Base URL

```text
https://y93vfcqzw1.execute-api.ap-south-1.amazonaws.com
```

## Frontend File Updated

```text
frontend/app.js
```

Updated line:

```js
const API_BASE_URL = "https://y93vfcqzw1.execute-api.ap-south-1.amazonaws.com";
```

## Expected Behavior

After this update, the frontend no longer uses browser local storage. It sends requests to API Gateway, which triggers Lambda and stores/reads data from DynamoDB.

## Test Checklist

Open the local frontend and verify:

- The mode label shows `AWS API Mode`.
- Existing DynamoDB task loads on refresh.
- Add task creates a new DynamoDB item.
- Edit task updates data through Lambda.
- Delete task removes the item from DynamoDB.

## Screenshots To Capture

Take these screenshots:

```text
21-frontend-aws-api-mode.png
22-frontend-loads-dynamodb-task.png
23-frontend-add-task-success.png
24-dynamodb-new-frontend-task-created.png
25-frontend-update-task-success.png
26-frontend-delete-task-success.png
```

Most important screenshots:

- Frontend showing `AWS API Mode`
- Task list loaded from DynamoDB
- Add task success in frontend
- DynamoDB showing the newly created frontend task

## Report Explanation

Use this paragraph:

```text
The frontend application is connected to the deployed API Gateway invoke URL. When a user adds, views, updates, or deletes a task, the browser sends an HTTP request to API Gateway. API Gateway invokes the Lambda backend, and Lambda performs the required operation on the DynamoDB table. This completes the end-to-end connection between the user interface and the AWS serverless backend.
```

