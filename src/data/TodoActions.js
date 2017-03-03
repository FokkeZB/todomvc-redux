import TodoActionTypes from './TodoActionTypes';

const Actions = {
  addTodo: (text) => ({
    type: TodoActionTypes.ADD_TODO,
    text,
  }),

  deleteTodo: (id) => ({
    type: TodoActionTypes.DELETE_TODO,
    id,
  }),

  toggleTodo: (id) => ({
    type: TodoActionTypes.TOGGLE_TODO,
    id,
  }),

  updateDraft: (text) => ({
    type: TodoActionTypes.UPDATE_DRAFT,
    text,
  }),

  deleteCompletedTodos: () => ({
    type: TodoActionTypes.DELETE_COMPLETED_TODOS
  }),

  toggleAllTodos: () => ({
    type: TodoActionTypes.TOGGLE_ALL_TODOS
  }),

  editTodo: (id, text) => ({
    type: TodoActionTypes.EDIT_TODO,
    id,
    text,
  }),

  startEditingTodo: (id) => ({
    type: TodoActionTypes.START_EDITING_TODO,
    id,
  }),

  stopEditingTodo: () => ({
    type: TodoActionTypes.STOP_EDITING_TODO,
  }),
};

export default Actions;