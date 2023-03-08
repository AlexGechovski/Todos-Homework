import './App.css';
import { useState } from 'react';
import { FormCreator } from './components/todo-creator';
import { TodoItem } from './components/todo-item/todo-item';
import json from './todos.json';

function App() {
  const [Todos, setTodos] = useState(json.filter(todo => !todo.isDone));
  const [readyTodos, setreadyTodos] = useState(json.filter(todo => todo.isDone));


  const editTodos = (index, newTitle) => {
    const tds = [...Todos];
    tds[index].title = newTitle;
    setTodos(tds);
  }

  const editReadyTodos = (index, newTitle) => {
    const tds = [...readyTodos];
    tds[index].title = newTitle;
    setreadyTodos(tds);
  }

  const checkTodos = (index) => {
    const tds = [...Todos];
    const todo = tds[index];
    todo.isDone = true;
    removeTodo(index);
    setreadyTodos([...readyTodos, todo]);
  }

  const addTodo = (title) => {
    setTodos([...Todos, { title, isDone: false }])
  }

  const removeTodo = (index) => {
    const tds = [...Todos];
    tds.splice(index, 1);
    setTodos(tds);
  };

  const removeReadyTodos = (index) => {
    const tds = [...readyTodos];
    tds.splice(index, 1);
    setreadyTodos(tds);
  };


  const checkCompletedTodo = (index) => {
    const tds = [...readyTodos];
    const todo = tds[index];
    todo.isDone = false;
    removeReadyTodos(index);
    setTodos([...Todos, todo]);
  }

  return (
    <div className="App">
      <h1>Todo app</h1>
      <hr />
      <FormCreator createTodo={addTodo} />
      <div className='columns-frame'>
        <div>
          <h3>Tasks</h3>
          {
            Todos.map((todo, index) => {
              return (
                <TodoItem
                  key={index}
                  itemIndex={index}
                  removeItem={removeTodo}
                  editItem={editTodos}
                  title={todo.title}
                  index={index}
                  checkItem={() => checkTodos(index)}
                />
              );
            })
          }
        </div>
        <div>
          <h3>Ready Tasks</h3>
          {
            readyTodos.map((todo, index) => {
              return (
                <TodoItem
                  key={index}
                  itemIndex={index}
                  removeItem={removeReadyTodos}
                  editItem={editReadyTodos}
                  title={todo.title}
                  index={index}
                  checkItem={() => checkCompletedTodo(index)}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
