import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroServiço from "../componets/CadastroServiço";
import ListagemServico from "../componets/ListagemServico";
import CadastroClientes from "../componets/CadastroClientes";
import ListagemClientes from "../componets/ListagemClientes";
import CadastroProfissional from "../componets/CadastroProfissional";
import ListagemProfissional from "../componets/ListagemProfissional";
import EditarServico from "../componets/EditarServico";
import EditarCliente from "../componets/EditarCliente";
import EditarProfissional from "../componets/EditarProfissional";


const AppRouter = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="cadastro/Serviço" element={<CadastroServiço />}/>
            <Route path="listagem/Serviço" element={<ListagemServico />}/>
            <Route path="editar/Serviço/:id" element={<EditarServico />}/>
            <Route path="cadastro/Clientes" element={<CadastroClientes />}/>
            <Route path="listagem/Clientes" element={<ListagemClientes />}/>
            <Route path="editar/cliente/:id" element={<EditarCliente />}/>
            <Route path="cadastro/Profissional" element={<CadastroProfissional />}/>
            <Route path="listagem/Profissional" element={<ListagemProfissional />}/>
            <Route path="editar/Profissional/:id" element={<EditarProfissional />}/>
        </Routes>
        </BrowserRouter>
    )

}

export default AppRouter;