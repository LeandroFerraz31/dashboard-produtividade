
# Dashboard de Produtividade

Uma aplicação web moderna e interativa para análise de produtividade de equipes, desenvolvida para visualizar e gerenciar dados a partir de planilhas Excel.

## ✨ Funcionalidades

- **Upload de Planilhas:** Carregue arquivos Excel (`.xlsx`, `.xls`) para alimentar o dashboard. O sistema lê automaticamente os dados de abas formatadas como `"Categoria DD-MM-AAAA"`.
- **Dashboard Dinâmico:** Visualize métricas chave como total de itens, média diária e produtividade por hora.
- **Gráficos Interativos:**
  - **Evolução Diária:** Gráfico de linha mostrando a produtividade ao longo do tempo.
  - **Distribuição por Categoria:** Gráfico de pizza para entender a distribuição do trabalho.
  - **Comparativo de Colaboradores:** Gráfico de barras comparando o desempenho individual.
- **Filtros Avançados:** Filtre os dados por período (diário, semanal, quinzenal, mensal) e por colaborador.
- **Gerenciamento de Colaboradores:** Cadastre e remova colaboradores diretamente na interface.
- **Painel de Status do Projeto:** Acompanhe o progresso geral do projeto em relação a metas e prazos. As metas e datas são editáveis diretamente na interface.
- **Interface Moderna:** Design limpo e responsivo com painéis recolhíveis para melhor organização.
- **Persistência de Dados:** Todas as informações (dados das planilhas, colaboradores, plano do projeto) são salvas localmente no navegador.

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - **React:** Biblioteca principal para a construção da interface.
  - **TypeScript:** Para um código mais robusto e seguro.
  - **Vite:** Ferramenta de build e desenvolvimento extremamente rápida.
- **Estilização:**
  - **Tailwind CSS:** Framework CSS para estilização rápida e customizável.
- **Visualização de Dados:**
  - **Recharts:** Biblioteca para a criação de gráficos.
- **Ícones:**
  - **Lucide React:** Pacote de ícones SVG, leves e customizáveis.
- **Manipulação de Arquivos:**
  - **xlsx:** Biblioteca para ler e processar arquivos Excel.

## ⚙️ Instalação e Execução

Siga os passos abaixo para rodar o projeto em seu ambiente local.

**1. Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

**2. Instale as dependências:**
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Depois, execute o comando:
```bash
npm install
```

**3. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

## 📋 Como Usar

1.  **Cadastre Colaboradores:** Use o painel "Cadastrar Novo Colaborador" para adicionar os membros da equipe.
2.  **Carregue uma Planilha:** Selecione um colaborador e carregue a planilha de produtividade correspondente. As abas da planilha devem seguir o formato `NOME DA CATEGORIA DD-MM-AAAA`.
3.  **Analise os Dados:** Use os filtros para explorar os dados e interaja com os gráficos para obter mais detalhes.
4.  **Ajuste o Plano:** No painel "Status do Projeto", clique nas metas e datas para ajustá-las conforme necessário.

---

*Desenvolvido por Leandro Ferraz, 2025.*