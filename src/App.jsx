import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage';
import ForgotPasswordPage from './pages/auth/forgotPasswordPage';
import TravelSearchPage from './pages/client/travelSearchPage';
import SeatSelectionPage from './pages/client/seatSelectionPage';
import DashboardPage from './pages/admin/dashboardPage'; // IMPORTADO

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Rutas del Cliente */}
        <Route path="/client/home" element={<TravelSearchPage />} />
        <Route path="/client/select-seats" element={<SeatSelectionPage />} />
        
        {/* Ruta del Dashboard Interno Administrativo */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}