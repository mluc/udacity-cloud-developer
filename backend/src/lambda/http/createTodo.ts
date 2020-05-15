import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const todosTable = process.env.TODOS_TABLE

const docClient = new AWS.DynamoDB.DocumentClient()

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const todoId = uuid.v4()
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    const newItem = {
        todoId: todoId,
        ...newTodo
    }

    await docClient.put({
        TableName: todosTable,
        Item: newItem
    }).promise()

    return {
        statusCode: 201,
        // headers: {
        //     'Access-Control-Allow-Origin': '*'
        // },
        body: JSON.stringify({
            newItem
        })
    }
})

handler.use(
    cors({
        credentials: true
    })
)
