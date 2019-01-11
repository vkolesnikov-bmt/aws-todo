import * as dynamoose from 'dynamoose';

const Schema = dynamoose.Schema;

dynamoose.local('http://localhost:8000');

const todoSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  task: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
});

export const Todo = dynamoose.model(`${process.env.TODOS_TABLE}`, todoSchema);

