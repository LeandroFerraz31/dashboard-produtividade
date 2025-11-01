
import React, { useState } from 'react';
import { Trash2, UserX, Users, ChevronDown, ChevronRight } from 'lucide-react';

interface Collaborator {
  name: string;
  area: string;
}

interface CollaboratorListProps {
  collaborators: Collaborator[];
  onDeleteCollaborator: (name: string) => void;
}

const CollaboratorList: React.FC<CollaboratorListProps> = ({ collaborators, onDeleteCollaborator }) => {
  // Gerencia o estado de visibilidade (aberto/fechado) do painel.
  const [isOpen, setIsOpen] = useState(true);

  // Exibe um painel informativo se não houver colaboradores cadastrados.
  if (collaborators.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center text-gray-500">
        <div className="flex items-center justify-center gap-2">
            <UserX size={20} />
            <h2 className="text-xl font-semibold">Colaboradores Cadastrados</h2>
        </div>
        <p className="mt-4">Nenhum colaborador cadastrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <button 
        className="w-full flex justify-between items-center text-left mb-4" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Users className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">Colaboradores Cadastrados ({collaborators.length})</h2>
        </div>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {isOpen && (
        // Renderiza a lista de colaboradores cadastrados.
        <ul className="divide-y divide-gray-200">
          {collaborators.map((collaborator) => (
            <li key={collaborator.name} className="py-3 flex justify-between items-center animate-fade-in">
              <div>
                <p className="font-medium text-gray-900">{collaborator.name}</p>
                <p className="text-sm text-gray-500">{collaborator.area}</p>
              </div>
              <button
                onClick={() => onDeleteCollaborator(collaborator.name)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                aria-label={`Excluir ${collaborator.name}`}
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollaboratorList;
