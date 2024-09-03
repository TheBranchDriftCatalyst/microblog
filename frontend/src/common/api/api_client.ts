import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your API base URL
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      // If token exists, add it to the Authorization header
      config.headers['Authorization'] = "Bearer " + token
    }

    return config;
  },
  (error) => {
    // Handle any errors that occur before the request is sent
    return Promise.reject(error);
  }
);

export default apiClient;
