import React from "react";

const PagoNequiInfo = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f7f7f7'
  }}>
    <h1 style={{ color: '#7b1fa2', marginBottom: 24 }}>Pago solo por Nequi</h1>
    <p style={{ fontSize: 20, maxWidth: 400, textAlign: 'center' }}>
      Por el momento, solo aceptamos pagos a través de <b>Nequi</b>.<br /><br />
      Al finalizar tu pedido, te contactaremos para enviarte los datos de pago y confirmar tu compra.
    </p>
    <img src="https://seeklogo.com/images/N/nequi-logo-6B6A6A6B2B-seeklogo.com.png" alt="Nequi Logo" style={{ width: 120, marginTop: 32 }} />
  </div>
);

export default PagoNequiInfo;
