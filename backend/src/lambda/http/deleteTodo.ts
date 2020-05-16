import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import * as middy from 'middy';
import {cors} from 'middy/middlewares';
import {getUserId} from '../utils';
import {deleteTodoItem} from '../../businessLogic/todos';

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)

  // TODO: Remove a TODO item by id
    await deleteTodoItem(todoId, userId)

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
