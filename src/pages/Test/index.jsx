import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';

export default function Test() {
  const [data, setData] = useState();
  // const [data2, setData2] = useState();

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

  useEffect(() => {
    axios
      .get('/board/menu/select')
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    // setData2('');
    axiosInstance
      .get('/board/neighborhood/select/1')
      .then((res) => {
        console.log(res.data);
        // setData2(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  // useEffect(() => {
  //   axiosInstance
  //     .post(
  //       '/board/register',
  //       {
  //         // board: [],
  //         category: 100,
  //         title: '테스트1',
  //         description: '테스트1',
  //         link: '테스트링크',
  //         container_yn: 'N',
  //         homemade_yn: 'N',
  //         price: '40000',
  //         personnel: '5',
  //         how_share: '100',
  //         deadline: '2022-08-24',
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     )
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.log(error));
  // }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .delete('/board/delete/9c8651e2-0645-480d-8616-5376b7855158')
  //     .then((res) => {
  //       console.log(res.data);
  //       // setData2(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);
  useEffect(() => {
    axiosInstance
      .get('/board/category/select/1/100')
      .then((res) => {
        console.log(res.data);
        // setData2(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>테스트 페이지</h1>
      <p>{data}</p>
      {/* <p>
        {data2.map((pages) => (
          <div>{pages.data.title}</div>
        ))}
      </p> */}
    </div>
  );
}
