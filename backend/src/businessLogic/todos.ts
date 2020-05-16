import * as uuid from 'uuid';

import {TodoItem} from '../models/TodoItem';
import {TodoAccess} from '../dataLayer/todosAccess';
import {CreateTodoRequest} from '../requests/CreateTodoRequest';
import {getUserId} from '../lambda/utils';
import {APIGatewayProxyEvent} from 'aws-lambda';
import {UpdateTodoRequest} from '../requests/UpdateTodoRequest';

const todoAccess = new TodoAccess();

export async function getAllTodoItems(userId: string): Promise<TodoItem[]> {
    console.log('Business logic getAllTodoItems ', userId);
    return todoAccess.getAllTodoItems(userId);
}

export async function createTodoItem(
    createTodoRequest: CreateTodoRequest,
    event: APIGatewayProxyEvent): Promise<TodoItem> {

    console.log('Business logic createTodoItem ', createTodoRequest);
    const todoId = uuid.v4();
    const userId = getUserId(event);

    return await todoAccess.createTodoItem({
        todoId: todoId,
        userId: userId,
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false
    });
}

export async function deleteTodoItem(todoId: string, userId: string): Promise<void> {

    console.log('Business logic deleteTodoItem ', todoId, userId);
    await todoAccess.deleteTodoItem(todoId, userId);
}

export async function updateTodoItem(updatedTodo: UpdateTodoRequest, todoId: string, userId: string): Promise<void> {

    console.log('Business logic updateTodoItem ', updatedTodo, userId);
    await todoAccess.updateTodoItem(updatedTodo, todoId, userId);
}


export async function getUploadUrl(imageId: string): Promise<string> {

    console.log('Business logic getUploadUrl ');
    return await todoAccess.getUploadUrl(imageId);
}

export async function todoExists(todoId: string, userId: string): Promise<boolean> {

    console.log('Business logic todoExists ', todoId, userId);
    return await todoAccess.todoExists(todoId, userId);
}

export async function addAttachmentUrl(todoId: string, userId: string, imageId: string): Promise<void> {

    console.log('Business logic addAttachmentUrl ', todoId, userId, imageId);
    await todoAccess.addAttachmentUrl(todoId, userId, imageId);
}
