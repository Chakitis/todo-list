import React, { useState, useMemo } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedDueDate, setSelectedDueDate] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleDueDateChange = (e) => {
    setSelectedDueDate(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue !== '') {
      const newTodo = {
        text: inputValue,
        completed: false,
        dueDate: selectedDueDate,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setSelectedDueDate('');
    }
  };
  
  
  const handleEditTodo = (index, newText, newDueDate) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    updatedTodos[index].dueDate = newDueDate;
    setTodos(updatedTodos);
  };
  
  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };
  
  const handleRemoveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
  const handleToggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredTodos = useMemo(() => {
    return showCompleted ? todos : todos.filter(todo => !todo.completed);
  }, [todos, showCompleted]);
  
  return (
    <div>
      <h2>Todo List</h2>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <input type="date" value={selectedDueDate} onChange={handleDueDateChange} />
      <button onClick={handleAddTodo}>Přidej záznam</button>
      
      <button onClick={handleToggleShowCompleted}>
        {showCompleted ? 'Schovej ukončené' : 'Ukaž ukončené'}
      </button>
      <ul>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            onEdit={handleEditTodo}
            onRemove={handleRemoveTodo}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
