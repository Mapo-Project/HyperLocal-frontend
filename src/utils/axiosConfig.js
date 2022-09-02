import axios from 'axios';

// axios 전역설정
// 회원등록, 회원조회, 동네조회, 로그아웃, 회원탈퇴, 동네선택, 동네삭제
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 2500, // 요청제한시간
});

axiosInstance.interceptors.request.use(
  (request) => {
    // 인터셉트 이용 accessToken을 넣는다.
    request.headers.Authorization = `Bearer ${localStorage.accessToken}`;

    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
export default axiosInstance;
