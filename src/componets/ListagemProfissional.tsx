import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import Styles from '../app.module.css';
import { cadastroProfissionalInterface } from '../interfaces/cadastroProfissionalInterface';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const ListagemProfissional = () => {

    const [profissional, setProfissional] = useState<cadastroProfissionalInterface[]>([]);
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

            const response = await axios.post('http://127.0.0.1:8000/api/find/profissional',
            {nome:pesquisa},{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            }).then(function(response){
                setProfissional(response.data.data);
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

                axios.delete('http://127.0.0.1:8000/api/Profissional/excluir/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/profissional"
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
                const response = await axios.get('http://127.0.0.1:8000/api/Profissional/all');
                setProfissional(response.data.data); 
            }catch(error){
                setError("ocorreu um erro");
                console.log(error);
                
            }
        }

        fetchData();
    }, []);

    return (
        <div>
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
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={handleState}/>
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-outline-success'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Lista De Profissional</h5>
                            <table className='table teble-hover'>
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
                                    {/*<th>Pais</th>*/}
                                    <th>Rua</th>
                                    <th>Numero</th>
                                    <th>Bairro</th>
                                    <th>Cep</th>
                                    <th>Salario</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {profissional.map(profissional => (
                                <tr key={profissional.id}>
                                    <td>{profissional.id}</td>
                                    <td>{profissional.nome}</td>
                                    <td>{profissional.celular}</td>
                                    <td>{profissional.email}</td>
                                    <td>{profissional.cpf}</td>
                                    <td>{profissional.dataNacimento}</td>
                                    <td>{profissional.cidade}</td>
                                    <td>{profissional.estado}</td>
                                   {/* <td>{profissional.pais}</td>*/}
                                    <td>{profissional.rua}</td>
                                    <td>{profissional.numero}</td>
                                    <td>{profissional.bairro}</td>
                                    <td>{profissional.cep}</td>
                                    <td>{profissional.salario}</td>
                                    <td><Link to={"/editar/profissional/"+profissional.id} className='btn btn-primary btn-sm'>Editar</Link>
                                    <a onClick={()=> handleDelete(profissional.id)} className='btn btn-danger btn-sm'>Excluir</a></td>
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

export default ListagemProfissional;