import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';

import {TodoItem} from '../models/TodoItem';
import {UpdateTodoRequest} from '../requests/UpdateTodoRequest';

export class TodoAccess {

    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly indexName = process.env.INDEX_NAME,
        private readonly todosTable = process.env.TODOS_TABLE) {
    }

    async getAllTodoItems(userId: string): Promise<TodoItem[]> {
        console.log('Data Layer getAllTodoItems', userId);

        // TODO: use query to get todo items from user id
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.indexName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise();

        const items = result.Items;
        return items as TodoItem[];
    }

    async createTodoItem(todoItem: TodoItem): Promise<TodoItem> {
        console.log('Data Layer createTodoItem', todoItem);
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todoItem
        }).promise();

        return todoItem;
    }

    async deleteTodoItem(todoId: string, userId: string): Promise<void> {
        console.log('Data Layer deleteTodoItem', todoId, userId);
        await this.docClient.delete({
            TableName: this.todosTable,
            Key: {todoId: todoId, userId: userId}
        }).promise();

    }

    async updateTodoItem(updatedTodo: UpdateTodoRequest, todoId: string, userId: string): Promise<void> {
        console.log('Data Layer updateTodoItem', updatedTodo, todoId, userId);

        await this.docClient.update({
            TableName: this.todosTable,
            Key: {todoId: todoId, userId: userId},
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

    }
}
