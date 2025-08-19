
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import './Login.css';
import logopagina1 from '../assets/img/logopagina1.svg';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';


export default function Login() {

  // Esto define estados locales para el correo electrónico y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const [touchEmail, setTouchEmail] = useState(false);
  const [touchPassword, setTouchPassword] = useState(false);



  const navigate = useNavigate();

  const irRegistro = () => {
    navigate('/register');
  };

  const irNewContraseña = () => {
    navigate('/newcontraseña')
  };

  const { login, isLoggedIn } = useAuth(); // ¡Añadimos isLoggedIn!



  useEffect(() => {
    // Si el usuario ya está logueado y llega a esta página,
    // lo redirigimos inmediatamente al menú principal.
    if (isLoggedIn) {
      navigate('/menuprincipal1', { replace: true });
    }
  }, [isLoggedIn, navigate]); // Se ejecuta cada vez que 'isLoggedIn' o 'navigate' cambian.

  const esEmailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      // Si es así, mostramos la alerta de error y detenemos todo.
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, ingrese su correo y contraseña.',
      });
      return; // El 'return' detiene la ejecución de la función aquí.
    }

    // 1. Buscar al usuario en localStorage usando el email del formulario
    const userDataJSON = localStorage.getItem(email);

    // 2. Comprobar si el usuario NO existe
    if (!userDataJSON) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'El correo o la contraseña son incorrectos.',
      });
      return; // Detiene la ejecución
    }

    // 3. Si el usuario existe, lo convertimos a objeto
    const userData = JSON.parse(userDataJSON);

    // 4. Comparamos la contraseña del formulario con la guardada
    if (userData.password === password) {
      // ¡Éxito! Las contraseñas coinciden
      login(); // Llama a tu función de AuthContext
      navigate('/menuprincipal1'); // Redirige al menú principal
    } else {
      // La contraseña es incorrecta
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'El correo o la contraseña son incorrectos.',
      });
    }
  };

  useEffect(() => {
    document.body.className = ''; // Borra estilos globales si MenuPrincipal los dejó
    document.body.removeAttribute('style');
  }, []);



  // JSX que representa la estructura visual del formulario de login
  return (
    <div className="login-container"> {/* Contenedor principal que ocupa toda la altura de la pantalla */}
      <div className="container-fluid login-outer-container px-0"> {/* Contenedor fluido de Bootstrap */}
        <div className="row login-row g-0"> {/* Fila para dividir en columnas */}

          {/* Columna izquierda - Sección de bienvenida */}
          <div className="col-md-6 login-welcome-section order-1 order-md-1"> {/* Visible en pantallas medianas en adelante */}
            <div className="login-image-container"> {/* Contenedor de imagen */}
              <img
                src={logopagina1}  // Ruta de la imagen de bienvenida
                alt="Welcome"
                className="login-image"
              />
            </div>
            <div className="login-welcome-content"> {/* Contenido centrado */}
              <h1 className="login-title">Welcome to Shoes Cleaning!</h1> {/* Título de bienvenida */}
              <p className="login-text">
                Empresa dedicada a ofrecer servicio de atención al cliente y limpieza de calzados.
              </p> {/* Texto descriptivo */}
            </div>
          </div>

          {/* Columna derecha - Formulario de inicio de sesión */}
          <div className="col-md-6 login-form-container order-2 order-md-2"> {/* Contenedor del formulario */}
            <div className="login-form-card"> {/* Tarjeta con sombra */}
              <div className="card-body"> {/* Cuerpo de la tarjeta */}
                <h4 className="login-title2">Iniciar Sesión</h4> {/* Título del formulario */}

                <form onSubmit={handleLogin}> {/* Formulario sin lógica de envío aún */}
                  {/* Campo de correo */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Correo</label>
                    <input
                      type="text"
                      className="form-control login-correo"
                      id="username"
                      placeholder="Ingrese su correo"
                      value={email} // Valor actual del estado
                      onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando el usuario escribe
                      onBlur={() => setTouchEmail(true)}
                    />

                    {touchEmail && email.trim() === '' && (
                      <small className='text-danger'>Este campo no puede estar vacío.</small>
                    )}
                    {touchEmail && email.trim() !== '' && !esEmailValido(email) && (
                      <small className='text-danger'>El formato del correo es inválido.</small>
                    )}
                  </div>

                  {/* Campo de contraseña */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <div className="input-password">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control login-contraseña" // Quitamos pe-4, lo manejará el CSS
                        id="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouchPassword(true)}
                      />


                      <span
                        className="password-toggle-icon"
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLave={() => setShowPassword(false)}
                      >
                        {showPassword ? (
                          <svg viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0
                           0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 
                           3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        )}
                      </span>

                    </div>

                    {touchPassword && password.trim() === '' && (
                      <small className='text-danger'>Este campo no puede estar vacío.</small>
                    )}
                  </div>

                  {/* Opciones: Recordarme y enlace de recuperación */}
                  <div className="login-options-container">
                    <div className="form-check"> {/* Checkbox "Recordarme" */}
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                    </div>

                    {/* Enlace para recuperar contraseña */}
                    <a className="login-forgot-password" onClick={irNewContraseña}>Olvidaste tu contraseña?</a>
                  </div>

                  {/* Botón para enviar el formulario */}
                  <button type="submit" className="login-submit-btn">Ingresar</button>

                  {/* Enlace para crear una nueva cuenta */}
                  <div className="login-signup-container">
                    <p className="login-signup-text">
                      No tienes cuenta? <a type='button' className="login-signup-link" onClick={irRegistro}>Crear una cuenta</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div> {/* Cierre de la fila */}
      </div> {/* Cierre del contenedor fluido */}
    </div> // Cierre del contenedor principal
  );
};