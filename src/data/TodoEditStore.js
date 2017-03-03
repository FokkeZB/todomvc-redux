import TodoActionTypes from './TodoActionTypes';

const TodoEditStore = (state, action) => {
  if (typeof state === 'undefined') {
    return '';
  }
  switch (action.type) {
    case TodoActionTypes.START_EDITING_TODO:
      return action.id;
    case TodoActionTypes.STOP_EDITING_TODO:
      return '';
    default:
      return state;
  }
}

export default TodoEditStore