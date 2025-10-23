import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// No auth token required; public access
client.interceptors.request.use((config) => config);

// Handle errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Do not force redirects; surface the error to callers
    return Promise.reject(error);
  }
);

export default client;
