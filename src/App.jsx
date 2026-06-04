import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage';
import ForgotPasswordPage from './pages/auth/forgotPasswordPage';
import TravelSearchPage from './pages/client/travelSearchPage';
import SeatSelectionPage from './pages/client/seatSelectionPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Rutas reales del Cliente */}
        <Route path="/client/home" element={<TravelSearchPage />} />
        <Route path="/client/select-seats" element={<SeatSelectionPage />} />
        
        {/* Ruta pendiente del Dashboard interno */}
        <Route path="/dashboard" element={<div style={{padding: '20px'}}><h2>Panel de Control Staff Interno (Próximamente)</h2><a href="/">Cerrar Sesión</a></div>} />
      </Routes>
    </Router>
  );
}