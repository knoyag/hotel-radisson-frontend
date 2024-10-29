import React, { useEffect, useState } from 'react';
import { fetchReports } from '../api'; 
import Report from './Report';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState('by-hotel-brand'); 
  const [chartType, setChartType] = useState('bar'); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchReports(selectedReport); // antes de renderizar check si hay data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedReport]); // add selectedReport para que se ejecute cuando cambie

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <label>
          <input
            type="radio"
            value="by-hotel-brand"
            checked={selectedReport === 'by-hotel-brand'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          Sales by Hotel Brand
        </label>
        <label>
          <input
            type="radio"
            value="rewards"
            checked={selectedReport === 'rewards'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          Rewards by Customer
        </label>
        <label>
          <input
            type="radio"
            value="by-month"
            checked={selectedReport === 'by-month'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          Monthly Sales
        </label>
        <label>
          <input
            type="radio"
            value="by-room-type"
            checked={selectedReport === 'by-room-type'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          By Room Type
        </label>
        <label>
          <input
            type="radio"
            value="by-channel"
            checked={selectedReport === 'by-channel'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          By Sales Channel
        </label>
        <label>
          <input
            type="radio"
            value="by-country"
            checked={selectedReport === 'by-country'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          By Country
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="bar"
            checked={chartType === 'bar'}
            onChange={(e) => setChartType(e.target.value)}
          />
          Bar Chart
        </label>
        <label>
          <input
            type="radio"
            value="line"
            checked={chartType === 'line'}
            onChange={(e) => setChartType(e.target.value)}
          />
          Line Chart
        </label>
      </div>
      <Report selectedReport={selectedReport} chartType={chartType} />
    </div>
  );
};

export default Dashboard;
