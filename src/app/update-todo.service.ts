import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateTodoService extends Mutation {

  // constructor() { }
  document = gql``;
  
}
