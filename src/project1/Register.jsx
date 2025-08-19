
// Importamos hooks y funciones de las librerías que necesitamos.
import { useNavigate } from 'react-router-dom';        // Hook para navegar entre páginas.
import { useState, useEffect } from 'react';          // Hooks de React para manejar estado y efectos secundarios.
import './Register.css';                                // Hoja de estilos específica para este componente.
import Swal from 'sweetalert2';                         // Librería para mostrar alertas bonitas y personalizadas.
import { useAuth } from './AuthContext';                // Hook personalizado para acceder a nuestro contexto de autenticación.


// === DEFINICIÓN DEL COMPONENTE DE REGISTRO ===
export default function Register() {
  // === ESTADOS DEL COMPONENTE ===
  // Aquí declaramos todas las "variables de memoria" del componente.
  // Cada `useState` crea una variable y una función para actualizarla.
  
  // Estados para los valores de los inputs del formulario.
  const [nombres, setNombres] = useState('');                   // G  uarda lo que el usuario escribe en el campo "Nombres".
  const [apellidos, setApellidos] = useState('');               // Guarda lo que el usuario escribe en el campo "Apellidos".
  const [email, setEmail] = useState('');                       // Guarda lo que el usuario escribe en el campo "Correo".
  const [password, setPassword] = useState('');                 // Guarda lo que el usuario escribe en el campo "Contraseña".
  const [confirmPassword, setConfirmPassword] = useState('');   // Guarda lo que el usuario escribe en "Confirmar contraseña".

  // Estados para la validación visual (experiencia de usuario).
  // Estos se vuelven `true` cuando el usuario interactúa con un campo y luego lo deja.
  const [touchNombres, setTouchNombres] = useState(false);
  const [touchApellidos, setTouchApellidos] = useState(false);
  const [touchEmail, setTouchEmail] = useState(false);
  const [touchPassword, setTouchPassword] = useState(false);
  const [touchConfirmPassword, setTouchConfirmPassword] = useState(false);

  // === HOOKS DE NAVEGACIÓN Y AUTENTICACIÓN ===
  const navigate = useNavigate();                       // Inicializamos el hook de navegación para poder redirigir al usuario.
  const { isLoggedIn } = useAuth();                     // Obtenemos el estado `isLoggedIn` desde nuestro AuthContext global.

  // === EFECTO SECUNDARIO (useEffect) PARA PROTEGER LA RUTA ===
  // Este bloque de código se ejecuta automáticamente cuando el componente se carga por primera vez
  // y cada vez que el valor de `isLoggedIn` cambia.
  useEffect(() => {
    
    if (isLoggedIn) {  // Si detectamos que el usuario YA está logueado... lo redirigimos inmediatamente al menú principal.
      
      navigate('/menuprincipal1', { replace: true }); //`replace: true` evita que el usuario pueda volver aquí con el botón "Atrás",
    }
  }, [isLoggedIn, navigate]); // Dependencias: El efecto se vuelve a ejecutar si `isLoggedIn` o `navigate` cambian.

  // === LÓGICA DE VALIDACIÓN DEL FORMULARIO ===
  // Función auxiliar que usa una expresión regular (regex) para verificar si un texto tiene el formato de un email.
  const esEmailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Esta constante es la clave para la validación en tiempo real. Se recalcula en cada render.
  // Será `true` ÚNICAMENTE si TODAS las condiciones se cumplen.
  const esFormularioValido =
    nombres.trim() !== '' &&          // El nombre no está vacío (ignorando espacios en blanco al inicio/final).
    apellidos.trim() !== '' &&        // El apellido no está vacío.
    email.trim() !== '' &&            // El email no está vacío.
    esEmailValido(email) &&           // Y además, el email tiene un formato válido.
    password.trim() !== '' &&         // La contraseña no está vacía.
    confirmPassword.trim() !== '' &&  // La confirmación de contraseña no está vacía.
    password === confirmPassword;     // Y ambas contraseñas son idénticas.

  // === FUNCIÓN MANEJADORA DEL ENVÍO DEL FORMULARIO ===
  // Esta función se ejecuta cuando el usuario hace clic en el botón "Registrar" (de tipo submit).
  const handleRegister = (e) => {
    // `e.preventDefault()` evita el comportamiento por defecto del formulario, que es recargar la página.
    e.preventDefault();

    // Doble validación: Aunque el botón está deshabilitado, es una buena práctica de seguridad
    // validar también en el momento del envío, por si el usuario logra saltarse la deshabilitación.
    if (!esFormularioValido) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, revise los campos e intente de nuevo.',
      });
      return; // El `return` detiene la ejecución de la función aquí.
    }

    // Comprobamos si ya existe un usuario en localStorage con este email como clave.
    if (localStorage.getItem(email)) {
      Swal.fire({ icon: 'error', title: 'Usuario existente', text: 'Ya existe una cuenta registrada con este correo.' });
      return; // Detenemos la ejecución si el usuario ya existe.
    }

    // Si todas las validaciones pasan, creamos un objeto con los datos del nuevo usuario.
    const newUser = { nombres, apellidos, email, password };
    
    // Guardamos el nuevo usuario en el almacenamiento local del navegador.
    // Usamos el email como clave ÚNICA y el objeto `newUser` (convertido a texto JSON) como valor.
    localStorage.setItem(email, JSON.stringify(newUser));

    // Mostramos una alerta de éxito al usuario.
    Swal.fire({
      icon: 'success',
      title: '¡Cuenta registrada!',
      text: 'Serás redirigido al inicio de sesión...',
      timer: 2000,           // La alerta se cierra automáticamente después de 2 segundos.
      showConfirmButton: false, // Ocultamos el botón "OK".
    });

    // Usamos `setTimeout` para esperar a que la alerta se muestre antes de redirigir.
    setTimeout(() => {
      // Navegamos al usuario a la página de inicio de sesión.
      navigate('/proyecto1');
    }, 2000); // 2000 milisegundos = 2 segundos.
  };

  // === RENDERIZADO DEL COMPONENTE (JSX) ===
  // Aquí se define la estructura HTML que se mostrará en la pantalla.
  return (
    <div className='register-wrapper'>
      <div className="register-form-card">
        <div className="card-body">
          <h4 className="register-title2">Crear Cuenta</h4>
          <form onSubmit={handleRegister}>
            
            {/* --- Campo Nombres --- */}
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">Nombres</label>
              <input
                placeholder='Nombres'
                type="text"
                className="form-control register-correo"
                id="nombres"
                value={nombres} // El valor del input está controlado por el estado `nombres`.
                onChange={(e) => setNombres(e.target.value)} // Cada vez que el usuario escribe, actualiza el estado.
                onBlur={() => setTouchNombres(true)} // Cuando el usuario deja el campo, lo marcamos como "tocado".
              />
              {/* Renderizado condicional del mensaje de error. */}
              {touchNombres && nombres.trim() === '' && (
                <small className='text-danger'>Este campo es requerido.</small>
              )}
            </div>

            {/* --- Campo Apellidos --- */}
            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input
                placeholder='Apellidos'
                type="text"
                className="form-control register-correo"
                id="apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                onBlur={() => setTouchApellidos(true)}
              />
              {touchApellidos && apellidos.trim() === '' && (
                <small className='text-danger'>Este campo es requerido.</small>
              )}
            </div>

            {/* --- Campo Correo --- */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input
                placeholder='Correo'
                type="email" // Usar type="email" ayuda a la validación automática en algunos navegadores.
                className="form-control register-correo"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouchEmail(true)}
              />
              {/* Muestra un error si el campo está vacío y ha sido tocado. */}
              {touchEmail && email.trim() === '' && (
                <small className='text-danger'>Este campo es requerido.</small>
              )}
              {/* Muestra un error si el campo tiene texto pero no es un email válido. */}
              {touchEmail && email.trim() !== '' && !esEmailValido(email) && (
                <small className='text-danger'>El formato del correo es inválido.</small>
              )}
            </div>

            {/* --- Campo Contraseña --- */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                placeholder='Contraseña'
                type='password'
                className="form-control register-contraseña"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouchPassword(true)}
              />
              {touchPassword && password.trim() === '' && (
                <small className='text-danger'>Este campo es requerido.</small>
              )}
            </div>

            {/* --- Campo Confirmar Contraseña --- */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label" >Confirmar contraseña</label>
              <input
                placeholder='Confirmar contraseña'
                type='password'
                className="form-control register-contraseña"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setTouchConfirmPassword(true)}
              />
              {touchConfirmPassword && confirmPassword.trim() === '' && (
                <small className='text-danger'>Este campo es requerido.</small>
              )}
              {/* Muestra un error si el campo tiene texto pero no coincide con la primera contraseña. */}
              {confirmPassword && password && password !== confirmPassword && (
                <small className="text-danger">Las contraseñas no coinciden.</small>
              )}
            </div>

            {/* --- Botón de Envío --- */}
            <div></div>
            <button 
              type="submit" 
              className="register-submit-btn"
              // El atributo `disabled` se activa (se vuelve `true`) si la constante `esFormularioValido` es `false`.
         
              
            >
              Registrar
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};
