import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Footer from './Footer';

import Header from "./Header";
import Styles from '../app.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CadastroServiço = () => {

    const[nome, setNome] = useState<string>("");
    const[descricao, setDescricao] = useState<string>("");
    const[duracao, setDuracao] = useState<string>();
    const[preco, setPreco] = useState<string>();
    const[nomeErro, setNomeErro] = useState<string>("");
    const[descricaoErro, setDescricaoErro] = useState<string>("");
    const[duracaoErro, setDuracaoErro] = useState<string>("");
    const[precoErro, setPrecoErro] = useState<string>("");


    const cadastrarServico = (e: FormEvent) => {
        setNomeErro("")
        setDescricaoErro("")
        setDuracaoErro("")
        setPrecoErro("")
        e.preventDefault();
        const dadosDoServico={
            nome:nome,
            descricao:descricao,
            duracao:duracao,
            preco:preco
        } 
          
    axios.post('http://127.0.0.1:8000/api/servico',dadosDoServico,{
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    }).then(function(response){ if(response.data.success === false){
        if('nome' in response.data.error){
            setNomeErro(response.data.error.nome[0])
        }
        if('descricao' in response.data.error){
            setDescricaoErro(response.data.error.descricao[0])
        }
        if('duracao' in response.data.error){
            setDuracaoErro(response.data.error.duracao[0])
        }
        if('preco' in response.data.error){
            setPrecoErro(response.data.error.preco[0])
        }
    }
    else{
        window.location.href="/listagem/Serviço";}
    }).catch(function(error){
        console.log(error);
        
    }); }

    const handleState = (e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.name=== "nome"){
            setNome(e.target.value)
        } 
        if(e.target.name=== "descricao"){
            setDescricao(e.target.value)
        }   
        if(e.target.name=== "duracao"){
            setDuracao(e.target.value)
        } 
        if(e.target.name=== "preco"){
            setPreco(e.target.value)
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
                        <li className="nav-item">
                            <Link to={"/cadastro/Agenda"} className="nav-link active">Agendar um horario</Link>
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
                            <h5 className='card-title'>Cadastrar um serviço</h5>
                            <form onSubmit={cadastrarServico}className='row g-4'>
                            <div className='col-6'>
                                <label htmlFor="nome" className='form-label'>nome</label>
                                <input type="text" name='nome' className='form-control' required  onChange={handleState}/>
                                <div className='text-danger'>{nomeErro}</div>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="descricao" className='form-label'>descrição</label>
                                <input type="text" name='descricao' className='form-control' required onChange={handleState}/>
                                <div className='text-danger'>{descricaoErro}</div>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="duracao" className='form-label'>duraçao</label>
                                <input type="text" name='duracao' className='form-control' required onChange={handleState}/>
                                <div className='text-danger'>{duracaoErro}</div>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="preco" className='form-label'>preço</label>
                                <input type="text" name='preco' className='form-control' required onChange={handleState}/>
                                <div className='text-danger'>{precoErro}</div>
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

export default CadastroServiço;