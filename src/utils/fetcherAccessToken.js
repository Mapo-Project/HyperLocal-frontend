import axiosInstance, { axiosSimpleInstance } from './axiosConfig';

// 데이터를 받아오는 함수
const fetcherAccessToken = (url) => {
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const fetcherNonAccessToken = (url) => {
  return axiosSimpleInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return false;
    });
};
export default fetcherAccessToken;
