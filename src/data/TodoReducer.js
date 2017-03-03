import { combineReducers } from 'redux'

import TodoStore from './TodoStore'
import TodoEditStore from './TodoEditStore'
import TodoDraftStore from './TodoDraftStore'

const TodoReducer = combineReducers({
  todos: TodoStore,
  edit: TodoEditStore,
  draft: TodoDraftStore
})

export default TodoReducer