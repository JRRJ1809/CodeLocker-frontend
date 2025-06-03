import React from 'react';
import './Header.css';
import logo from '../assets/senai-logo.png';

const Header = ({ links }) => {
  return (
    <header className="header">
      <img src={logo} alt="Logo SENAI" />
      <nav>
        {links.map((link, i) => (
          <a key={i} href={link.path}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
