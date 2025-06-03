import React from 'react';
import './Salas.css';

const salasDisponiveis = [
  { nome: 'Sala 101', capacidade: 20 },
  { nome: 'Sala 202', capacidade: 15 },
  { nome: 'Laboratório de TI', capacidade: 10 },
  { nome: 'Sala 303', capacidade: 25 },
];

const Salas = () => {
  return (
    <div className="salas-container">
      <h1>Salas Disponíveis</h1>
      <div className="sala-list">
        {salasDisponiveis.map((sala, index) => (
          <div key={index} className="sala-item">
            <span>{sala.nome} - Capacidade: {sala.capacidade} pessoas</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Salas;
