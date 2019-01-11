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
  return Todo.scan().exec();
}

export async function updateTodo(event) {
  let todo = new Todo({ id: event.body.id, task: event.body.task, status: event.body.status });
  try {
    await todo.save();
    return { message: 'Update todo successfully' };
  } catch (err) {
    errorHandler(err);
  }
}

export async function updateStatusTodos(event) {
  try {
    console.log(event.body);
    await Todo.batchPut(event.body);
    return { message: 'Success update status todos' };
  } catch (err) {
    return errorHandler(err);
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

export async function deleteCompletedTodos(event) {
  try {
    await Todo.batchDelete(event.body);
    return { message: 'Success delete completed todos' };
  } catch (err) {
    errorHandler(err);
  }
}
