import { useState, useEffect } from "react";
import StyleErros from "./styleErros.module.css"
import { setupApiClient } from "../../service/api";
import { ErroItem } from "../../components/ElementErro";
import { toast } from "react-toastify";

interface Erro {
id: string;
nome: string;
causa: string;
solucao: string;
imagem: string;
}

export function ConsultaErros(){

   const [erros, setErros] = useState<Erro[]>([]);
   const [modalVisible, setModalVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [ErroEditado, setErroEditado] = useState<any>(null); 


// Função para abrir o modal
function openModal() {
  setModalVisible(true);
}

// Função para fechar o modal
function handleCloseModal() {
  setModalVisible(false);
  setErroEditado(null); // Limpar os dados do produto ao fechar o modal
}

   // Função para buscar os erros do banco de dados
   useEffect(() => {
     async function fetchErros() {
       try {
         const apiClient = setupApiClient();
         const response = await apiClient.get('consulta/erros'); 
         setErros(response.data);
       } catch (err) {
         console.error("Erro ao buscar erros:", err);
       }
     }
 
     fetchErros();
   }, []);

// Função para excluir o produto
const handleDelete = async (id: string) => {
  try {
    const apiClient = setupApiClient();
    await apiClient.delete(`/erro/remove/${id}`);
    setErros(erros.filter((erros) => erros.id !== id));
    toast.success('erros excluído com sucesso!');
  } catch (error) {
    console.error("Erro ao deletar o erros:", error);
    toast.error('Erro ao excluir o erros');
  }
};

// Função chamada ao clicar no botão "Editar"
const handleEdit = (erros: any) => {
  setErroEditado(erros); // Definir o erros a ser editado
  setIsEditModalOpen(true); // Abrir o modal de edição
};

// Função chamada para atualizar o erros no banco de dados
const handleUpdate = async (errosEditado: any) => {
  try {
    const apiClient = setupApiClient();
    await apiClient.put(`/erros/update/${errosEditado.id}`, errosEditado); // Atualiza o erros no backend
    setErros(erros.map((erros) =>
      erros.id === errosEditado.id ? errosEditado : erros
    ));
    toast.success('erros atualizado com sucesso!');
    handleCloseModal(); // Fechar o modal após a atualização
  } catch (error) {
    console.error("Erro ao atualizar o erros:", error);
    toast.error('Erro ao atualizar o erros');
  }
};

return(

<>

<main>

<section id={StyleErros.ConsultaErro}>

<div className={StyleErros.ConteinerConsulta}>
  {erros.length > 0 ? (
    erros.map((erro) => (
      <ErroItem
        key={erro.id}
        id={erro.id}
        nome={erro.nome}
        causa={erro.causa}
        solucao={erro.solucao}
        imagem={`http://localhost:3333/files/${erro.imagem}`}
        onDelete={handleDelete}
        onEdit={() => handleEdit(erro)}
      />
    ))
  ) : (
    <p>Nenhum erro encontrado.</p> // Mensagem caso não haja erros
  )}
</div>


</section>

</main>

</>

)

}