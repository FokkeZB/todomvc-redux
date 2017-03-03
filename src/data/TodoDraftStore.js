import TodoActionTypes from './TodoActionTypes';

const TodoDraftStore = (state, action) => {
  if (typeof state === 'undefined') {
    return '';
  }
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return '';
    case TodoActionTypes.UPDATE_DRAFT:
      return action.text;
    default:
      return state;
  }
}

export default TodoDraftStore;