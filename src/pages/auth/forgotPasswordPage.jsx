import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Key } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // Paso 1: Enviar correo, Paso 2: Poner código y nueva clave
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) return Swal.fire('Error', 'Ingresa tu correo', 'error');
    
    Swal.fire('Código Enviado', 'Hemos enviado un código de verificación a tu correo', 'success');
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!code || !newPassword) return Swal.fire('Error', 'Completa los campos', 'error');

    Swal.fire('¡Éxito!', 'Tu contraseña ha sido restablecida', 'success');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1A1A1A' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
        
        <h2 style={{ textAlign: 'center', color: '#003399', marginBottom: '10px' }}>Recuperar Contraseña</h2>
        
        {step === 1 ? (
          <form onSubmit={handleSendCode}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Ingresa tu correo electrónico registrado para enviarte un código de recuperación.</p>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Mail size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="correo@ejemplo.com" required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Enviar Código</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Introduce el código recibido e ingresa tu nueva contraseña.</p>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Key size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="Código de verificación" required />
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Lock size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="Nueva Contraseña" required />
            </div>
            <button type="submit" className="btn-secondary" style={{ width: '100%' }}>Restablecer Contraseña</button>
          </form>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Volver al Login</a>
        </div>
      </div>
    </div>
  );
}