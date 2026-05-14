# GitHub Upload Steps

## Step 1: Create A GitHub Repository

Create a new repository on GitHub with this name:

```text
student-task-serverless
```

Recommended settings:

- Public or private: either is fine, based on college requirement
- Add README: no, because this project already has one
- Add `.gitignore`: no, because this project already has one
- License: optional

## Step 2: Push Local Project

After creating the GitHub repository, copy its repository URL. It will look like:

```text
https://github.com/YOUR_USERNAME/student-task-serverless.git
```

Then run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/student-task-serverless.git
git branch -M main
git push -u origin main
```

## Step 3: Keep Updating GitHub

After each major change:

```bash
git add .
git commit -m "Describe your change"
git push
```

## Suggested Commit Plan

Use clear commits like:

```text
Initial project structure
Add frontend task dashboard
Add Lambda backend handlers
Add AWS setup documentation
Connect frontend to API Gateway
Add deployment screenshots and report files
```

## What To Show In Submission

Submit the GitHub repository link in your final report and PPT. During viva, open the repository and show:

- Frontend folder
- Lambda backend code
- AWS setup checklist
- Architecture diagram
- README file

