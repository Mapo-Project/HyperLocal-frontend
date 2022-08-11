import axios from 'axios';

// axios 전역설정
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem(
  'accessToken',
)}`;

instance.interceptors.request.use(
  (request) => {
    if (window.localStorage.verify === 'Y') {
      return request;
    }
    return null;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
export default instance;
