import gql from 'graphql-tag';
import * as uuid from 'uuid';

export class Todo {
  id: string;
  text: string;
  completed: boolean;
}
export type TodoInput = Partial<Todo>

export type __Todo = Todo & { __typename: string }

export const upload = gql`
  mutation($file: Upload!){
    uploadFile(file: $file){
      path
    }
  }
`;
export const getList = gql`
    query getList {
      todos {
        id
        text
        completed
      }
    }
  `;

export const getItem = gql`
  query getItem ($todoId: Int!){
    todo (todoId: $todoId){
      id
      text
      completed
    }
  }
`;

export const addItem = gql`
  mutation addItem ($todo: TodoInput!){
    addTodo(todo: $todo){
      id
      text
      completed
    }
  }
`;

export const removeItem = gql`
  mutation remoteItem ($todoId: Int!){
    removeTodo(todoId: $todoId) {
      affected
    }
  }
`;

export const updateItem = gql`
  mutation updateItem ($todo: TodoInput!){
    updateTodo(todo: $todo){
      affected
    }
  }
`;
export const _getlist = gql`
    query AllTodos {
      todos @client {
        id
        text
        completed
      }
    }
`;

export const _getItem = gql`
  query Todo($id: String!){
    todo(id: $id) @client{
      id
      text
      completed
    }
  }
`;
export const newTodo: __Todo = {
  id: uuid.v4(),
  text: "sdfsdf",
  completed: false,
  __typename: Todo.name
}

export const typeDefs = gql`
    extend type Todo {
      id: String!
      text: String!
      completed: Boolean!
    }
  
    extend type Query {
      todos: [Todo]
    }
  
    extend type Mutation {
      addTodo(text: String!): Todo
    }
  `

  // export const resolvers = {
  //   Mutation: {
  //     toggleTodo: (_, variables, {cache, getCacheKey}) => {
  //       const id = getCacheKey({__typename: 'Todo', id: variables.id})
  //     }
  //   }
  // }