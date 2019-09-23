import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LOONA_CACHE, LoonaLink, LoonaModule } from '@Loona/angular';

import { TodosState } from './todos/todos.state';

const uri = 'http://localhost:4000'; // <-- add the URL of the GraphQL server here
export function createApollo(
  httpLink: HttpLink,
  loonaLink: LoonaLink,
  cache: InMemoryCache
): ApolloClientOptions<any> {
  const link = loonaLink.concat(httpLink.create({
    uri: uri
  }))
  return {
    link: loonaLink,
    cache,
    resolvers: {},
    connectToDevTools: true
  };
}

@NgModule({
  imports: [CommonModule, LoonaModule.forRoot([TodosState])],
  exports: [ApolloModule, HttpLinkModule, LoonaModule],
  providers: [
    {
      provide: LOONA_CACHE,
      useFactory() {
        return new InMemoryCache();
      }
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, LoonaLink, LOONA_CACHE],
    },
  ],
})
export class GraphQLModule { }
