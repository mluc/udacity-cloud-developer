import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import * as middy from 'middy';
import {cors} from 'middy/middlewares';
import * as AWS from 'aws-sdk';

const todosTable = process.env.TODOS_TABLE

const docClient = new AWS.DynamoDB.DocumentClient()

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
    await docClient.delete({
        TableName: todosTable,
        Key: {todoId: todoId} //TODO: add userId
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
        })
    }
})

handler.use(
    cors({
        credentials: true
    })
)
