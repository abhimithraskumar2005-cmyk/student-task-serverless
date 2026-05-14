import json
import os
import time
import uuid

import boto3
from boto3.dynamodb.conditions import Key


dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ.get("TABLE_NAME", "StudentTasks"))


def response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        },
        "body": json.dumps(body),
    }


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method") or event.get("httpMethod")

    if method == "OPTIONS":
        return response(204, {})

    try:
        if method == "POST":
            return create_task(event)
        if method == "GET":
            return get_tasks(event)
        if method == "PUT":
            return update_task(event)
        if method == "DELETE":
            return delete_task(event)

        return response(405, {"message": "Method not allowed"})
    except Exception as error:
        print(f"ERROR: {error}")
        return response(500, {"message": "Internal server error"})


def read_body(event):
    raw_body = event.get("body") or "{}"
    return json.loads(raw_body)


def path_task_id(event):
    path_params = event.get("pathParameters") or {}
    return path_params.get("taskId")


def query_user_id(event):
    query_params = event.get("queryStringParameters") or {}
    return query_params.get("userId")


def create_task(event):
    body = read_body(event)
    user_id = body.get("userId")
    title = body.get("title")

    if not user_id or not title:
        return response(400, {"message": "userId and title are required"})

    now = str(int(time.time()))
    item = {
        "userId": user_id,
        "taskId": str(uuid.uuid4()),
        "title": title,
        "description": body.get("description", ""),
        "status": body.get("status", "Pending"),
        "deadline": body.get("deadline", ""),
        "createdAt": now,
        "updatedAt": now,
    }

    table.put_item(Item=item)
    return response(201, {"task": item})


def get_tasks(event):
    user_id = query_user_id(event)
    if not user_id:
        return response(400, {"message": "userId query parameter is required"})

    result = table.query(KeyConditionExpression=Key("userId").eq(user_id))
    return response(200, {"tasks": result.get("Items", [])})


def update_task(event):
    body = read_body(event)
    user_id = body.get("userId")
    task_id = path_task_id(event)

    if not user_id or not task_id:
        return response(400, {"message": "userId and taskId are required"})

    table.update_item(
        Key={"userId": user_id, "taskId": task_id},
        UpdateExpression=(
            "SET title = :title, description = :description, "
            "#taskStatus = :status, deadline = :deadline, updatedAt = :updatedAt"
        ),
        ExpressionAttributeNames={"#taskStatus": "status"},
        ExpressionAttributeValues={
            ":title": body.get("title", ""),
            ":description": body.get("description", ""),
            ":status": body.get("status", "Pending"),
            ":deadline": body.get("deadline", ""),
            ":updatedAt": str(int(time.time())),
        },
    )

    return response(200, {"message": "Task updated"})


def delete_task(event):
    user_id = query_user_id(event)
    task_id = path_task_id(event)

    if not user_id or not task_id:
        return response(400, {"message": "userId and taskId are required"})

    table.delete_item(Key={"userId": user_id, "taskId": task_id})
    return response(200, {"message": "Task deleted"})

