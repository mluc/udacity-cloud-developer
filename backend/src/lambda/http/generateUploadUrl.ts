import 'source-map-support/register';

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import * as middy from 'middy';
import {cors} from 'middy/middlewares';
import {addAttachmentUrl, getUploadUrl, todoExists} from '../../businessLogic/todos';
import * as uuid from 'uuid';
import {getUserId} from '../utils';

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event);
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event)
    const validTodoId = await todoExists(todoId, userId)
    if (!validTodoId) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: 'Todo does not exist'
            })
        }
    }

    const imageId = uuid.v4();
    const url = await getUploadUrl(imageId)

    await addAttachmentUrl(todoId, userId, imageId)

    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    return {
        statusCode: 201,
        body: JSON.stringify({
            uploadUrl: url
        })
    }
});

handler.use(
    cors({
        credentials: true
    })
);


