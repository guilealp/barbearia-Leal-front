import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import Styles from '../app.module.css';
import { cadastroClienteInterface } from '../interfaces/cadastroClienteInterface';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './Header';
const ListagemClientes = () => {

    const [cliente, setCliente] = useState<cadastroClienteInterface[]>([]);
    const [pesquisa,setPesquisa]= useState<string>('')
    const [error, setError] = useState("");

    const parametro = useParams();

    const handleState = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name === "pesquisa"){
            setPesquisa(e.target.value);
        }
    }
    const buscar = (e: FormEvent)=>{
        e.preventDefault();

        async function fetchData() {try{

            const response = await axios.post('http://127.0.0.1:8000/api/find/cliente',
            {nome:pesquisa},{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(function(response){
                setCliente(response.data.data);
            }).catch(function(error){
                console.log(error);
            })
        }catch(error){
            console.log(error);
        }
            
        }
        fetchData();
    }
    function handleDelete(id: number) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, exclua-o!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O cliente foi excluido",
                    icon: "success"
                });

                axios.delete('http://127.0.0.1:8000/api/cliente/excluir/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/Clientes"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (
               
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O Cliente não foi excluido :)",
                    icon: "error"
                });
            }
        });



    }

    

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/cliente/all');
                setCliente(response.data.data); 
            }catch(error){
                window.location.href= "/listagem/Clientes";
                setError("ocorreu um erro");
                console.log(error);
                
            }
        }

        fetchData();
    }, []);

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
                            <Link to={'/listagem/Clientes'} className="nav-link active">Listagem de Clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/listagem/Serviço'} className="nav-link active">Listagem de Servico</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/listagem/Profissional"} className="nav-link active">Listagem de profissional</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </nav>
            <main className={Styles.main}>
                <div className='container'>

                    <div className='col-md bm-3'>
                        <div className='card text-bg-secondary'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={handleState}/>
                                    </div>
                                    <div className='col-2'>
                                    <button type='submit' className='btn btn-success'>Pesquisar</button>
                                        <Link to={"/cadastro/Clientes"} className='btn btn-primary'>cadastrar</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card text-bg-secondary'>
                        <div className='card-body'>
                            <h5 className='card-title'>Lista De Clientes</h5>
                            <table className='table teble-hover table-dark table-striped'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Celular</th>
                                    <th>E-mail</th>
                                    <th>Cpf</th>
                                    <th>Data de Nacimento</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th>Pais</th>
                                    <th>Rua</th>
                                    <th>Numero</th>
                                    <th>Bairro</th>
                                    <th>Cep</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {cliente.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.celular}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.dataNacimento}</td>
                                    <td>{cliente.cidade}</td>
                                    <td>{cliente.estado}</td>
                                    <td>{cliente.pais}</td>
                                    <td>{cliente.rua}</td>
                                    <td>{cliente.numero}</td>
                                    <td>{cliente.bairro}</td>
                                    <td>{cliente.cep}</td>
                                    <td><Link to={"/editar/cliente/"+cliente.id} className='btn btn-primary '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
</svg></Link>
                                    <a className='btn btn-danger' onClick={() => handleDelete(cliente.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></a></td>
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

export default ListagemClientes;