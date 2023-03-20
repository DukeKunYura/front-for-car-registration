import './App.css'

import * as React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AddPersonPage from './pages/AddPersonPage';
import PersonPage from './pages/PersonPage';
import CarsPage from './pages/CarsPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';

export default function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="add-person" element={<AddPersonPage />} />
        <Route path="person/:passport" element={<PersonPage />} />
        <Route path="cars" element={<CarsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}