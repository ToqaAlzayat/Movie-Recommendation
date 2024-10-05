import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://www.omdbapi.com/',
    params:{
      apikey:'89bdb7e7'
    }
  });
  export default axiosInstance;


  //81d57a50 new
  //89bdb7e7 old