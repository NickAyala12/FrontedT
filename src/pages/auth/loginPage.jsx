import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Lock, Mail } from 'lucide-react';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Cliente'); // Simulación para desarrollo
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
      return;
    }

    // Alerta de éxito con SweetAlert2
    Swal.fire({
      title: '¡Bienvenido!',
      text: `Ingresando como ${role}`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    // Redirección temporal según rol para probar interfaces más adelante
    if (role === 'Cliente') navigate('/client/home');
    else navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1A1A1A' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: '#003399', borderRadius: '50%', color: '#FFCC00', marginBottom: '10px' }}>
            <Bus size={32} />
          </div>
          <h2 style={{ margin: 0, color: '#003399' }}>Turismo Barranca</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>Control de Pasajes y Gestión</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Correo Electrónico</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Mail size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="email" value={email} onChange={(e) => setEmail(value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="correo@ejemplo.com" />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Contraseña</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 12px' }}>
              <Lock size={18} color="#666" style={{ marginRight: '8px' }} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} placeholder="********" />
            </div>
          </div>

          {/* Selector de Rol Temporal para que pruebes los flujos fácilmente */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Simular Rol (Desarrollo)</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
              <option value="Cliente">Cliente</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Staff">Chofer / Terramoza</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '12px' }}>Iniciar Sesión</button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '16px' }}>
          <a href="/forgot-password" style={{ color: '#003399', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>¿Olvidaste tu contraseña?</a>
          <span>¿No tienes cuenta? <a href="/register" style={{ color: '#CC0000', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate aquí</a></span>
        </div>

      </div>
    </div>
  );
}