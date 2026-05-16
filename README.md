# Cloud-Based Serverless Student Task Management System

This capstone project is a serverless web application for students to track internship/project tasks.

## Project Idea

Students can sign in, add tasks, update progress, delete completed work, and view a dashboard. The app demonstrates a complete cloud architecture using AWS serverless services.

## AWS Architecture

```text
User Browser
  -> CloudFront
  -> S3 Static Website
  -> API Gateway
  -> Lambda
  -> DynamoDB
```

Authentication and monitoring:

```text
Cognito -> user signup/login
IAM -> least privilege permissions
CloudWatch -> logs and monitoring
```

## Services Used

- Amazon S3: hosts the frontend
- Amazon CloudFront: CDN and HTTPS
- Amazon API Gateway: exposes backend REST API
- AWS Lambda: serverless backend logic
- Amazon DynamoDB: stores task records
- Amazon Cognito: user authentication
- AWS IAM: secure Lambda permissions
- Amazon CloudWatch: logs and monitoring

## Main Features

- Add a new task
- View all tasks
- Update task status
- Delete task
- Dashboard counters
- API-ready frontend
- Local demo mode before AWS setup

## Folder Structure

```text
student-task-serverless/
  frontend/
    index.html
    styles.css
    app.js
  backend/
    lambda/
      tasks.py
  docs/
    day-wise-plan.md
    aws-setup-checklist.md
    report-outline.md
```

## How To Run Frontend Locally

Open this file in your browser:

```text
frontend/index.html
```

By default, it runs in local demo mode using browser storage. After AWS API Gateway is ready, update `API_BASE_URL` in `frontend/app.js`.

## Suggested Submission Items

- Final report PDF
- PPT
- GitHub repository link
- CloudFront live URL
- Demo video
- AWS screenshots
- Testing table

## Day 2 Documentation

- Architecture: `docs/architecture.md`
- GitHub upload steps: `docs/github-upload-steps.md`
- Viva preparation: `docs/viva-explanation.md`
- DynamoDB setup: `docs/day-3-dynamodb-setup.md`
- Lambda setup: `docs/day-4-lambda-setup.md`
- API Gateway setup: `docs/day-5-api-gateway-setup.md`
- Frontend API connection: `docs/day-6-frontend-api-connection.md`
