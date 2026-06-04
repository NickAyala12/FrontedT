import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Search, CreditCard } from 'lucide-react';
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const [dni, setDni] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingReniec, setLoadingReniec] = useState(false);
  const navigate = useNavigate();

  // Simulación de consulta API Reniec
  const handleConsultarReniec = () => {
    if (dni.length !== 8) {
      Swal.fire('Atención', 'El DNI debe tener 8 dígitos', 'warning');
      return;
    }
    setLoadingReniec(true);
    
    // Simulamos retraso de red
    setTimeout(() => {
      setLoadingReniec(false);
      setFullName('AYALA NICK'); // Nombre simulado que vendría de Reniec
      Swal.fire('Éxito', 'DNI verificado en RENIEC correctamente', 'success');
    }, 1200);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!dni || !fullName || !email || !password || !confirmPassword) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    Swal.fire('¡Registro Exitoso!', 'Ya puedes iniciar sesión con tu cuenta', 'success');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1A1A1A', padding: '20px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '450px' }}>
        
        <h2 style={{ textAlign: 'center', color: '#003399', margin: '0 0 20px 0' }}>Registro de Cliente</h2>

        <form onSubmit={handleRegister}>
          {/* Campo DNI con botón RENIEC */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>DNI (Perú)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px', flex: 1 }}>
                <CreditCard size={18} color="#666" style={{ marginRight: '8px' }} />
                <input type="text" maxLength={8} value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="Escribe tu DNI" />
              </div>
              <button type="button" onClick={handleConsultarReniec} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px' }}>
                <Search size={16} /> {loadingReniec ? '...' : 'RENIEC'}
              </button>
            </div>
          </div>

          {/* Nombre Completo (Deshabilitado porque lo trae RENIEC) */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Nombres Completos</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px', backgroundColor: '#e9ecef' }}>
              <User size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="text" value={fullName} readOnly style={{ border: 'none', width: '100%', outline: 'none', backgroundColor: 'transparent' }} placeholder="Se auto-completa con el DNI" />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Correo Electrónico</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Mail size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="correo@ejemplo.com" />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Contraseña</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Lock size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="Mínimo 6 caracteres" />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Repetir Contraseña</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Lock size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="Repite tu contraseña" />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Registrarse</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          ¿Ya tienes cuenta? <a href="/" style={{ color: '#003399', fontWeight: 'bold', textDecoration: 'none' }}>Inicia Sesión</a>
        </p>

      </div>
    </div>
  );
}