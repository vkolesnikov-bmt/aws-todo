import { v1 as uuid } from 'uuid';

import { Todo } from '../../models/todo';
import { errorHandler } from '../helper/error-handler';


export async function createTodo(event) {
  // var todo = new Todo({id: uuid(), task: event.body.task});
  // return todo.save()
  return Todo.create({ id: uuid(), task: event.body.task })
    .then(() => 'Create invoke successfully')
    .catch((error) => errorHandler(error));
}

export async function getTodo() {
  return Todo.scan().exec();
}

export async function updateTodo(event) {
  let todo = new Todo({ id: event.body.id, task: event.body.task, status: event.body.status });
  return todo.save()
    .then(() => 'Update todo successfully')
    .catch((error) => errorHandler(error));
}

export async function updateStatusTodos(event) {
  try {
    console.log(event.body);
    await Todo.batchPut(event.body);
    return 'Success update status todos';
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
    return 'Success delete todos';
  } catch (err) {
    errorHandler(err);
  }
}

//????????=====delete this function=====????????
export async function deleteCompletedTodos(event) {
  try {
    await Todo.batchDelete(event.body);
    return 'Success delete completed todos';
  } catch (err) {
    errorHandler(err);
  }
}
