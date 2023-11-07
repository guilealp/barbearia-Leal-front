import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Footer from './Footer';

import Header from "./Header";
import Styles from '../app.module.css';
import axios from 'axios';
const CadastroServiço = () => {

    const[nome, setNome] = useState<string>("");
    const[descricao, setDescricao] = useState<string>("");
    const[duracao, setDuracao] = useState<string>();
    const[preco, setPreco] = useState<string>();

    const cadastrarServico = (e: FormEvent) => {
        e.preventDefault();
        const dados={
            nome:nome,
            descricao:descricao,
            duracao:duracao,
            preco:preco
        }   
    axios.post('http://127.0.0.1:8000/api/servico',dados,{
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    }).then(function(response){
        window.location.href="/listagem/Serviço";
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
            <main className={Styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar um serviço</h5>
                            <form onSubmit={cadastrarServico}className='row g-4'>
                            <div className='col-6'>
                                <label htmlFor="nome" className='form-label'>nome</label>
                                <input type="text" name='nome' className='form-control' required  onChange={handleState}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="descricao" className='form-label'>descrição</label>
                                <input type="text" name='descricao' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="duracao" className='form-label'>duraçao</label>
                                <input type="text" name='duracao' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="preco" className='form-label'>preço</label>
                                <input type="text" name='preco' className='form-control' required onChange={handleState}/>
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