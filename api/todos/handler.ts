import { promisify } from 'util';
import {v1 as uuid} from 'uuid'

import {Todo} from '../../models/todo';
import {errorHandler} from '../helper/error-handler';


export async function createTodo(event){
  console.log(event);
  var todo = new Todo({id: uuid(), task: event.body.task});
  // Todo.create({id: event.body.id, task: event.body.task})
  return todo.save()
    .then(()=>'Create invoke successfully')
    .catch((error)=>errorHandler(error))
}

export async function getTodo(){
  return Todo.batchGet([{status:false}])
   //
   // .then((todos)=>console.log(todos))
   // .catch((error)=> errorHandler(error))
}

export async function updateTodo(event){
  var todo = new Todo({id: event.body.id, task: event.body.task, status: event.body.status});
  return todo.save()
    .then(()=>'Update todo successfully')
    .catch((error)=> errorHandler(error))
}

export async function deleteTodo(event){
  console.log(event.path.id);
  Todo.delete({id: event.path.id})
    .then(()=> 'Delete OK')
   .catch((error)=> errorHandler(error))
}

export async function deleteAllTodo(event){

}

export async function createCompletedTodo(event){

}
