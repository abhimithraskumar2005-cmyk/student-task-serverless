# Day 3: DynamoDB Setup

## Goal

Create the cloud database table for the student task management system.

## Table Design

Table name:

```text
StudentTasks
```

Primary key:

```text
Partition key: userId
Sort key: taskId
```

Both keys should use type:

```text
String
```

Billing mode:

```text
On-demand
```

## Why This Design Is Good

Each student/user gets a unique `userId`. Every task created by that user gets a unique `taskId`.

This lets the backend query all tasks for one user efficiently:

```text
Get all tasks where userId = current user
```

This is better than scanning the full table because it is faster, cheaper, and more scalable.

## Item Structure

Each task item will look like this:

```json
{
  "userId": "demo-student",
  "taskId": "task-001",
  "title": "Create DynamoDB table",
  "description": "Create StudentTasks table with userId and taskId keys",
  "status": "Pending",
  "deadline": "2026-05-18",
  "createdAt": "1778773374",
  "updatedAt": "1778773374"
}
```

## AWS Console Steps

1. Open AWS Console:

```text
https://console.aws.amazon.com
```

2. Search for:

```text
DynamoDB
```

3. Open **DynamoDB**.

4. In the left menu, choose **Tables**.

5. Click **Create table**.

6. Enter table name:

```text
StudentTasks
```

7. Enter partition key:

```text
userId
```

Select type:

```text
String
```

8. Enable/add sort key.

9. Enter sort key:

```text
taskId
```

Select type:

```text
String
```

10. In table settings, choose:

```text
Customize settings
```

11. For read/write capacity settings, choose:

```text
On-demand
```

12. Keep encryption as default AWS owned key.

13. Click **Create table**.

14. Wait until table status becomes:

```text
Active
```

## AWS CLI Option

If AWS CLI is configured, you can create the table using:

```bash
aws dynamodb create-table --cli-input-json file://aws/dynamodb-create-table.json --region ap-south-1
```

Check table status:

```bash
aws dynamodb describe-table --table-name StudentTasks --region ap-south-1
```

## Screenshots To Capture

Take screenshots of:

- DynamoDB table list showing `StudentTasks`
- Table overview showing status `Active`
- Primary key details showing `userId` and `taskId`
- Capacity mode showing on-demand

Save screenshots with names like:

```text
01-dynamodb-table-created.png
02-dynamodb-primary-key.png
03-dynamodb-capacity-mode.png
```

## Report Explanation

Use this paragraph in your report:

```text
Amazon DynamoDB is used as the NoSQL database for storing student task records. The table StudentTasks uses userId as the partition key and taskId as the sort key. This composite primary key allows all tasks of a specific user to be queried efficiently without scanning the entire table. The table uses on-demand billing mode, which automatically handles read and write capacity based on application traffic.
```

