import React, { useState,ChangeEvent } from "react";
import { FiEye } from "react-icons/fi";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import StyleErros from "./StyleErro.module.css";
import { setupApiClient } from "../../service/api";
import { toast } from "sonner";

interface Erro {
  id: string;
  nome: string;
  causa: string;
  solucao: string;
  imagem: string | any;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedData: Partial<Omit<Erro, "id">>) => void;
}

export function ErroItem({ id, nome, causa, solucao, imagem, onDelete, onEdit }: Erro) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({ nome, causa, solucao, imagem });
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openEditModal = () => setEditModalVisible(true);
  const closeEditModal = () => setEditModalVisible(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const image = e.target.files[0];
    if (image && (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png')) {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  const handleEditSave = async () => {
    try {
      const apiClient = setupApiClient();
      const data = new FormData();
  
      // Adiciona os campos ao FormData
      data.append("nome", editData.nome);
      data.append("causa", editData.causa);
      data.append("solucao", editData.solucao);
  
      // Verifica se existe uma imagem e adiciona ao FormData
      if (imageAvatar) {
        data.append("files", imageAvatar); // Aqui é o arquivo real
      }
  
      // Envia os dados para o backend
      const response = await apiClient.put(`/erro/update/${id}`, data);
  
      onEdit(id, response.data); // Atualiza o frontend com os dados retornados
      toast.success("Erro atualizado com sucesso!");
      closeEditModal();
    } catch (error) {
      console.error("Erro ao atualizar o erro:", error);
      toast.error("Erro ao atualizar o erro.");
    }
  };
  

  return (
    <>
      <div className={StyleErros.erroItem}>
        <div className={StyleErros.BoxImg}>
          <h3>{nome}</h3>
          {imagem && <img src={imagem} alt={nome} className={StyleErros.erroImage} />}
        </div>

        <div className={StyleErros.conteinerButton}>
          <button className={StyleErros.erroButton} onClick={() => onDelete(id)}>
            <FaTrashAlt />
          </button>
          <button className={StyleErros.erroButton} onClick={openEditModal}>
            <FaPen />
          </button>
          <button className={StyleErros.erroButton} onClick={openModal}>
            <FiEye size={20} color="#fff" />
          </button>
        </div>
      </div>

      {/* Modal de visualização */}
      {modalVisible && (
        <div className={StyleErros.modal}>
          <div className={StyleErros.modalContent}>
            <button onClick={closeModal} className={StyleErros.closeModal}>
              X
            </button>
            {imagem && <img src={imagem} alt={nome} className={StyleErros.modalImage} />}
            <h2>{nome}</h2>
            <p>
              <strong>Causa:</strong> {causa}
            </p>
            <p>
              <strong>Solução:</strong> {solucao}
            </p>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {editModalVisible && (
        <div className={StyleErros.modalEdicao}>
          <div className={StyleErros.modalContent}>
            <button onClick={closeEditModal} className={StyleErros.closeModal}>
              X
            </button>
            <h2>Editar Erro</h2>
            <form onSubmit={handleEditSave}>
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={editData.nome}
                  onChange={handleInputChange}
                  className={StyleErros.input}
                />
              </label>
              <label>
                Causa:
                <textarea
                  name="causa"
                  value={editData.causa}
                  onChange={handleInputChange}
                  className={StyleErros.input}
                />
              </label>
              <label>
                Solução:
                <textarea
                  name="solucao"
                  value={editData.solucao}
                  onChange={handleInputChange}
                  className={StyleErros.input}
                />
              </label>
              <label>
                Imagem:
                <input
                  type="file"
                  name="imagem"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFile}
                  className={StyleErros.input}
                />
                {imageAvatar && <img className={StyleErros.previw} src={avatarUrl} alt="foto do erro" width={100} height={100} />}
              </label>
              <button type="submit" className={StyleErros.saveButton}>
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
