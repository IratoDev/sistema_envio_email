import { useState, useEffect } from "react";
import StyleConsutaCliente from "./StyleConsultaCliente.module.css";
import { ElementClientConsulta } from "../../components/ElementClient";
import { ModalEdicaoCliente } from "../../components/Modal";
import { setupApiClient } from "../../service/api";
import { toast } from "sonner";

type ClienteProps = {
  id: string;
  name: string;
  email:string;
  type:string;
  obs:string;
  fiscal: string;
  sistem_id: string;
  sistema_nome: string;
  numero_maquina: string;
};

type SistemaProps = {
  id: string;
  name: string; // Nome do sistema
};

export function ConsultaCliente() {
  const [clientes, setClientes] = useState<ClienteProps[]>([]);
  const [sistemas, setSistemas] = useState<SistemaProps[]>([]); // Adicionando o estado para armazenar sistemas
  const [filtro, setFiltro] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<ClienteProps | null>(null);

  // Carregar lista de clientes e sistemas ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClient = setupApiClient();
        
        // Buscar lista de clientes
        const responseClientes = await apiClient.get("/consulta");
        setClientes(responseClientes.data);

        // Buscar lista de sistemas
        const responseSistemas = await apiClient.get("consulta/sistem"); // Ajuste a rota de acordo com a sua API
        setSistemas(responseSistemas.data);
      } catch (error) {
        console.error("Erro ao buscar os clientes ou sistemas:", error);
        toast.error("Erro ao carregar os dados!");
      }
    };
    fetchData();
  }, []);

  const getSistemaNome = (sistem_id: string) => {
    const sistema = sistemas.find((s) => s.id === sistem_id);
    return sistema ? sistema.name : "Sistema Desconhecido"; 
  };

  // Fechar modal
  function handleCloseModal() {
    setIsEditModalOpen(false);
    setClienteEditando(null);
  }

  // Função para excluir o cliente
  const handleDelete = async (id: string) => {
    try {
      const apiClient = setupApiClient();
      await apiClient.delete(`/cliente/remove/${id}`);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      toast.success('cliente excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao deletar o cliente:", error);
      toast.error('Erro ao excluir o cliente');
    }
  };

  const handleEdit = (cliente: ClienteProps) => {
    // Defina o cliente a ser editado
    setClienteEditando(cliente);
  };

  // Atualizar cliente no banco de dados
  const handleUpdate = async (clienteEditado: ClienteProps) => {
    if (!clienteEditado || !clienteEditado.id) {
      toast.error("Dados do cliente não encontrados!");
      return;
    }

    try {
      console.log("Dados a serem enviados para atualização:", clienteEditado);
      const apiClient = setupApiClient();
      await apiClient.put(`/update/${clienteEditado.id}`, clienteEditado);
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === clienteEditado.id ? clienteEditado : cliente
        )
      );
      toast.success("Cliente atualizado com sucesso!");
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar o cliente:", error);
      toast.error("Erro ao atualizar o cliente.");
    }
  };

  // Filtrar clientes com base no nome
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.name.toLowerCase().includes(filtro.toLowerCase())
  );

  // Usando useEffect para abrir o modal quando clienteEditando for atualizado
  useEffect(() => {
    if (clienteEditando) {
      setIsEditModalOpen(true);
    }
  }, [clienteEditando]); // Abre o modal quando clienteEditando mudar

  return (
    <main>
      <section id={StyleConsutaCliente.ConsultaCliente}>
        <div className={StyleConsutaCliente.ConteinerPage}>
          {/* Barra de pesquisa */}
          <div className={StyleConsutaCliente.boxPesquisa}>
            <h3>Consulta Cliente:</h3>
            <input
              type="text"
              placeholder="Buscar cliente por nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <div className={StyleConsutaCliente.BoxPage}>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <ElementClientConsulta
                  key={cliente.id}
                  id={cliente.id}
                  cliente={cliente.name}
                  obs={cliente.obs}
                  email={cliente.email}
                  type={cliente.type}
                  sistem_id={getSistemaNome(cliente.sistem_id)}
                  numero_maquinas={cliente.numero_maquina}
                  fiscal={cliente.fiscal}
                  onEdit={() => handleEdit(cliente)}
                  onRemove={handleDelete}
                />
              ))
            ) : (
              <p>Nenhum cliente encontrado.</p>
            )}
          </div>
        </div>
      </section>

      {/* Modal de edição */}
      {clienteEditando && (
        <ModalEdicaoCliente
          isOpen={isEditModalOpen}
          onRequestClose={handleCloseModal}
          cliente={clienteEditando} // Certifique-se de passar os dados corretos
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
}
