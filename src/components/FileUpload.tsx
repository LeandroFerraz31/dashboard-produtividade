import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { UploadCloud, UserCheck, ChevronDown, ChevronRight } from 'lucide-react';

interface Collaborator {
  name: string;
  area: string;
}

interface FileUploadProps {
  onDataLoaded: (data: any[], collaboratorName: string) => void;
  collaborators: Collaborator[];
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded, collaborators }) => {
  // Gerencia o colaborador selecionado e a visibilidade do painel.
  const [selectedCollaborator, setSelectedCollaborator] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  // Reseta a seleção se o colaborador selecionado for removido da lista.
  useEffect(() => {
    if (collaborators.length > 0 && !collaborators.find(c => c.name === selectedCollaborator)) {
      setSelectedCollaborator('');
    }
  }, [collaborators, selectedCollaborator]);

  // Manipula o evento de upload, lendo e processando a planilha Excel.
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!selectedCollaborator) {
      alert('Por favor, selecione um colaborador antes de carregar a planilha.');
      event.target.value = '';
      return;
    }

    const allDataFromFiles: any[] = [];
    let filesProcessed = 0;

    const processFile = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (!arrayBuffer) return;

        try {
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const fileData: any[] = [];
          const sheetNameRegex = /^(.*?) (\d{2}[.\/\-]\d{2}[.\/\-]\d{4})$/;
          for (const sheetName of workbook.SheetNames) {
            const match = sheetName.trim().match(sheetNameRegex);

            if (!match) {
              console.warn(`A aba "${sheetName}" no arquivo "${file.name}" não segue o formato esperado e será ignorada.`);
              continue;
            }

            const category = match[1];
            const dateStr = match[2].replace(/[.\/]/g, '-');
            const dateParts = dateStr.split('-');
            const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            const sheetData = json.map(() => ({
              items: 1,
              date: isoDate,
              category: category,
            }));

            fileData.push(...sheetData);
          }
          allDataFromFiles.push(...fileData);
        } catch (error) {
          console.error(`Erro ao processar a planilha "${file.name}":`, error);
          alert(`Ocorreu um erro ao processar a planilha "${file.name}". Verifique se o arquivo não está corrompido.`);
        } finally {
          filesProcessed++;
          if (filesProcessed === files.length) {
            if (allDataFromFiles.length === 0) {
              alert('Nenhuma aba nas planilhas corresponde ao formato esperado "Categoria DD-MM-AAAA".\nNenhum dado foi carregado.');
            } else {
              onDataLoaded(allDataFromFiles, selectedCollaborator);
              alert(`${files.length} planilha(s) processada(s) com sucesso!\nTotal de ${allDataFromFiles.length} itens carregados.`);
            }
            event.target.value = ''; // Limpa o input no final
          }
        }
      };

      reader.onerror = (error) => {
        console.error(`Erro ao ler o arquivo "${file.name}":`, error);
        alert(`Ocorreu um erro ao ler o arquivo "${file.name}".`);
        filesProcessed++;
        if (filesProcessed === files.length) {
          // Finaliza mesmo se um arquivo der erro
          onDataLoaded(allDataFromFiles, selectedCollaborator);
        }
      };
      reader.readAsArrayBuffer(file);
    };

    for (let i = 0; i < files.length; i++) {
      processFile(files[i]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <button 
        className="w-full flex justify-between items-center text-left mb-4" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <UploadCloud className="text-gray-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">Carregar Planilha</h2>
        </div>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>
      
      {isOpen && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor="upload-collaborator-select" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <UserCheck size={16} />
                Associar planilha ao colaborador:
              </label>
              <select
                id="upload-collaborator-select"
                value={selectedCollaborator}
                onChange={(e) => setSelectedCollaborator(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                disabled={collaborators.length === 0}
              >
                <option value="" disabled>
                  {collaborators.length > 0 ? 'Selecione um colaborador' : 'Nenhum colaborador cadastrado'}
                </option>
                {collaborators.map(collab => (
                  <option key={collab.name} value={collab.name}>
                    {collab.name} ({collab.area})
                  </option>
                ))}
              </select>
            </div>

            <div>
                <label htmlFor="file-upload-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Selecione o arquivo Excel:
                </label>
                <input 
                    id="file-upload-input"
                    type="file" 
                    accept=".xlsx, .xls"
                    multiple // Permite a seleção de múltiplos arquivos
                    onChange={handleFileUpload} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                    disabled={!selectedCollaborator}
                />
            </div>
          </div>
          { !selectedCollaborator &&
              <p className="text-xs text-amber-600 mt-2">
                  {collaborators.length > 0 
                      ? 'Selecione um colaborador para habilitar o upload.'
                      : 'Cadastre um colaborador para começar.'
                  }
              </p>
          }
        </div>
      )}
    </div>
  );
};

export default FileUpload;
