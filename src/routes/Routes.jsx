import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Containers from '../pages/containers';
import Movimentacoes from '../pages/movimentacoes';
import Dashboard from '../pages/dashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Containers />} />
        <Route path="/movimentacoes/:idContainer" element={<Movimentacoes />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
