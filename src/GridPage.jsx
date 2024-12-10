import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GridPage.css';

const GridPage = () => {
  const [CEOs, setCEOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      //.get('http://localhost:8080/findAllCEOs')
      .get('https://female-ceos-backend.wl.r.appspot.com/findAllCEOs')
      .then(response => {
        setCEOs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid-container">
      {CEOs.map((CEO, index) => (
        <div key={index} className="grid-item">
          {/* Placeholder image or a real CEO image URL */}
          <img
            src={CEO.url} 
            alt={`Image of ${CEO.name}`}
            className="grid-item-image"
          />
          {/* CEO Information */}
          <p><strong>Name:</strong> {CEO.name}</p>
          <p><strong>Company:</strong> {CEO.company}</p>
          <p><strong>Industry:</strong> {CEO.industry}</p>
          <p><strong>Ticker:</strong> {CEO.ticker}</p>
        </div>
      ))}
    </div>
  );
};

export default GridPage;
