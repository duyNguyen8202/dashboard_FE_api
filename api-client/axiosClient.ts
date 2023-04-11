import axios from "axios";

const axiosClient = axios.create({
    baseURL:"http://localhost:3000",
    headers:{
        "Content-Type": "application/json"
    }
})

axiosClient.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor
  axiosClient.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  
  export default axiosClient