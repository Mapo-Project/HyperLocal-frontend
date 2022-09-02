import React from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

import { InterestingContent, InterestingMainContainer } from './style';

import fetcherAccessToken from '../../utils/fetcherAccessToken';
import { changeDate } from '../../utils/changeFormat';
import Footer from '../../layout/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Interesting({ mainData }) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const interestingDate = mainData.filter((data) => data.isHeartEmpty);

  console.log(mainData, interestingDate);

  const navigate = useNavigate();

  const onClickToDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  return (
    <InterestingMainContainer>
      <h1 className="interesting_title">관심 마켓</h1>
      {interestingDate.map((data) => (
        <InterestingContent
          key={data.itemId}
          onClick={() => {
            onClickToDetailPage(data.itemId);
          }}
        >
          {data.itemsImg.length ? (
            <img
              // 더미데이터때문에 만들어놓음
              className="interesting_main_img"
              src={
                data.itemsImg[0] === '/'
                  ? data.itemsImg
                  : URL.createObjectURL(data.itemsImg[0].files)
              }
              alt="items_img"
            />
          ) : (
            <div className="interesting_main_img dummy" />
          )}
          {/* {typeof data.itemsImg === 'string' ? (
            <img
              className="interesting_main_img"
              alt="header_img"
              src={data.itemsImg}
            />
          ) : (
            <img
              className="interesting_main_img"
              alt="header_img"
              src={URL.createObjectURL(data.itemsImg[0].files)}
            />
          )} */}
          <div className="content_wrapper">
            <h1>
              {data.itemsHeadText.length > 20
                ? `${data.itemsHeadText.slice(0, 20)}...`
                : data.itemsHeadText}
            </h1>
            <div className="content_sub_wrapper">
              <span className="interesting--content_price interesting--content">
                <img
                  className="interesting--price_img"
                  alt="price"
                  src={`${process.env.PUBLIC_URL}/assets/images/price.png`}
                />
                <span>{data.itemsPrice}</span>
              </span>
              /
              <span className="interesting--content_participant interesting--content">
                <img
                  className="interesting--pariticipant_img"
                  alt="pariticipant"
                  src={`${process.env.PUBLIC_URL}/assets/images/participant.png`}
                />
                <span>{data.itemsCurrentParticipants}</span>
              </span>
              <span className="interesting--content_dueDate interesting--content">
                <img
                  className="interesting--deadline_img"
                  src={`${process.env.PUBLIC_URL}/assets/images/date_range.png`}
                  alt="deadline"
                />
                <span>~{changeDate(data.itemsDeadline)}</span>
              </span>
            </div>
          </div>
        </InterestingContent>
      ))}

      <Footer page="interesting" />
    </InterestingMainContainer>
  );
}

export default Interesting;
