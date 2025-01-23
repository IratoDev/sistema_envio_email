import { useState,useEffect, ChangeEvent, FormEvent } from "react";
import { NavBar } from "../../components/Nav";
import StyleCliente from "./StyleCliente.module.css"
import { toast } from "sonner";

import { setupApiClient } from "../../service/api";

type ItemProps = {
id: string;
name: string;
};


export function CadastroCliente(){

const [Nome, setNome] = useState('');
const [Email, setEmail] = useState('');
const [Maquinas, setMaquinas] = useState<number>(0);

const [Sistema, setSistema] = useState<ItemProps[]>([]);
const [SistemaSelected, setSistemaSelected] = useState(0);
const [FiscalSelected, setFiscalSelected] = useState<string>("SEM FISCAL");
const [TypeSelected, setTypeSelected] = useState<string>("NOVO");
const [observacao, setObservacao] = useState('');

  
useEffect(() => {
async function loadCategories() {
try {
const apiClient = setupApiClient();
const response = await apiClient.get('/consulta/sistem');
setSistema(response.data);

} catch (err) {
console.error("Erro ao carregar categorias", err);
toast.error("Erro ao carregar categorias");
}
}
    

loadCategories();

}, []);

function handleChangeSistem(event: ChangeEvent<HTMLSelectElement>) {
setSistemaSelected(Number(event.target.value));
}

function handleChangeFiscal(event: ChangeEvent<HTMLSelectElement>) {
setFiscalSelected(String(event.target.value));
}

function handleChangeType(event: ChangeEvent<HTMLSelectElement>) {
setTypeSelected(String(event.target.value));
}

async function handleRegister(event: FormEvent) {
    
event.preventDefault();

if (Nome === "") {
toast.error("Preencha todos os campos");
return;
}

console.log("esse é o nome:", Nome)
console.log("esse é o maquinas:", Maquinas)
console.log("esse é o email:", Email)
console.log("esse é o sistema:", Sistema[SistemaSelected].id)

const data = {
    name: Nome,
    email: Email,
    status_email:false,
    obs:observacao,
    type:TypeSelected,
    numero_maquina:  Maquinas,
    sistem: `${Sistema[SistemaSelected].id}`,
    fiscal: FiscalSelected,
  };


console.log("esse é o objeto:",data)

try {
const apiClient = setupApiClient();
await apiClient.post('/cadastro/cliente', data);
setNome('');
setEmail('');
setMaquinas(0);
setObservacao('');
setSistemaSelected(0);
setFiscalSelected('SEM FISCAL');
window.location.reload();
toast.success('Cadastrado com sucesso!');
} catch (err:any) {
console.error('Erro:', err.response?.data || err.message);
toast.error("Ops! Erro ao cadastrar");
}
}

return(

<>

<main>

<section id={StyleCliente.CadastroCliente}>

    <div id={StyleCliente.Conteiner}>

        <form onSubmit={handleRegister}>

            <label>
                <legend>Nome:</legend>
                <input type="text" name="nome" onChange={(e) => setNome(e.target.value)}/>
            </label>

            <label>
                <legend>Email:</legend>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label>
                <legend>Numero de maquinas:</legend>
                <input type="number" name="maquinas" onChange={(e) => setMaquinas(Number(e.target.value))}/>
            </label>
            
            <div className={StyleCliente.ConteinerSelect}>
            <label>
                <legend>Fiscal:</legend>
                <select name="fiscal" value={FiscalSelected} onChange={handleChangeFiscal}>
                <option value="SEM FISCAL">SEM FISCAL</option>
                <option value="NFCE">NFCE</option>
                <option value="NFE">NFE</option>
                <option value="NFCE/NFE">NFCE/NFE</option>
            </select>
            </label>

            <label>
                <legend>tipo de cliente:</legend>
                <select name="type" value={TypeSelected} onChange={handleChangeType}>
                <option value="NOVO">NOVO</option>
                <option value="PROBLEMATICO">PROBLEMATICO</option>
                <option value="AGRADAVEL">AGRADAVEL</option>
            </select>
            </label>
            
            <label>
                <legend>Sistema:</legend>
                <select name="sistema" value={SistemaSelected} onChange={handleChangeSistem}>
               
                {Sistema.map((item, index) => (
                <option key={item.id} value={index}>
                {item.name}
                </option>
                 ))}

                </select>
            </label>
            </div>
            
            <label>
                <legend>observaçoes:</legend>
                <textarea name="obs" onChange={(e) => setObservacao(e.target.value)}/>
            </label>

            <button type="submit">Cadastrar Cliente</button>

        </form>

    </div>

</section>

</main>

</>

)

}