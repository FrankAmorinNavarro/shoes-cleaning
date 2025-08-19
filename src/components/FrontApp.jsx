
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import loadable from '@loadable/component';

import { AuthProvider, useAuth } from '../project1/AuthContext'; 
import NewPassword from '../project1/NewPassword';


// Lazy load componentes de página

const Login = loadable(() => import('../project1/Login'));
const MenuPrincipal = loadable(() => import('../project1/MenuPrincipal'));
const Register = loadable(() => import ('../project1/Register'));


export const FrontApp = () => { 
  
  const ProtectedRoute = () => {
    // ...
  };

  const PublicRoute = () => {
    // ...
  };

  return (
    
    <BrowserRouter basename="/shoes-cleaning">
      <AuthProvider>
        <Routes>
          {/*rutas específicas para ESTA aplicación */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} /> {/* La ruta raíz es el Login */}
            <Route path="/register" element={<Register />} />
            <Route path="/newcontraseña" element={<NewPassword/>}/>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/menuprincipal" element={<MenuPrincipal />} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};