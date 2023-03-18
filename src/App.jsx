import './App.css'

import * as React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AddPersonPage from './pages/AddPersonPage';
import PersonPage from './pages/PersonPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add-person" element={<AddPersonPage />} />
        <Route path="person/:passport" element={<PersonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}