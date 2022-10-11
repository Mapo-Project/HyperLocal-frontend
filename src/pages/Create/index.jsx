import React, { useCallback, useState, useEffect } from 'react';

import Scrollbars from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import {
  CreateButton,
  CreateButtonDisable,
  CreatePageMainContainer,
} from './style';

import useInput from '../../hooks/useInput';

import fetcherAccessToken from '../../utils/fetcherAccessToken';
import {
  Barter,
  Confidence,
  HeadAndText,
  HeaderText,
  LinkText,
  Price,
  SelectCategory,
  SelectDate,
  SelectPaticipant,
  SelectPhoto,
} from './components';
import axiosInstance from '../../utils/axiosConfig';

// const radioBoxList = [
//   { label: '같이 정해요', value: 'together', checked: false },
//   { label: '나눔', value: 'share', checked: false },
//   { label: '물물교환', value: 'exchange', checked: false },
// ];

function Create() {
  // 유저데이터

  const { data: userData } = useSWR(
    `/user/profile/select`,
    fetcherAccessToken,
    { dedupingInterval: 500 },
  );

  // 사진
  const [img, setImg] = useState([]);

  // 제목
  const [title, , onChangeTitle] = useInput('');
  // 내용
  const [text, , onChangeText] = useInput('');
  // 링크
  const [link, , onChangeLink] = useInput('');
  // 용기 여부
  const [isConfidence, setIsConfidence] = useState(false);
  // 홈메이드 여부
  const [isHomemade, setIsHomemade] = useState(false);

  // 카테고리
  const [isShowCategory, setShowCategory] = useState(false);
  const [category, setCategory] = useState({ codeName: '카테고리' });
  const [categroies, setCategories] = useState();

  // 참여 인원
  const [participant, setParticipant] = useState(2);

  // 가격
  const [price, setPrice] = useState('');
  // 가격 유형
  const [priceType, setPriceType] = useState('');
  // radioBox
  const [radioValue, setradioValue] = useState();

  // console.log(radioValue);
  // 캘린더
  const [dueDate, setDueDate] = useState(null);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/board/menu/select')
      .then((res) => {
        console.log(res.data);
        setradioValue(
          res.data.data.howShare.map((elm) => ({ ...elm, checked: false })),
        );
        setCategories(res.data.data.category);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();
  // 데이터 제출
  const onSubmitCreateData = useCallback(
    (e) => {
      e.preventDefault();
      if (
        title &&
        text &&
        category !== '카테고리' &&
        participant &&
        price &&
        dueDate
      ) {
        // setMaindata((prov) => [
        //   {
        //     itemsTag: [category],
        //     itemsCurrentParticipants: 0,
        //     itemsPrice: price,
        //     itemsPriceType: priceType,
        //     itemsHeartCount: 0,
        //     isHeartEmpty: false,
        //   },

        //   ...prov,
        // ]);
        axiosInstance
          .post(
            '/board/register',
            {
              // board: img.map((elm) => elm.files),
              board: [],
              category: category.code,
              title,
              description: text,
              link,
              container_yn: isConfidence ? 'Y' : 'N',
              homemade_yn: isHomemade ? 'Y' : 'N',
              price: typeof price === 'string' ? 0 : price,
              personnel: participant,
              how_share: radioValue.filter((elm) => elm.checked)[0]?.code,
              deadline: dueDate,
              // deadline: '1',
            },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => console.log(res.data))
          .catch((error) => console.log(error));

        console.log({
          img,
          title,
          text,
          link,
          isConfidence,
          isHomemade,
          participant,
          price,
          priceType,
          dueDate,
          category,
        });
        navigate('/', { replace: true });
      }
    },
    [
      navigate,

      img,
      title,
      text,
      link,
      isConfidence,
      isHomemade,
      participant,
      price,
      priceType,
      dueDate,
      category,
      radioValue,
    ],
  );

  const onClickToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    console.log('create 컴포넌트 리렌더링되는중');
  });

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined || !radioValue || !categroies) {
    return <div>로딩중</div>;
  }

  // // 유저데이터가 없으면 첫 페이지로 이동
  // if (!userData) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <CreatePageMainContainer>
      <Scrollbars autoHide style={{ height: '800px' }}>
        <form onSubmit={onSubmitCreateData}>
          <HeaderText onClickToMain={onClickToMain} />
          <SelectPhoto img={img} setImg={setImg} />
          <SelectCategory
            setShowCategory={setShowCategory}
            setIsHomemade={setIsHomemade}
            isShowCategory={isShowCategory}
            category={category}
            setCategory={setCategory}
            categroies={categroies}
          />
          <HeadAndText
            title={title}
            onChangeTitle={onChangeTitle}
            text={text}
            onChangeText={onChangeText}
          />
          <LinkText link={link} onChangeLink={onChangeLink} />
          <Confidence
            category={category}
            isConfidence={isConfidence}
            setIsConfidence={setIsConfidence}
            isHomemade={isHomemade}
            setIsHomemade={setIsHomemade}
            setPrice={setPrice}
            price={price}
          />
          <Price
            isHomemade={isHomemade}
            setPrice={setPrice}
            priceType={priceType}
            price={price}
          />
          <Barter
            radioValue={radioValue}
            isHomemade={isHomemade}
            setradioValue={setradioValue}
            setPriceType={setPriceType}
            setPrice={setPrice}
          />
          <SelectPaticipant
            participant={participant}
            setParticipant={setParticipant}
          />
          <SelectDate
            dueDate={dueDate}
            setDueDate={setDueDate}
            isCalenderOpen={isCalenderOpen}
            setIsCalenderOpen={setIsCalenderOpen}
          />

          {title &&
          text &&
          category !== '카테고리' &&
          participant &&
          price &&
          dueDate ? (
            <CreateButton>확인</CreateButton>
          ) : (
            <CreateButtonDisable>확인</CreateButtonDisable>
          )}
        </form>
      </Scrollbars>
    </CreatePageMainContainer>
  );
}

export default Create;
