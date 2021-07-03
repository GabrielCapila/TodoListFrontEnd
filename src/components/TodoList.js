import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import mainAPI from '../api/index'



function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = async todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const response = await mainAPI.post('/api/Tarefas',
      {
        nome: todo.text,
        isComplete: false
      })
    todo.id = response.data.id
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = async (todoId, newValue) => {

    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    await mainAPI.put('/api/Tarefas',
      {
        id: todoId,
        nome: newValue.text,
        isComplete: false
      })
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = async id => {
    await mainAPI.delete(`/api/Tarefas/${id}`)
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(async todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
        await mainAPI.put('/api/Tarefas',
      {
        id: todo.id,
        nome: todo.text,
        isComplete: todo.isComplete
      })
      
      return todo;
    });
    console.log(updatedTodos)
    setTodos(updatedTodos);

  };

  return (
    <>
      <h1>Quais são as tarefas de hoje?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
