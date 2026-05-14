# Final Report Outline

## 1. Title

Cloud-Based Serverless Student Task Management System

## 2. Abstract

This project presents a serverless web application that helps students manage internship and capstone tasks. The frontend is hosted using Amazon S3 and delivered through CloudFront. API Gateway and Lambda provide backend functionality, while DynamoDB stores task data. The system uses IAM for secure access and CloudWatch for monitoring.

## 3. Problem Statement

Students need a simple cloud-based system to manage project tasks and track progress without maintaining physical servers.

## 4. Objectives

- Build a serverless web application
- Store task data in a cloud database
- Provide CRUD operations
- Deploy the frontend using AWS hosting services
- Monitor backend operations using CloudWatch
- Apply basic cloud security using IAM

## 5. Tools And Technologies

- HTML, CSS, JavaScript
- AWS S3
- AWS CloudFront
- AWS API Gateway
- AWS Lambda
- AWS DynamoDB
- AWS IAM
- AWS CloudWatch
- GitHub

## 6. System Architecture

Add architecture diagram here.

## 7. Implementation

Explain frontend, API, Lambda, DynamoDB, deployment, and monitoring.

## 8. Testing

| Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Add task | Task saved | Task saved | Pass |
| View tasks | Tasks displayed | Tasks displayed | Pass |
| Update task | Status updated | Status updated | Pass |
| Delete task | Task removed | Task removed | Pass |

## 9. Security

The project uses IAM roles with least privilege access. Lambda is allowed to access only the required DynamoDB table. CloudFront provides HTTPS delivery for the frontend.

## 10. Conclusion

The project successfully demonstrates a scalable, cost-effective, and serverless cloud application using AWS services.

