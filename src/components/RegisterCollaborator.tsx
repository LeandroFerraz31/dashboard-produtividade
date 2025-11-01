import React, { useState } from 'react';
import { UserPlus, ChevronDown, ChevronRight } from 'lucide-react';

interface RegisterCollaboratorProps {
  onCollaboratorRegistered: (name: string, area: string) => void;
}

const RegisterCollaborator: React.FC<RegisterCollaboratorProps> = ({ onCollaboratorRegistered }) => {
  // Gerencia o estado dos inputs do formulário e a visibilidade do painel.
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  // Manipula o envio do formulário, valida os dados e chama a função do pai.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && area) {
      // Aciona a função de registro no componente pai e limpa os campos.
      onCollaboratorRegistered(name, area);
      setName('');
      setArea('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <button 
        className="w-full flex justify-between items-center text-left mb-4" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <UserPlus className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">Cadastrar Novo Colaborador</h2>
        </div>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="collaborator-name" className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input
              id="collaborator-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome do colaborador"
            />
          </div>
          <div>
            <label htmlFor="collaborator-area" className="block text-sm font-medium text-gray-700 mb-2">Área</label>
            <input
              id="collaborator-area"
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Área de atuação"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterCollaborator;