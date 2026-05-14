# Day 4: Lambda Backend Setup

## Goal

Create the backend function that performs task operations and connects to the `StudentTasks` DynamoDB table.

## Lambda Function Details

Function name:

```text
student-task-api
```

Runtime:

```text
Python 3.12
```

Architecture:

```text
x86_64
```

Handler:

```text
lambda_function.handler
```

Environment variable:

```text
TABLE_NAME=StudentTasks
```

## Why Lambda Is Used

AWS Lambda is used because it allows backend code to run without managing servers. It automatically scales based on incoming requests and charges only when the function runs. This makes the project cost-efficient and suitable for a serverless architecture.

## Step 1: Create The Lambda Function

1. Open AWS Console.
2. Search for **Lambda**.
3. Click **Create function**.
4. Select:

```text
Author from scratch
```

5. Function name:

```text
student-task-api
```

6. Runtime:

```text
Python 3.12
```

7. Architecture:

```text
x86_64
```

8. Permissions:

Choose:

```text
Create a new role with basic Lambda permissions
```

9. Click **Create function**.

## Step 2: Add Backend Code

1. Open the function `student-task-api`.
2. Go to the **Code** tab.
3. Open the default file:

```text
lambda_function.py
```

4. Replace all existing code with the code from:

```text
backend/lambda/tasks.py
```

5. Click **Deploy**.

## Step 3: Add Environment Variable

1. Go to **Configuration**.
2. Click **Environment variables**.
3. Click **Edit**.
4. Add:

```text
Key: TABLE_NAME
Value: StudentTasks
```

5. Click **Save**.

## Step 4: Give Lambda DynamoDB Permission

The Lambda function needs permission to read and write the `StudentTasks` table.

### Recommended Console Method

1. In Lambda, go to:

```text
Configuration -> Permissions
```

2. Click the execution role name.
3. IAM will open in a new tab.
4. Click **Add permissions**.
5. Choose **Create inline policy**.
6. Choose **JSON**.
7. Paste the policy from:

```text
aws/lambda-dynamodb-policy.json
```

8. Replace:

```text
YOUR_ACCOUNT_ID
```

with your AWS account ID.

9. Click **Next**.
10. Policy name:

```text
StudentTasksDynamoDBAccess
```

11. Click **Create policy**.

## Step 5: Test Create Task

1. Go back to Lambda.
2. Open the **Test** tab.
3. Create new test event.
4. Event name:

```text
CreateTaskTest
```

5. Paste the JSON from:

```text
aws/lambda-test-create-task.json
```

6. Click **Save**.
7. Click **Test**.

Expected result:

```text
Status code: 201
```

## Step 6: Test Get Tasks

1. Create another test event.
2. Event name:

```text
GetTasksTest
```

3. Paste the JSON from:

```text
aws/lambda-test-get-tasks.json
```

4. Click **Save**.
5. Click **Test**.

Expected result:

```text
Status code: 200
```

The response body should include a `tasks` array.

## Screenshots To Capture

Take these screenshots for submission:

1. Lambda function overview showing:

```text
Function name: student-task-api
Runtime: Python 3.12
```

2. Code tab showing deployed backend code.

3. Environment variables showing:

```text
TABLE_NAME=StudentTasks
```

4. Permissions page showing execution role.

5. IAM inline policy showing DynamoDB permissions.

6. Successful `CreateTaskTest` result showing:

```text
Status code: 201
```

7. Successful `GetTasksTest` result showing:

```text
Status code: 200
```

8. DynamoDB Explore items page showing a new task item.

9. CloudWatch log stream showing Lambda execution logs.

## Screenshot File Names

Use names like:

```text
05-lambda-function-overview.png
06-lambda-code-deployed.png
07-lambda-environment-variable.png
08-lambda-execution-role.png
09-iam-dynamodb-policy.png
10-lambda-create-task-success.png
11-lambda-get-tasks-success.png
12-dynamodb-task-item-created.png
13-cloudwatch-lambda-logs.png
```

## Report Explanation

Use this paragraph in your report:

```text
AWS Lambda is used to implement the backend logic of the student task management system. The Lambda function receives API requests, validates input, and performs create, read, update, and delete operations on the DynamoDB table. The function uses the TABLE_NAME environment variable to access the StudentTasks table. IAM permissions are configured using the least privilege principle, allowing Lambda to access only the required DynamoDB table. CloudWatch is used to monitor Lambda execution and debug errors.
```

