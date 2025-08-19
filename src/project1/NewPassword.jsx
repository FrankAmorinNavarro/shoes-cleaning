
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPassword.css';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';                // Hook personalizado para acceder a nuestro contexto de autenticación.


export default function () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    //Estado de validacion para los inputs
    const [touchEmail, setTouchEmail] = useState(false);
    const [touchPassword, setTouchPassword] = useState(false);
    const [touchNewPassword, setTouchNewPassword] = useState(false);

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();  

    useEffect(() => {

        if (isLoggedIn) {  // Si detectamos que el usuario YA está logueado... lo redirigimos inmediatamente al menú principal.

            navigate('/menuprincipal1', { replace: true }); //`replace: true` evita que el usuario pueda volver aquí con el botón "Atrás",
        }
    }, [isLoggedIn, navigate]); // Dependencias: El efecto se vuelve a ejecutar si `isLoggedIn` o `navigate` cambian.

    const esEmailValido = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    //validacion en tiempo real. una constante
    const esValido =
        email.trim() !== '' &&
        password.trim() !== '' &&
        newPassword.trim() !== '' &&
        newPassword === password;

    const handleNewPassword = (e) => {
        e.preventDefault(); //evita el comportamiento por defecto del formulario, que es recargar la página.

        if (!esValido) {
            Swal.fire({
                icon: 'error',
                title: 'Datos inválidos',
                text: 'Por favor, verifica que los campos estén completos y que las contraseñas coincidan.'
            });
            return;
        }

        const userExisting = JSON.parse(localStorage.getItem(email)); // recupera al usuario
        userExisting.password = newPassword;                          //nueva contraseña
        localStorage.setItem(email, JSON.stringify(userExisting));     //Convierte el objeto JavaScript nuevamente a texto JSON para poder guardarlo en el localStorage.

        Swal.fire({
            icon: 'success',
            title: 'Contraseña Nueva Registrada!',
            text: 'Redirigiendo...',
            timer: 2000,
            showConfirmButton: false,
        });

        setTimeout(() => {
            navigate('/proyecto1');
        }, 2000);
    };



    return (

        <div className='newpassword-wrapper'>
            <div className='newpassword-form-card'>
                <div className='card-body'>
                    <h4 className='newpassword-title1'>Recuperar Contraseña</h4>
                    <form onSubmit={handleNewPassword}>

                        <div className='mb-3'>
                            <label htmlFor="email" className='form-label'>Email</label>
                            <input type="text"
                                placeholder='Email...'
                                className='form-control new-email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouchEmail(true)}
                            />
                            {touchEmail && email.trim() === '' && (
                                <small className='text-danger'>Este campo es requerido!!</small>
                            )}
                            {touchEmail && email.trim() !== '' && !esEmailValido(email) && (
                                <small className='text-danger'>El formato del correo es inválido.</small>
                            )}

                        </div>
                        <div className='mb-3'>
                            <label htmlFor="contraseña" className='form-label'>Nueva Contraseña</label>
                            <input type="password"
                                placeholder='Nueva contraseña...'
                                className='form-control new-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouchPassword(true)} />

                            {touchPassword && password.trim() === '' && (
                                <small className='text-danger'>Este campo es requerido!!</small>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="newpassword" className='form-label'>Confirmar Contraseña</label>
                            <input type="password"
                                placeholder='Confirmar contraseña...'
                                className='form-control new-newpassword'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onBlur={() => setTouchNewPassword(true)} />

                            {touchNewPassword && newPassword.trim() === '' && (
                                <small className='text-danger'>Este campo es requerido.""</small>
                            )}

                            {newPassword && password && password !== newPassword && (
                                <small className='text-danger'>La nueva contraseña no conincide!!</small>
                            )}
                        </div>

                        <button type='submit'
                            className='newpassword-submit-btn'
                            disabled={!esValido}>
                            Confirmar
                        </button>
                    </form>
                </div>

            </div>

        </div>
    );
}