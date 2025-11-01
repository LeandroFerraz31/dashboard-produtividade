import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductivityDashboard from './components/ProductivityDashboard';

// Importa os estilos globais da aplicação.
import "../index.css";

// Renderiza o componente principal da aplicação no container 'root'.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductivityDashboard />
  </React.StrictMode>,
);