import React from 'react';

function Navbar({ onImageUpload }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          My App
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <input type="file" id="imgLoader" onChange={onImageUpload} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;