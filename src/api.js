// src/api/index.js

import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchReports = async (reportType) => {
  try {
    const response = await axios.get(`${API_URL}/sales/${reportType}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${reportType} report:`, error);
    if (error.response) {
      const errorMessage = error.response.data.error || `Failed to fetch ${reportType} report`;
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
