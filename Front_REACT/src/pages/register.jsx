import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import axiosInstance from '../api/axioInstance';
import "../styles/components/auth.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    email: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [captcha, setCaptcha] = useState({a: 0, b: 0, respuesta: ''});
  const [captchaInput, setCaptchaInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  React.useEffect(() => {
    // Generar pregunta captcha al cargar
    setCaptcha({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
      respuesta: ''
    });
    setCaptchaInput('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones para registrarte.');
      return;
    }
    if (parseInt(captchaInput) !== captcha.a + captcha.b) {
      setError('Captcha incorrecto. Por favor resuelve la suma.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/api/auth/register', formData);
      if (response.data) {
        alert('✅ Registro exitoso!');
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.error || '❌ Error al registrar el usuario');
      console.error('Error en registro:', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-page" style={{padding: '1.5rem 0'}}>
        <div className="auth-container" style={{maxWidth: '340px', padding: '1.2rem 1.2rem', borderRadius: '10px'}}>
          <form onSubmit={handleSubmit} style={{gap: '0.7rem'}}>
            <h2 style={{fontSize: '1.2rem', marginBottom: '0.7rem'}}>Crear Cuenta</h2>
            <div className="form-group" style={{marginBottom: '0.5rem'}}>
              <label style={{fontSize: '0.95rem'}}>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={{fontSize: '0.95rem', padding: '0.4rem 0.7rem', borderRadius: '6px'}}
              />
            </div>
            <div className="form-group" style={{marginBottom: '0.5rem'}}>
              <label style={{fontSize: '0.95rem'}}>Usuario</label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
                style={{fontSize: '0.95rem', padding: '0.4rem 0.7rem', borderRadius: '6px'}}
              />
            </div>
            <div className="form-group" style={{marginBottom: '0.5rem'}}>
              <label style={{fontSize: '0.95rem'}}>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{fontSize: '0.95rem', padding: '0.4rem 0.7rem', borderRadius: '6px'}}
              />
            </div>
            <div className="form-group" style={{marginBottom: '0.5rem'}}>
              <label style={{fontSize: '0.95rem'}}>Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
                style={{fontSize: '0.95rem', padding: '0.4rem 0.7rem', borderRadius: '6px'}}
              />
            </div>
            <div className="form-group" style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
              <input
                type="checkbox"
                id="terminos"
                checked={aceptaTerminos}
                onChange={e => setAceptaTerminos(e.target.checked)}
                style={{marginRight: '0.5rem'}}
                required
              />
              <label htmlFor="terminos" style={{fontSize: '0.9rem'}}>
                Acepto los <Link to="/terminos-condiciones" target="_blank" style={{color: '#ffe600', textDecoration: 'underline'}}>Términos y Condiciones</Link>
              </label>
            </div>
            <div className="form-group" style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
              <label htmlFor="captcha" style={{fontSize: '0.9rem', marginRight: '0.5rem'}}>
                ¿Cuánto es {captcha.a} + {captcha.b}?
              </label>
              <input
                type="number"
                id="captcha"
                value={captchaInput}
                onChange={e => setCaptchaInput(e.target.value)}
                required
                style={{width: '60px', fontSize: '0.95rem', padding: '0.3rem', borderRadius: '6px'}}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="submit-btn" type="submit" disabled={loading || !aceptaTerminos || captchaInput === ''} style={{padding: '0.6rem', fontSize: '1rem', opacity: aceptaTerminos && captchaInput !== '' ? 1 : 0.6}}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
            <div className="auth-links" style={{fontSize: '0.9rem'}}>
              <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;