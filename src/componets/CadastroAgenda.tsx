import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Footer from './Footer';

import Header from "./Header";
import Styles from '../app.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cadastroProfissionalInterface } from '../interfaces/cadastroProfissionalInterface';

const CadastroAgenda = () => {

    const[profissional_id, setProfissional_id] = useState<string>("");;
    const[data_hora, setData_hora] = useState<string>();
    const[profissional,setProfissional] = useState<cadastroProfissionalInterface[]>([])
    


    const cadastrarAgenda = (e: FormEvent) => {
        e.preventDefault();
        const dadosDaAgenda={
            profissional_id:profissional_id,
            data_hora:data_hora,
        } 
          
    axios.post('http://127.0.0.1:8000/api/Agenda',dadosDaAgenda,{
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    }).then(function(response){

        alert('cadastro Agenda realizado com sucesso')
        window.location.href="/listagem/agenda";
    }).catch(function(error){
        console.log(error);
        
    });}

    useEffect(()=> {
        async function fetchData() {
            try {
                const response= await axios.get('http://127.0.0.1:8000/api/Profissional/all');
                if(true == response.data.status) {
                    setProfissional(response.data.data)
                    console.log(profissional);
                }

            }catch(error){
                console.log(error);
                
            }
            
        }
        fetchData();
    },[]);


    const handleState = (e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.name=== "data_hora"){
            setData_hora(e.target.value)
        } 
    }
    const handleProfissionalSelect=(e:ChangeEvent<HTMLSelectElement>)=>{
        setProfissional_id(e.target.value);
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
                            <h5 className='card-title'>Agendar um horario</h5>
                            <form onSubmit={cadastrarAgenda}className='row g-4'>
                            <div className='col-6'>
                                <label htmlFor="profissional_id" className='form-label'>profissional</label>
                                <select name='profissional_id'id='profissional_id' className='form-control' required  onChange={handleProfissionalSelect}>
                                    <option value="0">selecionar um profissional</option>
                                    {profissional.map(profissional=>(
                                        <option key={profissional.id} value={profissional.id}>
                                            {profissional.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="data_hora" className='form-label'>dia e hora</label>
                                <input type="datetime-local" name='data_hora' className='form-control' required onChange={handleState}/>
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

export default CadastroAgenda;