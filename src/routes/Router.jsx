import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Adm from '../pages/Adm/Adm';
import CadastroAdm from '../pages/CadastroAdm/CadastroAdm';
import Salas from '../pages/Salas/Salas';
import QrCode from '../pages/QrCode/QrCode';
import Registros from '../pages/Registros/Registros';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adm" element={<Adm />} />
        <Route path="/cadastroadm" element={<CadastroAdm />} />
        <Route path="/salas" element={<Salas />} />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/registros" element={<Registros />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
