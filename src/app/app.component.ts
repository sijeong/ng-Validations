import { Apollo } from 'apollo-angular';
import { pluck, tap } from 'rxjs/operators';
import * as uuid from 'uuid';

import { Component, OnInit } from '@angular/core';

import { __Todo, _getlist, newTodo, getList, Todo, _getItem, getItem, addItem, removeItem, updateItem } from './todos';
import { UpdateTodoService } from './update-todo.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos$: Observable<any>;
  //  = this.apollo.watchQuery({
  //   query: getList,

  // }).valueChanges.pipe(

  // );

  //  = this.apollo.watchQuery<__Todo[]>({
  //   query: _getlist
  // }).valueChanges.pipe(
  //   pluck("data", "todos"),
  //   tap(d => console.log(d))
  // );

  todo$: Observable<any>;
  //  = this.apollo.watchQuery<__Todo>({
  //   query: _getItem,
  //   variables: { id: "2d5401a5-5f17-4abd-af36-94f6ed428d29" }
  // }).valueChanges.pipe(
  //   tap(d => console.log(d))
  // );

  new_todo$: Observable<any>;

  op_result$: Observable<any>;

  selectedId: number;
  selectedId_: number;
  todoForm = this.fb.group({
    text: [''],
    completed: ['']
  })
  onkey(value: string) {
    this.selectedId = +value;
  }
  onkeyd(value: string) {
    this.selectedId_ = +value;
  }
  constructor(private apollo: Apollo, private fb: FormBuilder, private rfb: RxFormBuilder) {
    this.apollo.getClient().writeData({
      data: {
        todos: [newTodo]
      }
    })
  }

  xForm = this.rfb.group({
    text: ['', RxwebValidators.required,],
    completed: ['', RxwebValidators.required],
    another: ['' ,RxwebValidators.creditCard]
  })
  
  ngOnInit(): void {
    const t: __Todo = {
      id: "2d5401a5-5f17-4abd-af36-94f6ed428d29",
      text: "",
      completed: false,
      __typename: Todo.name
    }

    this.__addTodo(t);


  }
  getTodos() {
    this.todos$ = this.apollo.watchQuery({
      query: getList,

    }).valueChanges.pipe(

    );
  }

  getTodo() {
    this.todo$ = this.apollo.watchQuery({
      query: getItem,
      variables: { todoId: this.selectedId }
    }).valueChanges.pipe(

    );
  }

  addTodo() {
    this.new_todo$ = this.apollo.mutate({
      mutation: addItem,
      variables: {
        todo: {
          text: "111",
          completed: false
        }
      },
      // update:(store, {data:{addTodo}}) => {
      //   console.log(addTodo);
      //   const data = store.readQuery({query: getList})
      //   data.todos.push(addTodo);
      //   store.writeQuery({query: getList, data})
      // }
    }).pipe(

    )
  }

  removeTodo() {
    this.op_result$ = this.apollo.mutate({
      mutation: removeItem,
      variables: { todoId: this.selectedId_ },
      update: () => {
        const id = this.selectedId
      }
    }).pipe(

    )
  }

  updateTodo() {
    this.apollo.mutate({
      mutation: updateItem,
      variables: {},
      update: () => {
        const todo = this.new_todo$
      }
    })
  }
  __addTodo(t: __Todo) {
    const data = this.apollo.getClient().readQuery({ query: getList });
    this.apollo.getClient().writeQuery({
      query: getList, data: {
        todos: [...data.todos, t]
      }
    });
  }

  __deleteTodo(id: number) {
    const data = this.apollo.getClient().readQuery({ query: getList }).filter(t => t !== id);
    this.apollo.getClient().writeQuery({
      query: getList, data: {
        todos: [...data.todos]
      }
    })

  }

  createFormGroup() {
    return new FormGroup({
      text: new FormControl(),
      completed: new FormControl()
    })
  }

  onSubmit() {

  }
  // addTodo(t: __Todo) {
  //   this.apollo.mutate({
  //     mutation: gql``,
  //     variables: {

  //     },
  //     optimisticResponse: {

  //     },
  //     update: () => {

  //     },
  //     updateQueries: {

  //     },
  //     refetchQueries: []
  //   })
  // }

  // anoter(){
  //   this.update.mutate({
  //     title: ""
  //   }, {
  //     updateQueries: {

  //     },
  //     update: (cache, {data}) => {
  //       console.log('snackbar Point')
  //       const pre:__Todo[] = cache.readQuery({
  //         query: gql``
  //       })

  //       const newT = data

  //       cache.writeQuery({
  //         query: gql``,
  //         data: {todos: [...pre, newT]}
  //       })
  //     }
  //   })
  // }

}
