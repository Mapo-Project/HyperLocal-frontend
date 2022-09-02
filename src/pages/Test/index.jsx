import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Test() {
  const [data, setData] = useState();

  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.accessToken}`;
  axios.defaults.timeout = 2500; // 응답 대기 시간

  useEffect(() => {
    setData('');
    axios
      .get('/user/profile/select')
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>테스트 페이지</h1>
      <p>{data}</p>
    </div>
  );
}
