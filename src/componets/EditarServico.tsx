import React,{Component,useState,ChangeEvent,FormEvent,useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Styles from '../app.module.css';
import { useParams } from "react-router-dom";
import axios from "axios";


const EditarServico =()=>{

    const[nome, setNome] = useState<string>("");
    const[descricao, setDescricao] = useState<string>("");
    const[duracao, setDuracao] = useState<string>("");
    const[preco, setPreco] = useState<string>("");
    const[id, setId] = useState<number>();


    const parametro = useParams();

    const atualizar = (e: FormEvent)=>{
        e.preventDefault();

        const dados = {
            nome:nome,
            descricao:descricao,
            duracao:duracao,
            preco:preco,
            id:id
        }
        axios.put("http://127.0.0.1:8000/api/editar", dados,
        {
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(function(response){
            window.location.href= "/listagem/serviço";
        }).catch(function(error){
            console.log('ocorreu um erro ao atualizar');
            
        })
    }

    useEffect(()=> {
        async function fetchData() {
            try{
                const response = await axios.get("http://127.0.0.1:8000/api/find/servico/"+ parametro.id);
                setNome(response.data.data.nome);
                setDescricao(response.data.data.descricao);
                setDuracao(response.data.data.duracao);
                setPreco(response.data.data.preco)
                setId(response.data.data.id);
            }catch(error){
                console.log("erro ao buscar dados da api");
                
            }
        }
        fetchData();
    }, []);


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

    return(
        <div>
            <Header />
            <main className={Styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>editar Serviço</h5>
                            <form onSubmit={atualizar} className='row g-3'>
                            <div className='col-6'>
                                <label htmlFor="nome" className='form-label'>nome</label>
                                <input type="text" name='nome' className='form-control' required  onChange={handleState} value={nome}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="descricao" className='form-label'>descrição</label>
                                <input type="text" name='descricao' className='form-control' required onChange={handleState} value={descricao}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="duracao" className='form-label'>duraçao</label>
                                <input type="text" name='duracao' className='form-control' required onChange={handleState} value={duracao}/>
                            </div>
                            <div className='col-6'>
                            <label htmlFor="preco" className='form-label'>preço</label>
                                <input type="text" name='preco' className='form-control' required onChange={handleState} value={preco}/>
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

export default EditarServico;