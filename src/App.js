import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherDetails from './components/WeatherDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/weather/:cityName" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
