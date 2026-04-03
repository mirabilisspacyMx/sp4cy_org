import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { dbService } from '../api/dbService';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    telefono: '',
    usuario: '',
    rango: '', // Empleo o rango en la DB principal
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    usuario: '',
    password: ''
  });

  useEffect(() => {
    let timerId;
    if (!isVisible) {
      timerId = setTimeout(() => {
        setIsVisible(true);
      }, 35000);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    setFeedbackMsg('');
    
    // Validación básica rápida
    if(formData.password !== formData.confirmPassword) {
      setFeedbackMsg('⚠️ Las contraseñas no coinciden');
      return;
    }
    if(!formData.rango) {
      setFeedbackMsg('⚠️ Por favor selecciona tu rango / empleo');
      return;
    }

    setIsLoading(true);
    
    // Llamada simulando conexión al VPS 0z1nt.org
    const result = await dbService.registerUser(formData);
    
    setIsLoading(false);

    if(result.success) {
      setFeedbackMsg('✅ Registro completado exitosamente en DB Principal.');
      setTimeout(() => {
        setIsRegistering(false); 
        setFeedbackMsg('');
      }, 2000);
    } else {
      setFeedbackMsg(`❌ Error: ${result.error}`);
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Llamada simulando conexión
    const result = await dbService.loginUser(`${loginData.usuario}@sp4cy.com`, loginData.password);
    setIsLoading(false);
    
    if(result.success) {
       setIsVisible(false); // Cierra popup al iniciar sesión
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button 
          className="popup-close" 
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => { setIsRegistering(false); setFeedbackMsg(''); }, 500);
          }} 
          aria-label="Cerrar ventana"
        >
          <X size={24} />
        </button>
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>
          <span className="brand-accent" style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Mirabilis.Sp</span>
        </div>

        {feedbackMsg && (
          <div style={{ marginBottom: '1rem', padding: '0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem', color: feedbackMsg.includes('✅') ? 'var(--accent-color)' : '#ff5e00' }}>
            {feedbackMsg}
          </div>
        )}

        {isRegistering ? (
          <form onSubmit={submitRegistration}>
            <h2 className="popup-title">Crear Cuenta</h2>
            <p className="popup-text">
              Registro al servidor central (sp4cy.shop). Selecciona tu rango.
            </p>
            <div className="popup-form">
              <div className="form-row">
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" className="popup-input half" required />
                <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} placeholder="Apellido" className="popup-input half" required />
              </div>
              <div className="form-row">
                <input type="number" name="edad" value={formData.edad} onChange={handleInputChange} placeholder="Edad" className="popup-input half" required />
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="Teléfono" className="popup-input half" required />
              </div>
              
              <select name="rango" value={formData.rango} onChange={handleInputChange} className="popup-input custom-select" required>
                <option value="" disabled>Selecciona Nivel / Empleo</option>
                <option value="Comprador">Comprador Local</option>
                <option value="Mayorista">Cliente Mayorista</option>
                <option value="Diseñador">Diseñador de Colección</option>
                <option value="Admin">Administrador Principal</option>
              </select>

              <div className="input-group">
                <input type="text" name="usuario" value={formData.usuario} onChange={handleInputChange} placeholder="Tu usuario" className="popup-input input-username" required />
                <span className="domain-suffix">@sp4cy.com</span>
              </div>

              <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Contraseña" className="popup-input" required minLength="6" />
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirmar Contraseña" className="popup-input" required minLength="6" />
              
              <button type="submit" className="btn btn-primary popup-btn" disabled={isLoading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                {isLoading ? <><Loader2 size={18} className="spin-anim" /> Procesando...</> : 'Completar Registro'}
              </button>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#888' }}>
              ¿Ya estás en la base de datos? <span className="register-link" onClick={() => {setIsRegistering(false); setFeedbackMsg('');}}>Iniciar Sesión</span>
            </p>
          </form>
        ) : (
          <form onSubmit={submitLogin}>
            <h2 className="popup-title">Accede a la Cultura</h2>
            <p className="popup-text">
              Autenticación vía sp4cy.shop. Ingresa usuario y contraseña.
            </p>
            <div className="popup-form">
              <div className="input-group">
                <input type="text" name="usuario" value={loginData.usuario} onChange={handleLoginChange} placeholder="Usuario asignado" className="popup-input input-username" required />
                <span className="domain-suffix">@sp4cy.com</span>
              </div>
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Contraseña..." className="popup-input" required />
              
              <button type="submit" className="btn btn-primary popup-btn" disabled={isLoading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                {isLoading ? <><Loader2 size={18} className="spin-anim" /> Conectando...</> : 'Iniciar Sesión'}
              </button>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#888' }}>
              ¿Aún no tienes acceso a la red? <span className="register-link" onClick={() => {setIsRegistering(true); setFeedbackMsg('');}}>Registrarse</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Popup;
