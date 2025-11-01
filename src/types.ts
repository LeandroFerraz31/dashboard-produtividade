/**
 * Representa uma linha de dados brutos extraída da planilha.
 * A estrutura exata pode variar, mas deve conter as colunas relevantes.
 */
export interface RawData {
  category: string;
  items: number;
  date: string;
  collaborator: string;
  [key: string]: any; // Permite outras colunas
}

export interface Collaborator {
  name: string;
  area: string;
}