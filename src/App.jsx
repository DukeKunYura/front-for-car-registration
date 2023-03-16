import './App.css'

import * as React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AddPersonPage from './pages/AddPersonPage';
import AddAutoPage from './pages/AddAutoPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add-person" element={<AddPersonPage />} />
        <Route path="add-auto" element={<AddAutoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

