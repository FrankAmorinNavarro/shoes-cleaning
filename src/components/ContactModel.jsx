
import React from 'react';

export const ContactModel = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado!");
    onClose();
  };
    return (
     <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h4 className="mb-3">Contactar</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="tuemail@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Mensaje</label>
            <textarea
              id="message"
              rows="4"
              className="form-control"
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cerrar</button>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    </div>
    );
}