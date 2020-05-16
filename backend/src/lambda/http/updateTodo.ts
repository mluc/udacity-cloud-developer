import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import {updateTodoItem} from '../../businessLogic/todos';
import {getUserId} from '../utils';


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
    const userId = getUserId(event)

    await updateTodoItem(updatedTodo, todoId, userId)

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
