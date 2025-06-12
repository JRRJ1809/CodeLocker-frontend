import React, { useState } from 'react';
import './Salas.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Salas = () => {
    // Estado das salas (com controle de checkboxes)
    const [salas, setSalas] = useState([
        { nome: 'Sala 101', capacidade: 20, disponivel: false },
        { nome: 'Sala 202', capacidade: 15, disponivel: true },
        { nome: 'Laboratorio de TI', capacidade: 10, disponivel: false },
        { nome: 'Sala 303', capacidade: 25, disponivel: false },
    ]);

    // Função para toggle das checkboxes
    const toggleDisponibilidade = (index) => {
        const novasSalas = [...salas];
        novasSalas[index].disponivel = !novasSalas[index].disponivel;
        setSalas(novasSalas);
    };

    return (
        <>
            <Header />
            <div className="salas-container">
                <h1>Salas Disponíveis</h1>
                <div className="sala-list">
                    {salas.map((sala, index) => (
                        <div key={index} className="sala-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={sala.disponivel}
                                    onChange={() => toggleDisponibilidade(index)}
                                />
                                <span className={sala.disponivel ? "disponivel" : "indisponivel"}>
                                    {sala.nome} - Capacidade: {sala.capacidade} pessoas
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
                <p className="senai-footer">© 2025 SENAI - Todos os direitos reservados.</p>
            </div>
            <Footer />
        </>
    );
};

export default Salas;