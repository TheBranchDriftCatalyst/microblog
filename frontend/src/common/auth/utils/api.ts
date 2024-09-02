import axios from 'axios';
export const API_URL = 'http://localhost:8000'; // Replace with your actual API URL

export const apiLogin = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/token/pair`, { email: username, password });
  return response.data; // Assuming the response contains the token
};

export const registerUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/users/`, { username, password });
  return response.data;
};

// // Create an instance of Axios
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include the Authorization token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken'); // Adjust the key to match where you store the token
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
