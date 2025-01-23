import { BrowserRouter,Routes,Route } from "react-router-dom";

import { EmailPage } from "./pages/EnviaEmail";
import { Dashboard } from "./pages/Dashboard";
import { CadastroCliente } from "./pages/cadastra cliente";
import { ConsultaErros } from "./pages/consultaErros";
import { CadastraErros } from "./pages/cadastroErros";
import { ConsultaCliente } from "./pages/consulta cliente";

import { NavBar } from "./components/Nav";

export default function AppRouter(){

return(

<BrowserRouter>

<NavBar/>

<Routes>

<Route path="/" element={<Dashboard/>} />
<Route path="/email" element={<EmailPage/>} />
<Route path="/consulta/erros" element={<ConsultaErros/>} />
<Route path="/cadastrar/erros" element={<CadastraErros/>} />
<Route path="/cadastro/cliente" element={<CadastroCliente/>} />
<Route path="/consulta/cliente" element={<ConsultaCliente/>} />

</Routes>

</BrowserRouter>

)
}