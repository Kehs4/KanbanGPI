import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/home.jsx'
import Tasks from './pages/tasks.jsx';

const AppRoutes = () => {
  return (
        <Routes>
            <Route index path="*" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
        </Routes>
  );
};

export default AppRoutes;