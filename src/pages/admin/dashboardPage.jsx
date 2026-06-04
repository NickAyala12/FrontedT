import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Bus, Route, Plus, Trash2, LogOut, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');

  // Estado inicial simulado de Choferes / Terramozas
  const [personal, setPersonal] = useState([
    { id: 1, nombre: 'Carlos Mendoza', rol: 'Chofer', licencia: 'A-IIIa', estado: 'Disponible' },
    { id: 2, nombre: 'Ana Delgado', rol: 'Terramoza', licencia: 'N/A', estado: 'En Viaje' },
    { id: 3, nombre: 'Jorge Luis Vega', rol: 'Chofer', licencia: 'A-IIIc', estado: 'Disponible' },
  ]);

  // Formulario de registro del personal
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRol, setNuevoRol] = useState('Chofer');
  const [nuevaLicencia, setNuevaLicencia] = useState('');

  const handleAgregarPersonal = (e) => {
    e.preventDefault();
    if (!nuevoNombre) return Swal.fire('Error', 'El nombre es obligatorio', 'error');

    const nuevoTrabajador = {
      id: personal.length + 1,
      nombre: nuevoNombre,
      rol: nuevoRol,
      licencia: nuevoRol === 'Chofer' ? nuevaLicencia || 'A-I' : 'N/A',
      estado: 'Disponible'
    };

    setPersonal([...personal, nuevoTrabajador]);
    setNuevoNombre('');
    setNuevaLicencia('');
    Swal.fire('¡Registrado!', `${nuevoRol} agregado correctamente al sistema.`, 'success');
  };

  const handleEliminarPersonal = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se dará de baja al trabajador en el sistema.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003399',
      cancelButtonColor: '#CC0000',
      confirmButtonText: 'Sí, dar de baja'
    }).then((result) => {
      if (result.isConfirmed) {
        setPersonal(personal.filter(p => p.id !== id));
        Swal.fire('Eliminado', 'El registro ha sido actualizado.', 'success');
      }
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F6F9' }}>
      
      {/* Sidebar Lateral Izquierdo */}
      <aside style={{ width: '260px', backgroundColor: '#1A1A1A', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
            <Bus color="#FFCC00" size={26} />
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFCC00' }}>TB Panel Interno</span>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => setActiveTab('personal')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '500', backgroundColor: activeTab === 'personal' ? '#003399' : 'transparent', color: 'white' }}
            >
              <Users size={18} /> Gestión de Personal
            </button>
            <button 
              onClick={() => setActiveTab('buses')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '500', backgroundColor: activeTab === 'buses' ? '#003399' : 'transparent', color: 'white' }}
            >
              <Bus size={18} /> Flota de Buses
            </button>
          </nav>
        </div>

        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#CC0000', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      {/* Contenido Principal Derecho */}
      <main style={{ flex: 1, padding: '40px' }}>
        
        {activeTab === 'personal' ? (
          <div>
            <h2 style={{ color: '#003399', margin: '0 0 24px 0' }}>Gestión de Choferes y Terramozas</h2>

            {/* Formulario de Registro */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#555' }}>Registrar Nuevo Personal (SuperAdmin / Admin)</h4>
              <form onSubmit={handleAgregarPersonal} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Nombre Completo</label>
                  <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                </div>

                <div style={{ flex: 1, minWidth: '130px' }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Rol asignado</label>
                  <select value={nuevoRol} onChange={(e) => setNuevoRol(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                    <option value="Chofer">Chofer</option>
                    <option value="Terramoza">Terramoza</option>
                  </select>
                </div>

                {nuevoRol === 'Chofer' && (
                  <div style={{ flex: 1, minWidth: '130px' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Licencia MTC</label>
                    <input type="text" value={nuevaLicencia} onChange={(e) => setNuevaLicencia(e.target.value)} placeholder="Ej. A-IIIb" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                  </div>
                )}

                <button type="submit" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '38px', padding: '0 20px' }}>
                  <Plus size={16} /> Registrar
                </button>
              </form>
            </div>

            {/* Tabla del Personal Activo */}
            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#003399', color: 'white' }}>
                    <th style={{ padding: '12px 20px' }}>Nombre</th>
                    <th style={{ padding: '12px 20px' }}>Rol</th>
                    <th style={{ padding: '12px 20px' }}>Licencia</th>
                    <th style={{ padding: '12px 20px' }}>Estado</th>
                    <th style={{ padding: '12px 20px', textAlign: 'center' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {personal.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 20px', fontWeight: '500' }}>{p.nombre}</td>
                      <td style={{ padding: '12px 20px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: p.rol === 'Chofer' ? '#E3F2FD' : '#F3E5F5', color: p.rol === 'Chofer' ? '#0D47A1' : '#4A148C' }}>{p.rol}</span></td>
                      <td style={{ padding: '12px 20px', color: '#666' }}>{p.licencia}</td>
                      <td style={{ padding: '12px 20px' }}><span style={{ color: p.estado === 'Disponible' ? '#2e7d32' : '#FFBB00', fontWeight: 'bold' }}>● {p.estado}</span></td>
                      <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                        <button onClick={() => handleEliminarPersonal(p.id)} style={{ background: 'none', border: 'none', color: '#CC0000', cursor: 'pointer' }} title="Dar de baja">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Pestaña Flota de Buses */
          <div>
            <h2 style={{ color: '#003399', margin: '0 0 24px 0' }}>Flota de Buses y Salidas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #003399', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 8px 0' }}>Bus VIP - Placa TBB-789</h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#555' }}><strong>Ruta:</strong> Lima a Barranca</p>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#555' }}><strong>Capacidad:</strong> 40 Asientos</p>
                <span style={{ fontSize: '12px', background: '#E8F5E9', color: '#2E7D32', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Operando</span>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #FFCC00', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 8px 0' }}>Bus Convencional - Placa TBA-456</h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#555' }}><strong>Ruta:</strong> Barranca a Lima</p>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#555' }}><strong>Capacidad:</strong> 50 Asientos</p>
                <span style={{ fontSize: '12px', background: '#FFFDE7', color: '#F57F17', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>En Mantenimiento</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}