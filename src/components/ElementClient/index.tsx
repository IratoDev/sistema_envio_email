import { toast } from "sonner";
import StyleElementClient from "./StyleElementClient.module.css";
import { useState, useEffect } from "react";
import { BsArchive } from "react-icons/bs";
import { FiEye } from 'react-icons/fi'; // Ícone para o botão de visualização


type ElementClientProps = {
    cliente: string; // Nome do cliente
    email: string;   // Email do cliente
    status: boolean; 
    arquivo: (nome: string, email: string, arquivo: File | null) => Promise<void>; // Função para enviar o arquivo
};

type ElementClientConsultaProps = {

id:string;
cliente:string;
numero_maquinas:string;
email:string;
obs:string;
type:string;
sistem_id:string;
fiscal:string
onEdit: () => void;
onRemove: (id: string) => void;

}

export function ElementClient({ cliente, email, status, arquivo }: ElementClientProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [BoxArquivo, setBoxArquivo] = useState(false)


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setBoxArquivo(!!file)
        console.log("Arquivo selecionado:", file);
        console.log(BoxArquivo)
    };
    
    const handleSendEmail = async () => {
        if (!selectedFile) {
            toast.warning("Por favor, selecione um arquivo.");
            return;
        }
    
        try {
            // Chama a função arquivo com os dados corretos
            await arquivo(cliente, email, selectedFile); // Verifique se o arquivo está sendo enviado
            setBoxArquivo(false)
            //console.log("Arquivo enviado com sucesso:", selectedFile);
        } catch (error) {
            //console.error("Erro ao enviar o arquivo:", error);
        }
    };


    return (
<>


<div className={StyleElementClient.ElementClient}>
            <div className={StyleElementClient.ConteinerElement}>
                <div className={StyleElementClient.BoxText}>
                    <p>{cliente}</p>
                </div>
                
                <div className={StyleElementClient.BoxInput}>

                    <label style={{ background: BoxArquivo ? "#03b81b" : "transparent" }}>

                    <span>

                    <BsArchive size="1em"/>

                    </span>

                    <input 
                        type="file" 
                        accept=".xml, .zip, .rar" 
                        onChange={handleFileChange} 
                    />
                    </label>
                </div>

                <div className={StyleElementClient.BoxButton}> 
                    <button onClick={handleSendEmail}>Enviar</button> 
                </div>

                <div className={StyleElementClient.BoxStatus}>
                    <span className={status ? StyleElementClient.spanAtivo : StyleElementClient.spanDesativado}>{status ? 'Enviado' : 'Pendente'}</span>
                </div>
            </div>
        </div>

</>

);
}

export function ElementClientConsulta({id, cliente,type,email,obs, sistem_id, numero_maquinas, fiscal, onEdit, onRemove}: ElementClientConsultaProps) {

const [modalVisible, setModalVisible] = useState(false);

const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

return (
<>

<div className={StyleElementClient.ElementClient}>
            <div className={StyleElementClient.ConteinerElement}>
                <div className={StyleElementClient.BoxText}>
                    <p>{cliente}</p>
                    <p>sistema: {sistem_id}</p>
                    <p>fiscal: {fiscal}</p>
                </div>

                <div className={StyleElementClient.BoxButton}> 
                    <button onClick={onEdit}>editar</button> 
                    <button onClick={()=>onRemove(id)}>excluir</button> 
                    <button onClick={openModal}>
                    <FiEye size={20} color="#fff" />
                    </button>
                </div>

            </div>
        </div>

        {/* Modal que exibe os detalhes do cliente */}
        {modalVisible && (
        <div className={StyleElementClient.modal}>
          <div className={StyleElementClient.modalContent}>
            <button onClick={closeModal} className={StyleElementClient.closeModal}>
              X
            </button>
            <h2>{cliente}</h2>
            
            <table border={1}>
              <thead>
                <tr>
                  <th>tipo:</th>
                  <th>fiscal:</th>
                  <th>sistema:</th>
                  <th>numero de maquinas:</th>
                  <th>email:</th>
                  <th>obs:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td>{type}</td>
                  <td>{fiscal}</td>
                  <td>{sistem_id}</td>
                  <td>{numero_maquinas}</td>
                  <td>{email}</td>
                  <td>{obs}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      )}

</>

);
}