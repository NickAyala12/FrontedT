import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage';
import ForgotPasswordPage from './pages/auth/forgotPasswordPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Rutas temporales vacías para que no rompa al simular ingresos */}
        <Route path="/client/home" element={<div style={{padding: '20px'}}><h2>Panel de Compra de Pasajes (Próximamente)</h2><a href="/">Cerrar Sesión</a></div>} />
        <Route path="/dashboard" element={<div style={{padding: '20px'}}><h2>Panel de Control Staff Interno (Próximamente)</h2><a href="/">Cerrar Sesión</a></div>} />
      </Routes>
    </Router>
  );
}