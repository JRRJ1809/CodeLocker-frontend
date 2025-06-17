import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Adm from '../pages/Adm/Adm';
import CadastroAdm from '../pages/CadastroAdm/CadastroAdm';
import Salas from '../pages/Salas/Salas';
import QrCode from '../pages/QrCode/QrCode';
import Registros from '../pages/Registros/Registros';
import UserInicial from '../pages/UserInicial/UserInicial'; // 👈 importa a página pós login
import AdmInicial from '../pages/AdmInicial/AdmInicial';
import SalasVisaoAdm from '../pages/SalasVisaoAdm/SalasVisaoAdm';


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
        <Route path="/userinicial" element={<UserInicial />} /> {/* 👈 adiciona isso */}
        <Route path="/adminicial" element={<AdmInicial />} />
        <Route path="/salasvisaoadm" element={<SalasVisaoAdm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
