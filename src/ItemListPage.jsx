import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ItemListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(['Apple', 'Banana', 'Mango', 'Orange']);
  const [search, setSearch] = useState('');

  const handleDelete = (itemToDelete) => {
    setItems(items.filter(item => item !== itemToDelete));
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const filteredItems = items.filter(item => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="item-container">
      <h2 className="item-title">🍉 Your Item Manager</h2>
      <input
        type="text"
        className="item-search"
        placeholder="🔍 Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} className="item-row">
              <span>{item}</span>
              <button className="delete-btn" onClick={() => handleDelete(item)}>Delete</button>
            </li>
          ))
        ) : (
          <li className="no-items">No items found</li>
        )}
      </ul>
      <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
}

export default ItemListPage;