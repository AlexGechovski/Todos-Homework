import './todo-item.css';
import React, { useState } from 'react';

export function TodoItem({ title, checkItem, removeItem, editItem, index }) {
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(null);

  return (
    <div className="todo__item">
      <input type="checkbox" onChange={checkItem} />
      { title }
      <button onClick={removeItem}>X</button>
      <button onClick={() => setShow(true)}>Change</button>
        {show && (
          <form>
              <label>
                Input Field:
                <input
                  type="text"
                  onChange={e => setNewTitle(e.target.value)}
                />
              </label>
              <button type="submit" onClick={() => {editItem(index, newTitle); setShow(false);}}>Submit</button>
          </form>
        )}
    </div>
  )
}