import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

const AppRoutes = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} /> {/* Captura cualquier ruta no definida */}
        </Routes>
    </Router>
);

export default AppRoutes;
