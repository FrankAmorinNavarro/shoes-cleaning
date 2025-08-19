import './MenuPrincipal.css';
import React, { useState, useRef, useEffect } from 'react';
import logopagina1 from '../assets/img/logopagina1.svg';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import cuidadoImagen from '../assets/img/logocuidados.png';
import cleansneakers from '../assets/img/cleansneakers.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

export default function MenuPrincipal() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [activeLink, setActiveLink] = useState('');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [headerScrolled, setHeaderScrolled] = useState(false);

    const navigate = useNavigate();
    const { logout } = useAuth();

    // LÓGICA CORREGIDA PARA CERRAR SESIÓN
    const handleLogout = () => {
        // Usamos SweetAlert2 para una confirmación visualmente atractiva.
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Tu sesión actual se cerrará.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            // El código dentro de .then() se ejecuta DESPUÉS de que el usuario interactúa con la alerta.
            // Si el usuario hace clic en "Sí, cerrar sesión"...
            if (result.isConfirmed) {
                // ...llamamos a la función `logout()` de nuestro AuthContext.
                // Esta función centralizada se encargará de limpiar la sesión, los estilos del body
                // y de redirigir al usuario, evitando errores y "elementos fantasma".
                logout();
            }
        });
    };

    // La función `handleLinkClick` fue eliminada ya que no se estaba utilizando en el código JSX.

    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Detectar scroll y cambiar el link activo según la sección visible
    useEffect(() => {
        const handleScroll = () => {
            // --- LÓGICA PARA EL HEADER TRANSPARENTE ---
            if (window.scrollY > 50) {
                setHeaderScrolled(true);
            } else {
                setHeaderScrolled(false);
            }

            const sections = [
                { id: 'inicio', name: 'inicio' },
                { id: 'nosotros', name: 'nosotros' },
                { id: 'titulo-servicios', name: 'servicios' },
                { id: 'titulo-cuidados', name: 'procesos' },
                { id: 'titulo-precios', name: 'precios' },
                { id: 'contacto', name: 'contacto' }
            ];
            const scrollOffset = 80;

            for (let section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= scrollOffset && rect.bottom >= scrollOffset) {
                        setActiveLink(section.name);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar el menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    useEffect(() => {
        // Cuando este componente se MONTA, añade el padding al body.
        document.body.style.paddingTop = '70px';

        // ¡LA MAGIA! Esta función de limpieza se ejecuta cuando el componente se DESMONTA.
        return () => {
            // Cuando nos vamos de esta página (ej. al cerrar sesión),
            // eliminamos el padding que añadimos.
            document.body.style.paddingTop = '0';
        };
    }, []);

    const cards = [
        { title: 'LAVADO', text: 'Lavado de tus sneakers personalizado que incluye suela completa, cuerpo exterior, interior, plantillas, pasadores según el tipo de lavado que elijas.' },
        { title: 'PINTADO', text: 'El pintado en RescueSneaks revive el color original o similar de cada sneakers, el pintado es aplicable a tu calzado o sneaker de cuero, tela o gamuza.' },
        { title: 'MID SOLE UV', text: 'Mid Sole UV es un blanqueamiento que se le da a la media suela cuando se pone amarillo, utilizamos un líquido aclarador una máquina UV por sesiones.' },
        { title: 'MID SOLE PAINT', text: 'Mid sole repaint consta de un pintado de media suela al color que se requiera. La duración es entre 6 meses a 1 año aproximadamente dependiendo del cuidado.' },
        { title: 'CAMBIO DE SUELA', text: 'Para el cambio de suela debes consultar primero si contamos con la suela del calzado a restaurar a través de nuestros canales de com.' },
        { title: 'PERSONALIZACIONES', text: 'Uno de nuestros servicios favoritos pues le damos un giro total a cada par. Solo nos mandas el diseño para tus pares.' }
    ];

    const cards2 = [
        { title2: 'Servicio Personalizado', text2: 'Servicio personalizado para cada uno de tus sneakers.' },
        { title2: 'Recomendaciones para tu Calzado', text2: 'Te brindamos toda nuestra experiencia en cada sneakers.' },
        { title2: 'Entrega en tienda y/o Delivery', text2: 'Te ofrecemos agendar el recojo y entrega de tus sneakers.' },
        { title2: 'Herramientas', text2: 'Utilizamos las herramientas adecuadas para tus sneakers.' },
        { title2: 'Materiales de Calidad', text2: 'Utilizamos insumos de calidad en cada servicio.' },
        { title2: 'Atención Personalizada', text2: 'Cada par para nosotros es único y especial, por lo que le dedicamos todo nuestro tiempo.' }
    ];

    const cards3 = [
        {
            price: 'S/.22.00', title3: 'PINTADO DE CUERPO', text3: [
                'Pintado cuerpo de la Sneaker',
                'Color original o similar',
                'Para cuero, tela o gamuza',
                'No incluye media suela'
            ]
        },
        {
            price: 'S/.28.00', title3: 'LAVADO PREMIUM', text3: [
                'Lavado de suela',
                'Lavado cuerpo exterior',
                'Lavado cuerpo interior',
                'Lavado de plantillas y pasadores'
            ]
        },
        {
            price: 'S/.22.00', title3: 'LAVADO CLÁSICO', text3: [
                'Lavado cuerpo completo',
                'Lavado solo exterior',
                'No incluye plantillas',
                'No incluye pasadores'
            ]
        }
    ];

    return (
        <>

            <header className={`fondo-header ${headerScrolled ? 'header-scrolled' : ''}`}>

                <ul className="encabezado" >
                    <li className="logo-container">
                        <a href="#" className='logo-link'>
                            <img src={logopagina1} alt="Logo" className='logo-img' />
                            <span className='logo-text'>Shoes Cleaning</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#"
                            className={activeLink === 'nosotros' ? 'activo' : ''}
                            onClick={() => {
                                const section = document.querySelector('#nosotros');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                                setActiveLink('nosotros');
                            }}>Nosotros</a>
                    </li>
                    <li className="menu-item">
                        <a href="#titulo-servicios"
                            className={activeLink === 'servicios' ? 'activo' : ''}
                            onClick={() => {
                                const section = document.querySelector('#titulo-servicios');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                                setActiveLink('servicios');
                            }}>Servicios</a>
                    </li>
                    <li className="menu-item">
                        <a href="#titulo-cuidados"
                            className={activeLink === 'procesos' ? 'activo' : ''}
                            onClick={() => {
                                const section = document.querySelector('#procesos');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                                setActiveLink('procesos');
                            }}>Procesos</a>
                    </li>
                    <li className="menu-item">
                        <a href="#titulo-precios"
                            className={activeLink === 'precios' ? 'activo' : ''}
                            onClick={() => {
                                const section = document.querySelector('#precios');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                                setActiveLink('precios');
                            }}>Precios</a>
                    </li>
                    <li className="menu-item">
                        <a href="#contacto"
                            className={activeLink === 'contacto' ? 'activo' : ''}
                            onClick={() => {
                                const section = document.querySelector('#contacto');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                                setActiveLink('contacto');
                            }}>Contacto</a>
                    </li>

                    <li className="menu-item">
                        <a href="#" onClick={handleLogout} className="logout-button">
                            Cerrar Sesión
                        </a>
                    </li>

                    <li className="menu-hamburguesa" ref={menuRef}>
                        <button
                            id="btn-menu"
                            onClick={toggleMenu}
                            aria-expanded={menuOpen}
                            aria-label="Menú"
                            className={menuOpen ? 'active' : ''}
                        >
                            ☰
                        </button>
                        <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`}>
                            <ul>
                                <li><a href="#" className={activeLink === 'nosotros' ? 'activo' : ''} onClick={toggleMenu}>Nosotros</a></li>
                                <li><a href="#titulo-servicios" className={activeLink === 'servicios' ? 'activo' : ''} onClick={toggleMenu}>Servicios</a></li>
                                <li><a href="#titulo-cuidados" className={activeLink === 'procesos' ? 'activo' : ''} onClick={toggleMenu}>Procesos</a></li>
                                <li><a href="#titulo-precios" className={activeLink === 'precios' ? 'activo' : ''} onClick={toggleMenu}>Precios</a></li>
                                <li><a href="#contacto" className={activeLink === 'contacto' ? 'activo' : ''} onClick={toggleMenu}>Contacto</a></li>
                                <li><a href="#" onClick={handleLogout}>Cerrar Sesión</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </header>

            <div id="inicio" className="cuerpo container py-5">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-auto text-center text-lg-start mb-5 mb-lg-0">
                        <p className='display-4 fw-bold text-inicio'>
                            Restauración de tu calzado, Síguenos y conoce nuestros resultados
                        </p>
                        <div className="d-flex justify-content-center justify-content-lg-start gap-3 mt-4">
                            <a href="#" className='btn btn-facebook d-flex align-items-center px-4 py-2'>
                                <FaFacebook className='me-2' />Facebook
                            </a>
                            <a href="#" className='btn btn-instagram d-flex align-items-center px-4 py-2'>
                                <FaInstagram className='me-2' />Instagram
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-auto text-center  img-inicio">
                        <img src={cleansneakers} alt="Restauración de calzado" className="img-fluid" />
                    </div>
                </div>
            </div>

            <div className='titulo-servicios' id='titulo-servicios'>
                <p>Nuestros Servicios</p>
            </div>

            <div className="container mt-4">
                <div className="card-grid">
                    {cards.map((card, index) => (
                        <div key={index}>
                            <div className="card servicios">
                                <div className="card-body cuerpo">
                                    <h5 className="card-title titulo-service">{card.title}</h5>
                                    <p className="card-text text-service">{card.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='titulo-cuidados' id='titulo-cuidados'>
                <p>Nuestros Cuidados</p>
            </div>

            <div className="container cuidados-container my-5">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-3 col-md-6 order-lg-1 order-2">
                        {cards2.slice(0, 3).map((cards, index) => (
                            <div className="cuidado-card card-left" key={index}>
                                <div className="cuidado-card-content">
                                    <h5 className="cuidado-card-title">{cards.title2}</h5>
                                    <p className="cuidado-card-text">{cards.text2}</p>
                                </div>
                                <div className="cuidado-card-icon"></div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-6 col-md-12 order-lg-2 order-1 d-flex justify-content-center px-lg-5 my-4 my-lg-0">
                        <img src={cuidadoImagen}
                            className="img-fluid"
                            onClick={() => setIsImageModalOpen(true)}
                            style={{ cursor: 'pointer' }} />
                    </div>
                    <div className="col-lg-3 col-md-6 order-lg-3 order-3">
                        {cards2.slice(3, 6).map((cards, index) => (
                            <div className="cuidado-card card-right" key={index + 3}>
                                <div className="cuidado-card-icon"></div>
                                <div className="cuidado-card-content">
                                    <h5 className="cuidado-card-title">{cards.title2}</h5>
                                    <p className="cuidado-card-text">{cards.text2}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isImageModalOpen && (
                <div className="image-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={cuidadoImagen} alt="Cuidado profesional de sneakers - Vista ampliada" />
                        <button className="close-modal-button" onClick={() => setIsImageModalOpen(false)}>
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className='titulo-precios' id='titulo-precios'>
                <p>Nuestros Precios</p>
            </div>

            <div className="container my-5">
                <div className="pricing-grid">
                    {cards3.map((card, index) => (
                        <div className="price-card" key={index}>
                            <div className="price-card-icon-circle">
                                <div className="price-card-icon-inner"></div>
                            </div>
                            <div className="price-tag">{card.price}</div>
                            <h5 className="price-card-title">{card.title3}</h5>
                            <div className="price-card-features">
                                {card.text3.map((text3, text3Index) => (
                                    <p key={text3Index}>{text3}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="contact-section" id="contacto">
                <div className="container">
                    <div className="section-title">
                        <p>Contáctanos</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <form className="contact-form">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" name="name" className="form-control" placeholder="Nombre" required />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="email" name="email" className="form-control" placeholder="Email" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="subject" className="form-control" placeholder="Asunto" required />
                                </div>
                                <div className="form-group">
                                    <textarea name="message" className="form-control" rows="5" placeholder="Mensaje" required></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit">Enviar Mensaje</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9427909995324!2d-77.0315510258965!3d-12.04639904169736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d7237973%3A0x93d013e735d49a71!2sPlaza%20de%20Armas%20de%20Lima!5e0!3m2!1ses-419!2spe!4v1716346123456!5m2!1ses-419!2spe"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 mb-4 mb-lg-0">
                            <div className="footer-widget">
                                <img src={logopagina1} alt="Rescue Sneaks Logo" className="footer-logo" />
                                <p className="footer-description">
                                    Cada par para nosotros es especial; por ello requiere tiempo, dedicación y ganas para volver a darles vida.
                                </p>
                                <div className="footer-social-icons">
                                    <a href="https://www.facebook.com" className="social-icon-link">
                                        <FaFacebook />
                                    </a>
                                    <a href="https://www.instagram.com" className="social-icon-link">
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <div className="footer-widget">
                                <h5 className="footer-widget-title">Contacto</h5>
                                <ul className="footer-contact-list">
                                    <li>
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>Av. Las Naciones Unidas<br />Lima, Perú</span>
                                    </li>
                                    <li>
                                        <i className="fas fa-phone-alt"></i>
                                        <span>P: 974 697 110</span>
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope"></i>
                                        <span>Email: frankalexisamorinnavarro@gmail.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <p>Copyright reserved by Frank © 2025</p>
                    </div>
                </div>
            </footer>
        </>
    );
}