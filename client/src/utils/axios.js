import axios from "axios";
import LocalStorageService from "./localStorageService";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
   config => {
    //    console.log('In the request Interceptors = '+config.url)
       const token = localStorageService.getAccessToken();
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       } else if (config.url !== '/api/a/createToken' && config.url !== '/api/au/create'){
        axios.post('/api/a/createToken')
        .then(res => {
            if (res.status === 201) {
                localStorageService.setToken(res.data);
                config.headers['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
            }
        })
       }
       // config.headers['Content-Type'] = 'application/json';
       return config;
   },
   error => {
       console.log(error)
       Promise.reject(error)
   });



//Add a response interceptor

axios.interceptors.response.use((response) => {
    // console.log('In the response Interceptors')
   return response
}, function (error) {
    // console.log('In the response error Interceptors')
   const originalRequest = error.config;

//    if (error.response.status === 401 && originalRequest.url === 
// 'http://13.232.130.60:8081/v1/auth/token) {
//        router.push('/login');
//        return Promise.reject(error);
//    }

   if (error.response.status === 401 && !originalRequest._retry) {

       originalRequest._retry = true;
       const refreshToken = localStorageService.getRefreshToken();
       return axios.post('/api/a/refresh',
           {
               "refresh_token": refreshToken
           })
           .then(res => {
               if (res.status === 201) {
                   localStorageService.setToken(res.data);
                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                   return axios(originalRequest);
               }
           })
   }
   return Promise.reject(error);
});