import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CitiesTable() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order
  const limit = 20;
  const navigate = useNavigate();

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://your-cities-api?offset=${offset}&limit=${limit}`);
      setCities((prevCities) => [...prevCities, ...response.data]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    setLoading(false);
  }, [offset, limit]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !loading) {
      fetchCities();
    }
  }, [fetchCities, loading]);

  useEffect(() => {
    fetchCities();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchCities, handleScroll]);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCities = [...filteredCities].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div>
      <h1>City List</h1>

      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />

      <button onClick={toggleSortOrder}>
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>

      <table>
        <thead>
          <tr>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {sortedCities.map((city, index) => (
            <tr key={index} onClick={() => navigate(`/weather/${city.name}`)}>
              <td>{city.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default CitiesTable;
