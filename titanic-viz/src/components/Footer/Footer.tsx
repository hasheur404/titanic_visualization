import React from 'react';
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#3498db', left: 0, color: 'white', textAlign: 'center', position: 'fixed', width: '100%', bottom: 0 }}>
      <p><img src={reactLogo} className="logo react" alt="React logo" />Build Using React & Vite<img src={viteLogo} className="logo react" alt="React logo" /></p>
    </footer>
  );
};

export default Footer;