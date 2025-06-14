import React, { useState } from 'react';
import './App.css';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!task.trim()) return;

    const updatedTodos = [...todos];
    if (editIndex !== null) {
      updatedTodos[editIndex] = task;
      setEditIndex(null);
    } else {
      updatedTodos.push(task);
    }

    setTodos(updatedTodos);
    setTask('');
  };

  const handleEdit = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    // If deleting the task currently being edited
    if (index === editIndex) {
      setTask('');
      setEditIndex(null);
    } else if (index < editIndex) {
      setEditIndex((prev) => prev - 1);
    }

    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleCancelEdit = () => {
    setTask('');
    setEditIndex(null);
  };

  return (
    <div className="todo-container">
      <div className="todo-box">
        <h2>📝 Todo App</h2>
        <div className="input-section">
          <input
            type="text"
            value={task}
            placeholder="Enter a task..."
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddOrUpdate}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
          {editIndex !== null && (
            <button className="cancel" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>

        <ul className="todo-list">
          {todos.map((item, index) => (
            <li key={index} className="todo-item">
              <span>{item}</span>
              <div>
                <button className="edit" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
