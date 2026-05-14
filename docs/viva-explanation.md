# Viva Explanation

## Short Project Explanation

My project is a cloud-based serverless student task management system. It helps students track internship and capstone project tasks. Users can add tasks, view their task list, update task status, and delete completed tasks.

The frontend is hosted using Amazon S3 and delivered through Amazon CloudFront. The frontend communicates with Amazon API Gateway, which triggers AWS Lambda functions. Lambda performs the backend operations and stores task data in Amazon DynamoDB. Amazon Cognito can be used for authentication, IAM roles are used for secure permissions, and CloudWatch is used for logging and monitoring.

## Why I Chose Serverless

I chose serverless architecture because it does not require managing servers. AWS automatically handles scaling, availability, and infrastructure management. It is also cost-efficient because services like Lambda charge based on actual usage.

## AWS Services Explanation

| AWS Service | Purpose In Project |
| --- | --- |
| Amazon S3 | Hosts static frontend files |
| Amazon CloudFront | Delivers frontend with CDN and HTTPS |
| Amazon API Gateway | Creates REST API endpoints |
| AWS Lambda | Runs backend logic without a server |
| Amazon DynamoDB | Stores task data |
| Amazon Cognito | Handles user signup and login |
| AWS IAM | Provides secure access control |
| Amazon CloudWatch | Stores logs and metrics |

## Important Technical Points

- The application follows a serverless architecture.
- DynamoDB stores task records using `userId` and `taskId`.
- API Gateway exposes CRUD endpoints.
- Lambda performs create, read, update, and delete operations.
- IAM follows the least privilege principle.
- CloudWatch helps monitor errors and backend activity.

## Possible Viva Questions

### What is serverless computing?

Serverless computing is a cloud model where developers write and deploy code without managing servers. The cloud provider automatically handles infrastructure, scaling, and availability.

### Why did you use Lambda?

Lambda runs backend code only when an API request is made. It is scalable, cost-efficient, and removes the need to maintain a backend server.

### Why did you use DynamoDB?

DynamoDB is a managed NoSQL database. It is fast, scalable, and suitable for storing task records with simple key-based access.

### Why is CloudFront used?

CloudFront improves website performance by caching static files at edge locations. It also provides HTTPS support.

### How is the project secure?

The project uses IAM roles with limited permissions. Lambda only gets access to the required DynamoDB table. Cognito can be used to authenticate users before they access protected APIs.

