// ItemListPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

function ItemListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(['Apple', 'Banana', 'Mango', 'Orange']);
  const [search, setSearch] = useState('');
  const [scannedText, setScannedText] = useState('');

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
      <div className="qr-container">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (!!result) {
              const text = result?.text;
              setScannedText(text);
              if (!items.includes(text)) {
                setItems(prev => [...prev, text]);
              }
            }
          }}
          style={{ width: '100%' }}
        />
      </div>

      {scannedText && (
        <p style={{ marginTop: '10px', color: '#333' }}>
          ✅ Scanned: <strong>{scannedText}</strong>
        </p>
      )}

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
