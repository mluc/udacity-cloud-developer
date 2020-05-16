import * as uuid from 'uuid';

import {TodoItem} from '../models/TodoItem';
import {TodoAccess} from '../dataLayer/todosAccess';
import {CreateTodoRequest} from '../requests/CreateTodoRequest';
import {getUserId} from '../lambda/utils';
import {APIGatewayProxyEvent} from 'aws-lambda';

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
    await todoAccess.deleteTodoItem(todoId,userId);
}
