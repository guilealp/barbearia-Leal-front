import React,{Component,useState,ChangeEvent,FormEvent,useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Styles from '../app.module.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const EditarProfissional =()=>{

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
    const [salario, setSalario] = useState<string>("");
    const[id, setId] = useState<number>();
    const[nomeErro, setNomeErro] = useState<string>("");
    const[celularErro, setCelularErro] = useState<string>("");
    const[emailErro, setEmailErro]=useState<string>("");
    const[cpfErro,setCpfErro]=useState<string>("");
    const[dataNacimentoErro,setDataNacimentoErro]=useState("");
    const[cidadeErro, setCidadeErro] = useState<string>("");
    const[estadoErro, setEstadoErro]=useState<string>("");
    const[paisErro,setPaisErro]=useState<string>("")
    const[ruaErro,setRuaErro]=useState<string>("");
    const[numeroErro,setNumeroErro]=useState("");
    const[bairroErro, setBairroErro] = useState<string>("");
    const[cepErro, setCepErro]=useState<string>("");
    const[complemetoErro,setComplemetoErro]=useState<string>("");
    const[salarioErro,setSalarioErro]=useState("");


    const parametro = useParams();

    const atualizarProfissional = (e: FormEvent)=>{
        e.preventDefault();
        setNomeErro("")
        setCelularErro("")
        setEmailErro("")
        setCpfErro("")
        setDataNacimentoErro("")
        setCidadeErro("")
        setEstadoErro("")
        setRuaErro("")
        setNumeroErro("")
        setBairroErro("")
        setCepErro("")
        setComplemetoErro("")
        setSalarioErro("")
        setPaisErro("")

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
            salario: salario,
            id:id
        }
        axios.put("http://127.0.0.1:8000/api/editar/Profissional", dadosDoProfissional,
        {
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }).then(function(response){
            if(response.data.success == false){
                if('nome' in response.data.error){
                    setNomeErro(response.data.error.nome[0])
                }
                if('celular' in response.data.error){
                    setCelularErro(response.data.error.celular[0])
                }
                if('email' in response.data.error){
                    setEmailErro(response.data.error.email[0])
                }
                if('cpf' in response.data.error){
                    setCpfErro(response.data.error.cpf[0])
                }
                if('dataNacimento' in response.data.error){
                    setDataNacimentoErro(response.data.error.dataNacimento[0])
                }
                if('cidade' in response.data.error){
                    setCidadeErro(response.data.error.cidade[0])
                }
                if('estado' in response.data.error){
                    setEstadoErro(response.data.error.estado[0])
                }
                if('pais' in response.data.error){
                    setPaisErro(response.data.error.pais[0])
                }
                if('rua' in response.data.error){
                    setRuaErro(response.data.error.rua[0])
                }
                if('numero' in response.data.error){
                    setNumeroErro(response.data.error.numero[0])
                }
                if('bairro' in response.data.error){
                    setBairroErro(response.data.error.bairro[0])
                }
                if('cep' in response.data.error){
                    setCepErro(response.data.error.cep[0])
                }
                if('complemeto' in response.data.error){
                    setComplemetoErro(response.data.error.complemeto[0])
                }
                if('salario' in response.data.error){
                    setSalarioErro(response.data.error.salario[0])
                }
            }
            else{
                window.location.href = "/listagem/Profissional";
            }
        }).catch(function(error){
            console.log('ocorreu um erro ao atualizar');
            
        })
    }

    useEffect(()=> {
        async function fetchData() {
            try{
                const response = await axios.get("http://127.0.0.1:8000/api/find/profissional/"+ parametro.id);
                setNome(response.data.data.nome);
                setCelular(response.data.data.celular);
                setEmail(response.data.data.email);
                setCpf(response.data.data.cpf);
                setDataNacimento(response.data.data.dataNacimento);
                setCidade(response.data.data.cidade);
                setEstado(response.data.data.estado);
                setPais(response.data.data.pais);
                setRua(response.data.data.rua);
                setNumero(response.data.data.numero);
                setBairro(response.data.data.bairro);
                setCep(response.data.data.cep);
                setComplemeto(response.data.data.complemeto);
                setSalario(response.data.data.salario)
                setId(response.data.data.id);
            }catch(error){
                console.log("erro ao buscar dados da api");
                
            }
        }
        fetchData();
    }, []);


    const handleState = (e: ChangeEvent<HTMLInputElement>) =>{
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
        if (e.target.name === "salario") {
            setSalario(e.target.value)
        }
    }

    return(
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
                    <div className='card text-bg-secondary'>
                        <div className='card-body '>
                            <h5 className='card-title'>Cadastro de Cliente</h5>
                            <form onSubmit={atualizarProfissional} className='row g-4'>
                                <div className='col-8'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control' required onChange={handleState} value={nome} />
                                    <div className='text-danger'>{nomeErro}</div>

                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Celular</label>
                                    <input type="text" name='celular' className='form-control' required onChange={handleState} value={celular}/>
                                    <div className='text-danger'>{celularErro}</div>

                                </div>
                                <div className='col-12'>
                                    <label htmlFor="email" className='form-label'>Email</label>
                                    <input type="text" name='email' className='form-control' required onChange={handleState} value={email}/>
                                    <div className='text-danger'>{emailErro}</div>

                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Cpf</label>
                                    <input type="text" name='cpf' className='form-control' required onChange={handleState} value={cpf}/>
                                    <div className='text-danger'>{cpfErro}</div>

                                </div>
                                <div className='col-4'>
                                    <label htmlFor="dataNacimento" className='form-label'>Data de Nacimento</label>
                                    <input type="date" name='dataNacimento' className='form-control' required onChange={handleState} value={dataNacimento}/>
                                    <div className='text-danger'>{dataNacimentoErro}</div>

                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cidade" className='form-label'>Cidade</label>
                                    <input type="text" name='cidade' className='form-control' required onChange={handleState} value={cidade}/>
                                    <div className='text-danger'>{cidadeErro}</div>

                                </div>
                                <div className='col-1'>
                                    <label htmlFor="estado" className='form-label'>Estado</label>
                                    <input type="text" name='estado' className='form-control' required onChange={handleState} value={estado}/>
                                    <div className='text-danger'>{estadoErro}</div>

                                </div>
                                <div className='col-3'>
                                    <label htmlFor="pais" className='form-label'>Pais</label>
                                    <input type="text" name='pais' className='form-control' required onChange={handleState} value={pais}/>
                                    <div className='text-danger'>{paisErro}</div>

                                </div>
                                <div className='col-8'>
                                    <label htmlFor="rua" className='form-label'>Rua</label>
                                    <input type="text" name='rua' className='form-control' required onChange={handleState} value={rua}/>
                                    <div className='text-danger'>{ruaErro}</div>

                                </div>
                              
                                <div className='col-3'>
                                    <label htmlFor="numero" className='form-label'>Numero da casa</label>
                                    <input type="text" name='numero' className='form-control' required onChange={handleState} value={numero}/>
                                    <div className='text-danger'>{numeroErro}</div>

                                </div>  <div className='col-3'>
                                    <label htmlFor="bairro" className='form-label'>Bairro</label>
                                    <input type="text" name='bairro' className='form-control' required onChange={handleState} value={bairro}/>
                                    <div className='text-danger'>{bairroErro}</div>

                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cep" className='form-label'>Cep</label>
                                    <input type="text" name='cep' className='form-control' required onChange={handleState} value={cep}/>
                                    <div className='text-danger'>{cepErro}</div>

                                </div>
                                <div className='col-6'>
                                    <label htmlFor="complemeto" className='form-label'>Complemeto</label>
                                    <input type="text" name='complemeto' className='form-control' required onChange={handleState} value={complemeto}/>
                                    <div className='text-danger'>{complemetoErro}</div>

                                </div>
                                <div className='col-2'>
                                    <label htmlFor="salario" className='form-label'>Salario</label>
                                    <input type="text" name='salario' className='form-control' required onChange={handleState} value={salario}/>
                                    <div className='text-danger'>{salarioErro}</div>

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

export default EditarProfissional;