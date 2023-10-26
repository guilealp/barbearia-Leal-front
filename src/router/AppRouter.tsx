import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroServiço from "../componets/CadastroServiço";
import ListagemServico from "../componets/ListagemServico";
import CadastroClientes from "../componets/CadastroClientes";

const AppRouter = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="cadastro/Serviço" element={<CadastroServiço />}/>
            <Route path="listagem/Serviço" element={<ListagemServico />}/>
            <Route path="cadastro/Clientes" element={<CadastroClientes />}/>
        </Routes>
        </BrowserRouter>
    )

}

export default AppRouter;