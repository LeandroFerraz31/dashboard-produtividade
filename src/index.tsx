import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importa os estilos globais para a aplicação.
import './styles/globals.css'

// Renderiza o componente raiz (`App`) no container principal do HTML.
// Nota: O ponto de entrada ativo da aplicação está definido em `main.tsx`.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
