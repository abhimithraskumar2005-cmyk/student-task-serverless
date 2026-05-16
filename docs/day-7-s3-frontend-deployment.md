# Day 7: Deploy Frontend To Amazon S3

## Goal

Upload the frontend files to Amazon S3 and host them as a static website.

## Files To Upload

Upload these files from the `frontend` folder:

```text
index.html
styles.css
app.js
```

## Recommended Bucket Name

S3 bucket names must be globally unique. Use a name like:

```text
student-task-serverless-abhimithra-2026
```

If that name is already taken, add numbers:

```text
student-task-serverless-abhimithra-2026-01
```

## Step 1: Create S3 Bucket

1. Open AWS Console.
2. Search for **S3**.
3. Click **Create bucket**.
4. Bucket type:

```text
General purpose
```

5. Bucket name:

```text
student-task-serverless-abhimithra-2026
```

6. Region:

```text
Asia Pacific (Mumbai) ap-south-1
```

7. Object Ownership:

```text
ACLs disabled
```

8. Block Public Access:

For simple static website hosting, uncheck:

```text
Block all public access
```

Confirm the warning checkbox.

9. Bucket Versioning:

```text
Disable
```

10. Encryption:

```text
Server-side encryption with Amazon S3 managed keys (SSE-S3)
```

11. Click **Create bucket**.

## Step 2: Upload Frontend Files

1. Open the bucket.
2. Click **Upload**.
3. Click **Add files**.
4. Select:

```text
frontend/index.html
frontend/styles.css
frontend/app.js
```

5. Click **Upload**.

## Step 3: Enable Static Website Hosting

1. Open the bucket.
2. Go to **Properties**.
3. Scroll to **Static website hosting**.
4. Click **Edit**.
5. Choose:

```text
Enable
```

6. Hosting type:

```text
Host a static website
```

7. Index document:

```text
index.html
```

8. Error document:

```text
index.html
```

9. Save changes.

## Step 4: Add Bucket Policy

1. Open the bucket.
2. Go to **Permissions**.
3. Scroll to **Bucket policy**.
4. Click **Edit**.
5. Paste this policy after replacing `YOUR_BUCKET_NAME` with your bucket name:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

6. Save changes.

## Step 5: Open Website Endpoint

1. Go to **Properties**.
2. Scroll to **Static website hosting**.
3. Copy the bucket website endpoint.

It will look like:

```text
http://student-task-serverless-abhimithra-2026.s3-website.ap-south-1.amazonaws.com
```

4. Open it in a browser.
5. Confirm the app loads and shows:

```text
AWS API Mode
```

6. Click **Refresh** and confirm tasks load from DynamoDB.

## Screenshots To Capture

Take these screenshots:

```text
26-s3-bucket-created.png
27-s3-frontend-files-uploaded.png
28-s3-static-website-hosting-enabled.png
29-s3-bucket-policy-public-read.png
30-s3-website-endpoint.png
31-s3-hosted-frontend-working.png
32-s3-hosted-frontend-add-task-success.png
```

Most important screenshots:

- Bucket created in `ap-south-1`
- Uploaded `index.html`, `styles.css`, `app.js`
- Static website hosting enabled with `index.html`
- Bucket policy showing `s3:GetObject`
- Website endpoint open in browser
- S3-hosted frontend showing AWS API Mode and tasks

## Report Explanation

Use this paragraph:

```text
Amazon S3 is used to host the frontend as a static website. The HTML, CSS, and JavaScript files are uploaded to an S3 bucket, and static website hosting is enabled with index.html as the index document. A bucket policy allows public read access to the website files. The hosted frontend communicates with API Gateway to perform task operations through the serverless backend.
```

## Official References

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/EnableWebsiteHosting.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/IndexDocumentSupport.html

