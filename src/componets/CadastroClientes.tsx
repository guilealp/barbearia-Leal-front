import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Footer from './Footer';

import Header from "./Header";
import Styles from '../app.module.css';
import axios from 'axios';
const CadastroClientes = () => {

    const[nome, setNome] = useState<string>("");
    const[descricao, setDescricao] = useState<string>("");
    const[duracao, setDuracao] = useState<string>();
    const[preco, setPreco] = useState<string>();

    const cadastratClientes = (e: FormEvent) => {
        e.preventDefault();
        const dados={
            nome:nome,
            descricao:descricao,
            duracao:duracao,
            preco:preco
        }   
    axios.post('http://127.0.0.1:8000/api/cliente',dados,{
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
        if(e.target.name=== "celular"){
            setDescricao(e.target.value)
        }   
        if(e.target.name=== "email"){
            setDuracao(e.target.value)
        } 
        if(e.target.name=== "cpf"){
            setPreco(e.target.value)
        } 
        if(e.target.name=== "dataNacimento"){
            setNome(e.target.value)
        } 
        if(e.target.name=== "cidade"){
            setDescricao(e.target.value)
        }   
        if(e.target.name=== "estado"){
            setDuracao(e.target.value)
        } 
        if(e.target.name=== "pais"){
            setPreco(e.target.value)
        } 
        if(e.target.name=== "rua"){
            setNome(e.target.value)
        } 
        if(e.target.name=== "numero"){
            setDescricao(e.target.value)
        }   
        if(e.target.name=== "bairro"){
            setDuracao(e.target.value)
        } 
        if(e.target.name=== "cep"){
            setPreco(e.target.value)
        } 
        if(e.target.name=== "complemeto"){
            setNome(e.target.value)
        } 
        if(e.target.name=== "password"){
            setDescricao(e.target.value)
        }          
    }

    return (
        <div>
            <Header />
            <main className={Styles.main}>
                <div className='container'>
                    <div className='card text-bg-secondary'>
                        <div className='card-body '>
                            <h5 className='card-title'>Cadastrar um serviço</h5>
                            <form onSubmit={cadastratClientes}className='row g-4'>
                            <div className='col-8'>
                                <label htmlFor="nome" className='form-label'>nome</label>
                                <input type="text" name='nome' className='form-control' required  onChange={handleState}/>
                            </div>
                            <div className='col-4'>
                            <label htmlFor="celular" className='form-label'>celular</label>
                                <input type="text" name='celular' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-12'>
                            <label htmlFor="email" className='form-label'>email</label>
                                <input type="text" name='email' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-4'>
                            <label htmlFor="cpf" className='form-label'>cpf</label>
                                <input type="text" name='cpf' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="dataNacimento" className='form-label'>data de Nacimento</label>
                                <input type="text" name='dataNacimento' className='form-control' required  onChange={handleState}/>
                            </div>
                            <div className='col-4'>
                            <label htmlFor="cidade" className='form-label'>cidade</label>
                                <input type="text" name='cidade' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-1'>
                            <label htmlFor="estado" className='form-label'>estado</label>
                                <input type="text" name='estado' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="pais" className='form-label'>pais</label>
                                <input type="text" name='pais' className='form-control' required  onChange={handleState}/>
                            </div>
                            <div className='col-8'>
                            <label htmlFor="rua" className='form-label'>rua</label>
                                <input type="text" name='rua' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-2'>
                            <label htmlFor="numero" className='form-label'>numero da casa</label>
                                <input type="text" name='numero' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-3'>
                            <label htmlFor="cep" className='form-label'>cep</label>
                                <input type="text" name='cep' className='form-control' required onChange={handleState}/>
                            </div>
                            <div className='col-5'>
                                <label htmlFor="complemeto" className='form-label'>complemeto</label>
                                <input type="text" name='complemeto' className='form-control' required  onChange={handleState}/>
                            </div>
                            <div className='col-2'>
                            <label htmlFor="password" className='form-label'>Senha</label>
                                <input type="password" name='password' className='form-control' required onChange={handleState}/>
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

export default CadastroClientes;