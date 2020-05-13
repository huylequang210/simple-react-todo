import React, { Component } from 'react';
import './styles/styles.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Hi',
      newTodo: '',
      todos: [{
        title: 'Learn React',
        done: false
      },
      {
        title: 'Learn Css',
        done: false
      }]
    }
  }

  newTodoChanged(event) {
    this.setState({
      newTodo: event.target.value
    });
    console.log(this.state.newTodo);
  }
  
  // [...] create a new array and add new object at the end of object
  formSubmitted(e) {
    e.preventDefault();
    this.setState({
      newTodo: '',
      todos: [...this.state.todos, {
        title: this.state.newTodo,
        done: false
      }]
    });
  }

  toggleTodoDone(event, index) {
    const todos = [...this.state.todos];
    todos[index] = {...todos[index]};
    todos[index].done = event.target.checked;
    this.setState({
      todos
    });
  }

  removeTodo(event, index) {
    const todos = [...this.state.todos];
    todos.splice(index,1);
    this.setState({
      todos
    });    
  }
  
  allDone() {
    const todos = this.state.todos.map(todo => {
      return {
        ...todo,
        done: true
      }
    });
    this.setState({
      todos
    })
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <form onSubmit={(event) => this.formSubmitted(event)}>
          <label htmlFor="newTodo">New Todo</label>
          <input 
            onChange={(event) => this.newTodoChanged(event)} 
            type="text" 
            id="newTodo" 
            name="newTodo"
            value={this.state.newTodo} 
          />
          <button type="submit">Add todo</button>
        </form>
        <button onClick={() => this.allDone()}>All Done</button>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <li key={todo.title}>
                <input 
                  onChange={(event) => this.toggleTodoDone(event, index)}
                  type="checkbox"
                  checked={todo.done}
                />
                <span className={todo.done ? 'done' : ''}>{todo.title}</span>
                <button onClick={(event) => this.removeTodo(event, index)}>Remove</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default App;