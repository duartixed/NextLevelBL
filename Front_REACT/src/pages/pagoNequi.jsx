import React from 'react';
import '../styles/nequi.scss';

const PagoNequi = () => {
  return (
    <div className="nequi-container">
      <h1 className="nequi-header">Pago solo por Nequi</h1>
      <p className="nequi-info">
        Por el momento, solo aceptamos pagos a través de <b>Nequi</b>.<br /><br />
        Al finalizar tu pedido, te contactaremos para enviarte los datos de pago y confirmar tu compra.
      </p>
      <img
        src="https://seeklogo.com/images/N/nequi-logo-6B6A6A6B2B-seeklogo.com.png"
        alt="Nequi Logo"
        className="nequi-logo"
      />
      <button className="nequi-button" onClick={() => alert('Gracias por usar Nequi!')}>
        Confirmar Pago
      </button>
    </div>
  );
};

export default PagoNequi;
