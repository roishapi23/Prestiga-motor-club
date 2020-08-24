import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';


import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker';
import Layout from './components/layout/layout';
import axios from 'axios';

axios.interceptors.request.use(request => {
  let token = localStorage.getItem("key");
  request.headers.Authorization = "Bearer " + token;
  return request;
  
}, error => {    
  console.log(error);
  return Promise.reject(error);
});


ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
