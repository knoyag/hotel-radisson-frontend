import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';

function Report({ selectedReport, chartType }) {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/sales/${selectedReport}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        let labels, datasets;

        if (selectedReport === 'by-hotel-brand') {
          labels = data.map(item => item.hotel_brand);
          datasets = [
            {
              label: 'Total Sales',
              data: data.map(item => item.total_sales),
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ];
        } else if (selectedReport === 'rewards') {
          labels = data.map(item => `Customer ${item.customer_id}`);
          datasets = [
            {
              label: 'Total Rewards Points',
              data: data.map(item => item.total_rewards),
              backgroundColor: 'rgba(153,102,255,0.2)',
              borderColor: 'rgba(153,102,255,1)',
              borderWidth: 1,
            },
          ];
        } else {
          
          labels = data.map(item => item.month || item.room_type || item.sales_channel || item.country);
          datasets = [
            {
              label: 'Total Sales',
              data: data.map(item => item.total_sales || item.total_revenue),
              backgroundColor: chartType === 'bar' ? 'rgba(75,192,192,0.2)' : 'rgba(153,102,255,0.2)',
              borderColor: chartType === 'bar' ? 'rgba(75,192,192,1)' : 'rgba(153,102,255,1)',
              borderWidth: 1,
              fill: chartType === 'line', // fill in line chart
            },
          ];
        }

        setChartData({ labels, datasets });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedReport, chartType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      {chartType === 'bar' ? <Bar data={chartData} /> : <Line data={chartData} />}
    </div>
  );
}

export default Report;
