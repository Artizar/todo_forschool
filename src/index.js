import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Pastikan Tailwind di sini
import App from './App';
import 'antd/dist/reset.css'; // Pastikan ini diimpor untuk Ant Design

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
