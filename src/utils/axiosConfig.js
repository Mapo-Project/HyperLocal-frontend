import axios from 'axios';
import mem from 'mem';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
// axios 전역설정
// 회원등록, 회원조회, 동네조회, 로그아웃, 회원탈퇴, 동네선택, 동네삭제
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2500, // 요청제한시간
});

// axios 요청보내기 전 처리
axiosInstance.interceptors.request.use(
  (request) => {
    if (!request.headers) return request;

    // 인터셉터 이용 accessToken을 넣는다.
    request.headers.Authorization = `Bearer ${localStorage.accessToken}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// mem library를 통해 memoization기법을 이용하여 1초동안 한번만 서버에 요청한다.
const getRefreshToken = mem(
  async () => {
    try {
      const {
        data: { accessToken },
      } = await axios.post(`${BASE_URL}/auth/token/reissuance`, {
        refreshToken: localStorage.getItem('refreshToken'),
      });

      // console.log(accessToken);

      localStorage.setItem('accessToken', accessToken);

      return accessToken;
    } catch (e) {
      // localStorage.removeItem('accessToken');
    }
  },
  { maxAge: 1000 }, // memoization 1초동안
);

// axios 응답 받기 전 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 401이면 토큰 재발급을 한다.
    const {
      config,
      response: { status },
    } = error;

    if (
      config.url === `${BASE_URL}/auth/token/reissuance` ||
      status !== 401 ||
      config.sent ||
      !localStorage.accessToken // 로그인 안되었을때는 요청할 필요가 없다.
    ) {
      return Promise.reject(error); // 에러출력
    }

    config.sent = true; // 재요청 시 에러뜨면 무한루프 걸리므로

    const accessToken = await getRefreshToken();

    // console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return axios(config); // 재요청
  },
);

export default axiosInstance;
