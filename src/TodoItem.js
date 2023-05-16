import React, { useState } from 'react';

function TodoItem({ todo, index, onEdit, onToggleComplete, onRemove }) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleCheckboxChange = () => {
    onToggleComplete(index);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    onEdit(index, editedText, dueDate);
    setEditMode(false);
  };

  const handleRemoveClick = () => {
    onRemove(index);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  return (
    <ul>
      <input type="checkbox" checked={todo.completed} onChange={handleCheckboxChange} />

      {editMode ? (
        <>
          <input type="text" value={editedText} onChange={handleTextChange} />
          <input type="date" value={dueDate} onChange={handleDueDateChange} />
          <button onClick={handleSaveClick}>Uložit</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <span>{dueDate}</span>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}

      <button onClick={handleRemoveClick}>Odstranit</button>
    </ul>
  );
}

export default TodoItem;
