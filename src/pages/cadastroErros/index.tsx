import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { FiUpload } from "react-icons/fi";
import { setupApiClient } from "../../service/api";
import StyleErros from "./StyleErros.module.css"

export function CadastraErros(){

const [Nome, setNome] = useState('');
const [Causa, setCausa] = useState('');
const [Solucao, setSolucao] = useState('');
const [imagemUrl, setImagemUrl] = useState('');
const [imageErro, setImageErro] = useState<File | null>(null);

function handleFile(e: ChangeEvent<HTMLInputElement>) {
  if (!e.target.files) return;

  const image = e.target.files[0];
  if (image && (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png')) {
    setImageErro(image);
    setImagemUrl(URL.createObjectURL(image));
  }
}

async function handleRegister(event: FormEvent) {
  event.preventDefault();

  if (Nome === "" || imageErro === null) {
    toast.error("Preencha todos os campos");
    return;
  }

  const data = new FormData();
  data.append('nome', Nome);
  data.append('causa', Causa);
  data.append('solucao', Solucao);
  if (imageErro) {
    data.append('imagem', imageErro); // Verifique se o nome está correto para o backend
  }

  try {
    const apiClient = setupApiClient();
    await apiClient.post('/cadastro/erro', data);
    toast.success('Erro cadastrado com sucesso!');
    setNome('');
    setCausa('');
    setSolucao('');
    setImagemUrl('');
    setImageErro(null);
  } catch (err: any) {
    console.error('Erro34:', err.response?.data || err.message);
    toast.error("Ops! Erro ao cadastrar");
  }
}
  

return(

<>

<main>

<section id={StyleErros.ConsultaErro}>

<div className={StyleErros.ConteinerModalProduto}>
        <form onSubmit={handleRegister}>
          <label>
            <span className={StyleErros.BoxIcon}>
              <FiUpload size={30} color="#fff" />
            </span>
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile} />
            {imagemUrl && <img className={StyleErros.previw} src={imagemUrl} alt="foto do erro" width={250} height={250} />}
          </label>

          <input
            className={StyleErros.input}
            type="text"
            placeholder="Digite o nome do erro"
            value={Nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
            className={StyleErros.input}
            placeholder="Descreva a causa do erro"
            value={Causa}
            onChange={(e) => setCausa(e.target.value)}
            rows={10}
          />

          <textarea
            className={StyleErros.input}
            placeholder="Descreva a solução do erro"
            value={Solucao}
            onChange={(e) => setSolucao(e.target.value)}
            rows={10}
          />

          <button className={StyleErros.buttonAdd} type="submit">
            Cadastrar
          </button>
        </form>
      </div>

</section>

</main>

</>

)

}