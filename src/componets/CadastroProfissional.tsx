import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Footer from './Footer';

import Header from "./Header";
import Styles from '../app.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CadastroProfissional = () => {

    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>();
    const [dataNacimento, setDataNacimento] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>();
    const [bairro, setBairro] = useState<string>("");
    const [cep, setCep] = useState<string>();
    const [complemeto, setComplemeto] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [salario, setSalario] = useState<string>("");
    const cadastroProffssional = (e: FormEvent) => {
        e.preventDefault();
        const dadosDoProfissional = {
            nome: nome,
            celular: celular,
            email: email,
            cpf: cpf,
            dataNacimento: dataNacimento,
            cidade: cidade,
            estado: estado,
            pais: pais,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            complemeto: complemeto,
            password: password,
            salario: salario
        }
        axios.post('http://127.0.0.1:8000/api/profissional', dadosDoProfissional, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if(response.data.success == false){
                console.log("Error");
                console.log(response.data.error);
            }
            else{
                window.location.href = "/listagem/Profissional";
            }
        }).catch(function(error){
            console.log(error);
        });

    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nome") {
            setNome(e.target.value)
        }
        if (e.target.name === "celular") {
            setCelular(e.target.value)
        }
        if (e.target.name === "email") {
            setEmail(e.target.value)
        }
        if (e.target.name === "cpf") {
            setCpf(e.target.value)
        }
        if (e.target.name === "dataNacimento") {
            setDataNacimento(e.target.value)
        }
        if (e.target.name === "cidade") {
            setCidade(e.target.value)
        }
        if (e.target.name === "estado") {
            setEstado(e.target.value)
        }
        if (e.target.name === "pais") {
            setPais(e.target.value)
        }
        if (e.target.name === "rua") {
            setRua(e.target.value)
        }
        if (e.target.name === "numero") {
            setNumero(e.target.value)
        }
        if (e.target.name === "bairro") {
            setBairro(e.target.value)
        }
        if (e.target.name === "cep") {
            setCep(e.target.value)
        }
        if (e.target.name === "complemeto") {
            setComplemeto(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        if (e.target.name === "salario") {
            setSalario(e.target.value)
        }
    }

    return (
        <div>
            <Header />
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary '>
        <div className="container-fluid">
            

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#conteudoNavbar" aria-controls="conteudoNavbar" aria-expanded="false" aria-label="Toggle Navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="container">
                <div className="justify-content-center" id="conteudoNavbar">
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0 justify-content-center ">
                        <li className="nav-item">
                            <Link to={'/cadastro/Clientes'} className="nav-link active">Cadastro de Clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/cadastro/Serviço'} className="nav-link active">Cadastro de Servico</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/cadastro/Profissional"} className="nav-link active">Cadastro de profissional</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </nav>
            <main className={Styles.main}>
                <div className='container'>
                    <div className='card text-bg-secondary'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastro de Profissional</h5>
                            <form onSubmit={cadastroProffssional} className='row g-4'>
                                <div className='col-8'>
                                    <label htmlFor="nome" className='form-label '>Nome</label>
                                    <input type="text" name='nome' className='form-control opacity-100' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Celular</label>
                                    <input type="text" name='celular' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="email" className='form-label'>Email</label>
                                    <input type="text" name='email' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Cpf</label>
                                    <input type="text" name='cpf' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="dataNacimento" className='form-label'>Data de Nacimento</label>
                                    <input type="date" name='dataNacimento' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cidade" className='form-label'>Cidade</label>
                                    <input type="text" name='cidade' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-1'>
                                    <label htmlFor="estado" className='form-label'>Estado</label>
                                    <input type="text" name='estado' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-3'>
                                    <label htmlFor="pais" className='form-label'>Pais</label>
                                    <input type="text" name='pais' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-8'>
                                    <label htmlFor="rua" className='form-label'>Rua</label>
                                    <input type="text" name='rua' className='form-control' required onChange={handleState} />
                                </div>
                              
                                <div className='col-3'>
                                    <label htmlFor="numero" className='form-label'>Numero da casa</label>
                                    <input type="text" name='numero' className='form-control' required onChange={handleState} />
                                </div>  <div className='col-3'>
                                    <label htmlFor="bairro" className='form-label'>Bairro</label>
                                    <input type="text" name='bairro' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cep" className='form-label'>Cep</label>
                                    <input type="text" name='cep' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="complemeto" className='form-label'>Complemeto</label>
                                    <input type="text" name='complemeto' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="password" className='form-label'>Senha</label>
                                    <input type="password" name='password' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-2'>
                                    <label htmlFor="salario" className='form-label'>Salario</label>
                                    <input type="text" name='salario' className='form-control' required onChange={handleState} />
                                </div>
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success bt-sm'>Cadastrar</button>
                                </div>
                            </form></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CadastroProfissional;