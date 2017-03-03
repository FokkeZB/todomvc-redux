import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import TodoActions from '../data/TodoActions';

const ENTER_KEY_CODE = 13;

function AppView() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header id="header">
      <h1>todos</h1>
      <NewTodo />
    </header>
  );
}

const Main = connect(
  (state) => ({
    todos: [...state.todos.values()].reverse(),
    areAllComplete: state.todos.every(todo => todo.complete)
  }),
  (dispatch) => ({
    toggleAllTodos: () => dispatch(TodoActions.toggleAllTodos())
  })
)(function Main(props) {

  if (props.todos.size === 0) {
    return null;
  }

  return (
    <section id="main">
      <input
        checked={props.areAllComplete ? 'checked' : ''}
        id="toggle-all"
        type="checkbox"
        onChange={props.toggleAllTodos}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
      <ul id="todo-list">
        {props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
})

const Footer = connect(
  (state) => {
    const remaining = state.todos.filter(todo => !todo.complete).size;
    return {
      todos: state.todos,
      remaining,
      completed: state.todos.size - remaining
    }
  },
  (dispatch) => ({
    deleteCompletedTodos: () => dispatch(TodoActions.deleteCompletedTodos())
  })
)((props) => {

  if (props.todos.size === 0) {
    return null;
  }

  const phrase = props.remaining === 1 ? ' item left' : ' items left';

  let clearCompletedButton = null;
  if (props.completed > 0) {
    clearCompletedButton =
      <button
        id="clear-completed"
        onClick={props.deleteCompletedTodos}>
        Clear completed ({props.completed})
      </button>
  }

  return (
    <footer id="footer">
      <span id="todo-count">
        <strong>
          {props.remaining}
        </strong>
        {phrase}
      </span>
      {clearCompletedButton}
    </footer>
  );
})

const NewTodo = connect(
  (state) => ({
    draft: state.draft
  }),
  (dispatch) => {
    return {
      addTodo: (text) => dispatch(TodoActions.addTodo(text)),
      onChange: (event) => dispatch(TodoActions.updateDraft(event.target.value))
    }
  },
  (stateProps, dispatchProps, ownProps) => {
    const stateDependentDispatches = {
      addTodo: dispatchProps.addTodo.bind(null, stateProps.draft)
    };
    stateDependentDispatches.onKeyDown = (event) => {
      if (event.keyCode === ENTER_KEY_CODE) {
        stateDependentDispatches.addTodo();
      }
    };
    return Object.assign({}, ownProps, stateProps, dispatchProps, stateDependentDispatches);
  }
)((props) => (
  <input
    autoFocus={true}
    id="new-todo"
    placeholder="What needs to be done?"
    value={props.draft}
    onBlur={props.addTodo}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
  />
));

const TodoItem = connect(
  (state, ownProps) => ({
    editing: state.edit,
    isEditing: state.edit === ownProps.todo.id
  }),
  (dispatch, ownProps) => {
    const dispatchProps = {
      onDeleteTodo: () => dispatch(TodoActions.deleteTodo(ownProps.todo.id)),
      onStartEditingTodo: () => {
        console.log('DC!');
        dispatch(TodoActions.startEditingTodo(ownProps.todo.id))
      },
      onToggleTodo: () => dispatch(TodoActions.toggleTodo(ownProps.todo.id)),
      onStopEditingTodo: () => dispatch(TodoActions.stopEditingTodo()),
      onChange: (event) => dispatch(TodoActions.editTodo(ownProps.todo.id, event.target.value))
    }
    dispatchProps.onKeyDown = (event) => {
      if (event.keyCode === ENTER_KEY_CODE) {
        dispatchProps.onStopEditingTodo();
      }
    }
    return dispatchProps;
  }
)((props) => {
  const {isEditing, editing, todo} = props;

  // Construct the input for editing a task if necessary.
  let input = null;
  if (isEditing) {
    input =
      <input
        autoFocus={true}
        className="edit"
        value={todo.text}
        onBlur={props.onStopEditingTodo}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />;
  }

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.complete}
          onChange={props.onToggleTodo}
        />
        <label onDoubleClick={props.onStartEditingTodo}>
          {todo.text}
        </label>
        <button className="destroy" onClick={props.onDeleteTodo} />
      </div>
      {input}
    </li>
  );
})

export default AppView;
