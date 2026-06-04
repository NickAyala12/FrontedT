import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

// Datos ficticios de prueba basados en rutas comunes de la empresa
const VIAJES_MOCK = [
  { id: 1, origen: 'Lima', destino: 'Barranca', hora: '07:00 AM', tipo: 'Servicio VIP', precio: 40.00, asientosLibres: 5 },
  { id: 2, origen: 'Lima', destino: 'Barranca', hora: '10:30 AM', tipo: 'Servicio Estándar', precio: 30.00, asientosLibres: 0 }, // BUS LLENO
  { id: 3, origen: 'Barranca', destino: 'Lima', hora: '02:00 PM', tipo: 'Servicio VIP', precio: 45.00, asientosLibres: 12 },
  { id: 4, origen: 'Lima', destino: 'Barranca', hora: '04:30 PM', tipo: 'Servicio VIP', precio: 40.00, asientosLibres: 2 },
];

export default function TravelSearchPage() {
  const [origen, setOrigen] = useState('Lima');
  const [destino, setDestino] = useState('Barranca');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [viajesFiltrados, setViajesFiltrados] = useState(VIAJES_MOCK);
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    e.preventDefault();
    // Filtrar localmente por origen y destino para simular la búsqueda
    const resultados = VIAJES_MOCK.filter(v => 
      v.origen.toLowerCase() === origen.toLowerCase() && 
      v.destino.toLowerCase() === destino.toLowerCase()
    );
    setViajesFiltrados(resultados);
  };

  const seleccionarViaje = (viaje) => {
    // Pasar los datos del viaje seleccionado a la pantalla de asientos
    navigate('/client/select-seats', { state: { viaje } });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6F9' }}>
      {/* Navbar de la Empresa */}
      <header style={{ backgroundColor: '#003399', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bus color="#FFCC00" size={28} />
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Turismo Barranca</h1>
        </div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Cerrar Sesión</button>
      </header>

      <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
        {/* Formulario Buscador */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#1A1A1A' }}>Busca tu pasaje</h3>
          <form onSubmit={handleBuscar} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '500' }}>Origen</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px' }}>
                <MapPin size={18} color="#666" style={{ marginRight: '6px' }} />
                <select value={origen} onChange={(e) => setOrigen(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none', background: 'transparent' }}>
                  <option value="Lima">Lima</option>
                  <option value="Barranca">Barranca</option>
                </select>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '500' }}>Destino</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px' }}>
                <MapPin size={18} color="#666" style={{ marginRight: '6px' }} />
                <select value={destino} onChange={(e) => setDestino(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none', background: 'transparent' }}>
                  <option value="Barranca">Barranca</option>
                  <option value="Lima">Lima</option>
                </select>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '500' }}>Fecha de Viaje</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', padding: '8px' }}>
                <Calendar size={18} color="#666" style={{ marginRight: '6px' }} />
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ border: 'none', width: '100%', outline: 'none' }} />
              </div>
            </div>

            <button type="submit" className="btn-secondary" style={{ height: '40px', padding: '0 25px' }}>Buscar Horarios</button>
          </form>
        </div>

        {/* Lista de Horarios Disponibles */}
        <h4 style={{ color: '#555', marginBottom: '15px' }}>Horarios disponibles para la fecha seleccionada:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {viajesFiltrados.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No se encontraron viajes para esta ruta.</p>
          ) : (
            viajesFiltrados.map((viaje) => (
              <div key={viaje.id} style={{ background: 'white', borderLeft: `6px solid ${viaje.asientosLibres > 0 ? '#003399' : '#CC0000'}`, borderRadius: '6px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                    <strong style={{ fontSize: '18px' }}>{viaje.hora}</strong>
                    <span style={{ fontSize: '12px', background: viaje.tipo.includes('VIP') ? '#FFCC00' : '#e0e0e0', color: '#1A1A1A', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{viaje.tipo}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '14px' }}>
                    <span>{viaje.origen}</span>
                    <ArrowRight size={14} />
                    <span>{viaje.destino}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '13px', color: viaje.asientosLibres > 0 ? '#2e7d32' : '#CC0000', fontWeight: '500' }}>
                    {viaje.asientosLibres > 0 ? `${viaje.asientosLibres} asientos disponibles` : '¡Bus Lleno!'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Precio por pasaje</span>
                    <strong style={{ fontSize: '20px', color: '#003399' }}>S/ {viaje.precio.toFixed(2)}</strong>
                  </div>
                  
                  <button 
                    onClick={() => seleccionarViaje(viaje)}
                    disabled={viaje.asientosLibres === 0}
                    className={viaje.asientosLibres > 0 ? "btn-primary" : ""}
                    style={{ 
                      padding: '10px 20px', 
                      borderRadius: '6px', 
                      fontWeight: 'bold',
                      cursor: viaje.asientosLibres > 0 ? 'pointer' : 'not-allowed',
                      backgroundColor: viaje.asientosLibres > 0 ? '#003399' : '#cccccc',
                      color: viaje.asientosLibres > 0 ? 'white' : '#666666',
                      border: 'none'
                    }}
                  >
                    {viaje.asientosLibres > 0 ? 'Elegir Asientos' : 'Agotado'}
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}