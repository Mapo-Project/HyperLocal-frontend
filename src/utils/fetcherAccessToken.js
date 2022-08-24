import instance from './axiosConfig';

// 로컬스토리지에 저장된 토큰으로 유저데이터를 받아오는 함수
const fetcherAccessToken = (url) => {
  return (
    instance
      .get(url, {
        headers: {
          Authorization: `Bearer ${window.localStorage.accessToken}`,
        },
      })
      // 성공하면 데이터 실패하면 false를 저장한다.
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        return false;
      })
  );
};

export default fetcherAccessToken;
