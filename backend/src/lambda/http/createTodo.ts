import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodoItem } from '../../businessLogic/todos'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    const newItem = await createTodoItem(newTodo, event)

    return {
        statusCode: 201,
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
