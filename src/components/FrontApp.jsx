import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import loadable from '@loadable/component';


import { AuthProvider, useAuth } from '../context/AuthContext'; 
import ProtectedRoute from '../guards/ProtectedRoute';

// Lazy load de los componentes de página
const Login = loadable(() => import('../pages/Login'));
const MenuPrincipal = loadable(() => import('../pages/MenuPrincipal'));
const Register = loadable(() => import('../pages/Register'));
const NewPassword = loadable(() => import('../pages/NewPassword'));

const PublicRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/menuprincipal" replace /> : <Outlet />;
};

export const FrontApp = () => { 
  return (
    
    <BrowserRouter basename="/shoes-cleaning">
      <AuthProvider>
        <Routes>
          {/* Rutas Públicas */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newcontraseña" element={<NewPassword />} />
          </Route>

          {/* Rutas Privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/menuprincipal" element={<MenuPrincipal />} />
          </Route>

          {/* Ruta "Catch-all" para evitar páginas en blanco */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};