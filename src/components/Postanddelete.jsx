import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

function Postanddelete() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newJob, setNewJob] = useState('');
  const [createdItem, setCreatedItem] = useState(null);

  const handleCreateItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://reqres.in/api/users', {
        name: newItem,
        job: newJob,
      });

      setList([...list, response.data]);
      setNewItem('');
      setNewJob('');
      setCreatedItem(response.data);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleDeleteItem = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setList(list.filter((item) => item.id !== userId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateItem}>
        <input
          type="text"
          placeholder="New name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="text"
          placeholder="New job"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      {createdItem && (
        <div>
          <h2>New Item Added:</h2>
          <p>Name: {createdItem.name}</p>
          <p>Job: {createdItem.job}</p>
          <p>ID: {createdItem.id}</p>
          <p>Created At: {createdItem.createdAt}</p>
        </div>
      )}
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} - {item.job}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Postanddelete;
