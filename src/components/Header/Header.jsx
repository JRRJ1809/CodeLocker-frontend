import React from 'react';
import './Header.css';
import logo from '../../assets/senai-logo.png';

function Header(){
  return (
    <>
    <div className="image-logo">
      <img src={logo} alt="Logo SENAI" className="logoh"/>
    </div>
    <header className="header">
    </header>
    </>
  );
};

export default Header;
