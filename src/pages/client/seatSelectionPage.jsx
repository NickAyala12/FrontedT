import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import Swal from 'sweetalert2';

export default function SeatSelectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { viaje } = location.state || { viaje: { hora: '00:00', origen: 'Lima', destino: 'Barranca', precio: 40.00 } };

  // Simulamos un bus con 12 asientos (ocupados algunos al azar)
  const [asientos, setAsientos] = useState([
    { id: 1, nro: '01', estado: 'disponible' }, { id: 2, nro: '02', estado: 'ocupado' },
    { id: 3, nro: '03', estado: 'disponible' }, { id: 4, nro: '04', estado: 'disponible' },
    { id: 5, nro: '05', estado: 'ocupado' },    { id: 6, nro: '06', estado: 'disponible' },
    { id: 7, nro: '07', estado: 'disponible' }, { id: 8, nro: '08', estado: 'disponible' },
    { id: 9, nro: '09', estado: 'disponible' }, { id: 10, nro: '10', estado: 'disponible' },
  ]);

  const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);
  const [metodoPago, setMetodoPago] = useState('');

  const toggleAsiento = (asiento) => {
    if (asiento.estado === 'ocupado') return;
    setAsientoSeleccionado(asientoSeleccionado?.id === asiento.id ? null : asiento);
  };

  const handleProcesarPago = (e) => {
    e.preventDefault();
    if (!asientoSeleccionado) return Swal.fire('Atención', 'Por favor selecciona un asiento', 'warning');
    if (!metodoPago) return Swal.fire('Atención', 'Selecciona un método de pago', 'warning');

    Swal.fire({
      title: 'Procesando Pago...',
      text: `Validando transacción por S/ ${viaje.precio.toFixed(2)} vía ${metodoPago}`,
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    setTimeout(() => {
      Swal.fire({
        title: '¡Viaje Reservado!',
        text: `Tu boleto para el horario de las ${viaje.hora} (Asiento ${asientoSeleccionado.nro}) ha sido pagado con éxito.`,
        icon: 'success',
        confirmButtonColor: '#003399'
      }).then(() => {
        navigate('/client/home');
      });
    }, 2000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/client/home')} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#003399', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
        <ArrowLeft size={16} /> Volver a horarios
      </button>

      <h2 style={{ color: '#003399', margin: '0 0 5px 0' }}>Selección de Asiento y Pago</h2>
      <p style={{ color: '#666', margin: '0 0 25px 0' }}>Ruta: {viaje.origen} a {viaje.destino} - <strong>{viaje.hora}</strong></p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Croquis del Bus */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 15px 0' }}>Distribución del Bus</h4>
          <div style={{ width: '40px', height: '40px', background: '#e0e0e0', borderRadius: '4px', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>Timón</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 45px) 20px repeat(2, 45px)', gap: '10px', justifyContent: 'center' }}>
            {asientos.map((asiento, index) => (
              <React.Fragment key={asiento.id}>
                <button 
                  onClick={() => toggleAsiento(asiento)}
                  style={{
                    height: '45px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: asiento.estado === 'ocupado' ? 'not-allowed' : 'pointer',
                    backgroundColor: asiento.estado === 'ocupado' ? '#CC0000' : (asientoSeleccionado?.id === asiento.id ? '#FFCC00' : '#003399'),
                    color: asientoSeleccionado?.id === asiento.id ? '#1A1A1A' : 'white'
                  }}
                  disabled={asiento.estado === 'ocupado'}
                >
                  {asiento.nro}
                </button>
                {/* Espacio del pasillo central cada 2 asientos */}
                {index % 4 === 1 && <div />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Detalle de compra y Métodos de Pago */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h4>Resumen de Compra</h4>
          <p><strong>Asiento Seleccionado:</strong> {asientoSeleccionado ? `Nro ${asientoSeleccionado.nro}` : 'Ninguno'}</p>
          <p style={{ fontSize: '18px' }}><strong>Total a Pagar:</strong> <span style={{ color: '#003399', fontWeight: 'bold' }}>S/ {viaje.precio.toFixed(2)}</span></p>

          <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />

          <form onSubmit={handleProcesarPago}>
            <h5 style={{ margin: '0 0 10px 0' }}>Selecciona tu Método de Pago</h5>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
                <input type="radio" name="pago" value="Yape" onChange={(e) => setMetodoPago(e.target.value)} />
                <Smartphone size={18} color="#008080" /> Yape
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
                <input type="radio" name="pago" value="Plin" onChange={(e) => setMetodoPago(e.target.value)} />
                <Smartphone size={18} color="#1E90FF" /> Plin
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
                <input type="radio" name="pago" value="Tarjeta" onChange={(e) => setMetodoPago(e.target.value)} />
                <CreditCard size={18} color="#666" /> Tarjeta de Crédito / Débito
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Pagar e Imprimir Boleto</button>
          </form>
        </div>

      </div>
    </div>
  );
}