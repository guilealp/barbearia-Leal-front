import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import Styles from '../app.module.css';
import { cadastroServiçoInterface } from '../interfaces/cadastroServiçoInterface';
const ListagemServico = () => {

    const [usuarios, setUsuarios] = useState<cadastroServiçoInterface[]>([]);
    const [pesquisa,setPesquisa]= useState<string>('')
    const [error, setError] = useState("");

    const handleState = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name === "pesquisa"){
            setPesquisa(e.target.value);
        }
    }
    const buscar = (e: FormEvent)=>{
        e.preventDefault();

        async function fetchData() {try{

            const response = await axios.post('http://127.0.0.1:8000/api/find/serviço',
            {nome:pesquisa},{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(function(response){
                setUsuarios(response.data.data);
            }).catch(function(error){
                console.log(error);
            })
        }catch(error){
            console.log(error);
        }
            
        }
        fetchData();
    }

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/serviço/all');
                setUsuarios(response.data.data); 
            }catch(error){
                setError("ocorreu um erro");
                console.log(error);
                
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <main className={Styles.main}>
                <div className='container'>

                    <div className='col-md bm-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={handleState}/>
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Lista De Serviços</h5>
                            <table className='table teble-hover'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>descrição</th>
                                    <th>duração</th>
                                    <th>preço</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.descricao}</td>
                                    <td>{usuario.duracao}</td>
                                    <td>{usuario.preco}</td>
                                    <td><a href="#" className='btn btn-primary btn-sm'>Editar</a>
                                    <a href="#" className='btn btn-danger btn-sm'>Excluir</a></td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ListagemServico;