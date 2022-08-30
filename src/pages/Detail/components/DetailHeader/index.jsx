import React from 'react';
import { DetailHeaderWrapper } from './style';

const DetailHeader = React.memo(function DetailHeader({
  itemsImg,
  onClicktoMain,
}) {
  return (
    <DetailHeaderWrapper>
      {typeof itemsImg === 'string' ? (
        <img className="detail_main_no_img" alt="header_img" src={itemsImg} />
      ) : itemsImg.length ? (
        <img
          className="detail_main_img"
          alt="header_img"
          src={URL.createObjectURL(itemsImg[0].files)}
        />
      ) : (
        <div className="detail_main_img" />
      )}

      <img
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        className="back_btn"
        alt="back_btn"
        onClick={onClicktoMain}
        src={`${process.env.PUBLIC_URL}/assets/images/detail_arrow_back.png`}
      />
      <img
        className="share_btn"
        alt="share_btn"
        src={`${process.env.PUBLIC_URL}/assets/images/detail_share.png`}
      />
      <img
        className="more_info_btn"
        alt="more_info_btn"
        src={`${process.env.PUBLIC_URL}/assets/images/detail_more_vert.png`}
      />
      <span>
        {/* 더미데이터면 1, 사진을 등록 안했으면 1 */}1 /{' '}
        {typeof itemsImg === 'string'
          ? 1
          : itemsImg.length
          ? itemsImg.length
          : 1}
      </span>
      {/* 전체 너비에서 원지름 8을 나누고 8px마다 있으므로 2로 나눈다. 첫번째는 마진이므로 반내림한다. */}
      {/* <section className="circle_border">
          {Array(Math.ceil(360 / 8 / 2))
            .fill('')
            .map((elm, idx) => (
              <div key={idx} />
            ))}
        </section> */}
    </DetailHeaderWrapper>
  );
});

export default DetailHeader;
