import { useState, useEffect } from "react";
import Modal from "react-modal";
import StyleModalEdicao from "./StyleModal.module.css";
import { setupApiClient } from "../../service/api";
import { toast } from "react-toastify";

interface ModalEdicaoProps {
  isOpen: boolean;
  onRequestClose: () => void;
  cliente: any;
  onUpdate: (clientEditado: any) => void;
}

export function ModalEdicaoCliente({ isOpen, onRequestClose, cliente, onUpdate }: ModalEdicaoProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [statusEmail, setStatusEmail] = useState<boolean>(false);
  const [type, setType] = useState<string>("novo");
  const [numeroMaquina, setNumeroMaquina] = useState<number | null>(null);
  const [fiscal, setFiscal] = useState<string>("");
  const [obs, setObs] = useState<string>("");
  const [sistemId, setSistemId] = useState<string>("");
  const [sistemas, setSistemas] = useState<any[]>([]); // Estado para armazenar os sistemas disponíveis

  useEffect(() => {
    if (cliente) {
      setName(cliente.name);
      setEmail(cliente.email);
      setFiscal(cliente.fiscal);
      setNumeroMaquina(cliente.numero_maquina || null); // Atribui null se não houver valor
      setSistemId(cliente.sistem_id || ''); // Atribui uma string vazia se não houver valor
      setStatusEmail(cliente.status_email || false); // Define o statusEmail com valor padrão
      setObs(cliente.obs || ''); // Atribui uma string vazia se não houver valor
    }
  }, [cliente]);
  

  useEffect(() => {
    // Buscar os sistemas disponíveis ao carregar o modal
    const fetchSistemas = async () => {
      try {
        const apiClient = setupApiClient();
        const response = await apiClient.get("/consulta/sistem"); // Supondo que a API tenha uma rota para retornar os sistemas
        setSistemas(response.data); // Armazenar os sistemas retornados da API
      } catch (error) {
        console.error("Erro ao buscar sistemas:", error);
        toast.error("Erro ao carregar os sistemas.");
      }
    };

    fetchSistemas();

  }, [cliente]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedClient = {
      name,
      email,
      status_email: statusEmail,
      type,
      numero_maquina: numeroMaquina,
      fiscal,
      obs,
      sistem_id: sistemId, // Incluindo o sistema no objeto
    };

    try {
      const apiClient = setupApiClient();
      const response = await apiClient.put(`/update/${cliente.id}`, updatedClient);
      toast.success("Dados atualizados com sucesso!");
      onUpdate(response.data.cliente); // Atualiza no frontend
      onRequestClose(); // Fecha o modal
    } catch (err: any) {
      console.error("Erro ao atualizar cliente:", err.response?.data || err.message, updatedClient);
      toast.error("Erro ao atualizar os dados do cliente");
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };

  return (
    
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

      <div className={StyleModalEdicao.ConteinerModalProduto}>
        <h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome do cliente"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email do cliente"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            <span>Status do Email:</span>
            <input
              type="checkbox"
              checked={statusEmail}
              onChange={() => setStatusEmail(!statusEmail)}
            />
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="novo">Novo</option>
            <option value="existente">Existente</option>
          </select>
          <input
            placeholder="Número da Máquina"
            type="number"
            value={numeroMaquina || ""}
            onChange={(e) => setNumeroMaquina(Number(e.target.value))}
          />
          <input
            placeholder="Fiscal"
            type="text"
            value={fiscal}
            onChange={(e) => setFiscal(e.target.value)}
          />
          <textarea
            placeholder="Observação"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
          
          {/* Select para os sistemas cadastrados */}
          <select value={sistemId} onChange={(e) => setSistemId(e.target.value)}>
            <option value="">Selecione o Sistema</option>
            {sistemas.map((sistema) => (
              <option key={sistema.id} value={sistema.id}>
                {sistema.name} {/* Nome do sistema, pode ser alterado conforme os dados */}
              </option>
            ))}
          </select>

          <button type="submit">Alterar</button>
        </form>
      </div>
    </Modal>
  );
}
