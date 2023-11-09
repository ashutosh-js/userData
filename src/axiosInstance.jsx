import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com', 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
