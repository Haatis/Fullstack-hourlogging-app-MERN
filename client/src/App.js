import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoggingPage from './pages/LoggingPage';

export default function App() {
  return (
    <>
    <h1 className='text-center'>Hour logging application</h1>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/logging" element={<LoggingPage />} />
      </Routes>
      </>
  );
}