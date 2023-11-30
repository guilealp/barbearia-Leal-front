import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';


import Styles from '../app.module.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Swal from 'sweetalert2';
import Header from './Header';
import { cadastroAgendaInterface } from '../interfaces/cadastroAgendaInterface';
const ListagemAgenda = () => {

    const [agenda, setAgenda] = useState<cadastroAgendaInterface[]>([]);
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

            const response = await axios.post('http://127.0.0.1:8000/api/Agenda/pesquisar',
            {data_hora:pesquisa},{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(function(response){
                setAgenda(response.data.data);
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

                axios.delete('http://127.0.0.1:8000/api/Agenda/excluir/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/Agenda"
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
                const response = await axios.get('http://127.0.0.1:8000/api/Agenda/all');
                setAgenda(response.data.data); 
            }catch(error){
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
                        <li className="nav-item">
                            <Link to={"/listagem/Agenda"} className="nav-link active">Listagem de horarios</Link>
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
                                        <Link to={"/cadastro/Agenda"} className='btn btn-primary'>cadastrar</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card text-bg-secondary'>
                        <div className='card-body'>
                            <h5 className='card-title'>Lista De Serviços</h5>
                            <table className='table teble-hover table-dark table-striped'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Profissional</th>
                                    <th>Data e hora</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {agenda.map(agenda => (
                                <tr key={agenda.id}>
                                    <td>{agenda.id}</td>
                                    <td>{agenda.profissional_id}</td>
                                    <td>{agenda.data_hora}</td>
                                    <td><a onClick={()=>handleDelete(agenda.id)} className='btn btn-danger btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
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
            <Footer />
        </div>
    );
}

export default ListagemAgenda;