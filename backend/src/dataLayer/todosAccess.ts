import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';

import {TodoItem} from '../models/TodoItem';

export class TodoAccess {

    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE) {
    }

    async getAllTodoItems(userId: string): Promise<TodoItem[]> {
        console.log('Data Layer getAllTodoItems', userId);

        // TODO: use query to get todo items from user id
        const result = await this.docClient.scan({
            TableName: this.todosTable
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
}
