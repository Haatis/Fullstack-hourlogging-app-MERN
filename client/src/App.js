import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoggingPage from './pages/LoggingPage';
import './Styles.css';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/logging" element={<LoggingPage />} />
      </Routes>
      </>
  );
}