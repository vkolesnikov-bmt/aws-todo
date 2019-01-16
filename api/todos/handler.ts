import { v1 as uuid } from 'uuid';

import { Todo } from '../../models/todo';
import { errorHandler } from '../helper/error-handler';


export async function createTodo(event) {
  try {
    const newTodo = { id: uuid(), task: event.body.task, status: false };
    await Todo.create(newTodo);
    return { message: 'Successfully create', todo: newTodo };
  } catch (err) {
    errorHandler(err);
  }
}

export async function getTodo() {
  try {
    const list = await Todo.scan().exec();
    return { message: 'Get todos list success', data: list };
  } catch (err) {
    errorHandler(err);
  }

}

export async function updateTodo(event) {
  try {
    await Todo.update({ id: event.body.id }, { task: event.body.task, status: event.body.status });
    return { message: 'Update todo successfully' };
  } catch (err) {
    errorHandler(err);
  }
}

export async function updateStatusTodos(event) {
  try {
    await Todo.batchPut(event.body);
    return { message: 'Success update status todos', data: event.body };
  } catch (err) {
    errorHandler(err);
  }
}

export async function deleteTodo(event) {
  try {
    await Todo.delete({ id: event.path.id });
    return { message: 'Success delete' };
  } catch (err) {
    errorHandler(err);
  }
}

export async function deleteAllTodos(event) {
  try {
    await Todo.batchDelete(event.body);
    return { message: 'Success delete todos' };
  } catch (err) {
    errorHandler(err);
  }
}

