// axiosService. Used in order to have a form of an interceptor like the one we have in Angular.

import axios from 'axios';
// import connectionString from "./baseUrl";

let token = localStorage.getItem("key");

const instance = axios.create({
    // baseURL: connectionString
});


axios.interceptors.request.use(request => {
    // console.log(response);
    let token = localStorage.getItem("key");
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return request;
}, error => {    
    console.log(error);
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    // console.log(response);
    let token = localStorage.getItem("key");
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    return response;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

export function setAxiousHeaders () {
    let token = localStorage.getItem("key");
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export default instance;
