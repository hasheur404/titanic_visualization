import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ background: '#3498db', left: 0,  color: 'white', textAlign: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 1 }}>
      <h1>Titanic Dataset Visualization</h1>
    </header>
  );
};

export default Header;