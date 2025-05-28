import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import "../styles/components/auth.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Registration successful!');
        navigate("/login");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      alert('❌ Error while registering user');
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-box">
          <button
            className="boton-flecha-home"
            style={{ position: 'absolute', top: 30, left: 30, zIndex: 10 }}
            onClick={() => navigate('/')}
            title="Volver al inicio"
          >
            &#8592;
          </button>
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Register</button>
            <Link to="/" className="btn-volver-home">Volver a Home</Link>
          </form>
          <button onClick={() => navigate("/login")}>
            Already have an account? Log In
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;