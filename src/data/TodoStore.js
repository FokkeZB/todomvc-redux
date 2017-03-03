import Immutable from 'immutable';

import TodoActionTypes from './TodoActionTypes';
import Counter from './Counter';
import Todo from './Todo';

const TodoStore = (state, action) => {
  if (typeof state === 'undefined') {
    return Immutable.OrderedMap();
  }
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      // Don't add todos with no text.
      if (!action.text) {
        return state;
      }
      const id = Counter.increment();
      return state.set(id, new Todo({
        id,
        text: action.text,
        complete: false,
      }));
    case TodoActionTypes.DELETE_TODO:
      return state.delete(action.id);
    case TodoActionTypes.EDIT_TODO:
      return state.update(
        action.id,
        todo => todo.set('text', action.text),
      );
    case TodoActionTypes.TOGGLE_TODO:
      return state.update(
        action.id,
        todo => todo.set('complete', !todo.complete),
      );
    case TodoActionTypes.DELETE_COMPLETED_TODOS:
      return state.filter(todo => !todo.complete);
    case TodoActionTypes.TOGGLE_ALL_TODOS:
      const complete = !!state.filter(todo => !todo.complete).size;
      return state.map(todo => todo.set('complete', complete));
    default:
      return state;
  }
}

export default TodoStore