

import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext(null);

// 2. Creamos el Proveedor (un componente que envolverá nuestra app)
export const AuthProvider = ({ children }) => {
    // Estado para saber si el usuario está logueado.
    // Lo inicializamos leyendo de sessionStorage para recordar el estado si se recarga la página.
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('isLoggedIn'));

    // Función para iniciar sesión
    const login = () => {
        sessionStorage.setItem('isLoggedIn', 'true'); // Guardamos en el navegador
        setIsLoggedIn(true);
    };

    // Función para cerrar sesión
    const logout = () => {
        sessionStorage.removeItem('isLoggedIn'); // Borramos del navegador
        setIsLoggedIn(false);
    };
    // El valor que compartiremos con toda la app
    const value = {
        isLoggedIn,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Creamos un hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};
