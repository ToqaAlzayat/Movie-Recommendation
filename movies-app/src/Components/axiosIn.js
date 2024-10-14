import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Point to your backend server
});

export default axiosInstance;
