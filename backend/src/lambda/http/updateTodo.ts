import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import * as AWS from 'aws-sdk';

const todosTable = process.env.TODOS_TABLE

const docClient = new AWS.DynamoDB.DocumentClient()

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

    await docClient.update({
        TableName: todosTable,
        Key: {todoId: todoId}, //TODO: add userId
        UpdateExpression: "set #n = :n, dueDate=:dd, done=:d",
        ExpressionAttributeValues: {
            ":n": updatedTodo.name,
            ":dd": updatedTodo.dueDate,
            ":d": updatedTodo.done
        },
        ExpressionAttributeNames: {
            "#n": "name"
        },
        ReturnValues:"UPDATED_NEW"
    }).promise();

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    return {
        statusCode: 200,
        body: JSON.stringify({
        })
    }
});

handler.use(
    cors({
        credentials: true
    })
)
