import { State } from '@loona/angular';

@State({
    defaults: {
        completed: [
            {
                id: 1,
                text: "t1",
                completed: false,
                __typename: "Todo"
            }
        ],
        active: []
    }
})
export class TodosState {

}