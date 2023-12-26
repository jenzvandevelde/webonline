import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

// Importeer de pagina's die je wilt weergeven
import LoginPage from './Pages/LoginPage';
import StartupPage from './Pages/StartupPage';
import MoviePage from './Pages/MoviePage';
import MovieInfoPage from './Pages/MovieInfoPage';
import Movieseating from './Pages/Movieseating';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Hier definieer je de routes voor de verschillende pagina's */}
      <Route path="/" element={<StartupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/movie" element={<MoviePage />} />
      <Route path="/movie-info/:id" element={<MovieInfoPage />} />
      <Route path="/seating" element={<Movieseating />} />


{/* Hier is de gewijzigde route */}
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
