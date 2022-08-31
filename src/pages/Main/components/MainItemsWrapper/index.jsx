import React from 'react';
import { changeDate, changeTagFormat } from '../../../../utils/changeFormat';
import { MainItemsContainer } from './style';

// 하트 변경되지 않으면 리렌더링 되지 않게
function areEqual(prevProps, nextProps) {
  if (
    prevProps.itemId === nextProps.itemId &&
    prevProps.itemsHeartCount === nextProps.itemsHeartCount
  ) {
    return true;
  }
  return false;
}

const MainItems = React.memo(function MainItems({
  itemId, //
  itemsTag, //
  itemsImg, //
  itemsHeadText, //
  itemsTownLocation, //
  itemsLimitParticipants, //
  itemsCurrentParticipants, // 처음에 0
  itemsPrice, //
  itemsHeartCount, // 해야함
  itemsDeadline, //
  isHeartEmpty, // 해야함
  onClickHeart, // 해야함
  onClickToDetailPage,
  itemsHomemade,
  itemUserName,
}) {
  return (
    <MainItemsContainer>
      <div className="items_header">
        <div className="items_tag_wrapper">
          {changeTagFormat(itemsTag, itemsHomemade).map((tag, idx) => (
            <div key={idx} className="items_tag">
              {tag}
            </div>
          ))}
        </div>
        <img
          className="items_detail"
          src={`${process.env.PUBLIC_URL}/assets/images/more_vert.png`}
          alt="items_detail_bar"
        />
      </div>
      <div
        className="items_content_wrapper"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={() => {
          onClickToDetailPage(itemId);
        }}
      >
        <div className="items_text_wrapper">
          <h1>
            {itemsHeadText.length > 30
              ? `${itemsHeadText.slice(0, 30)}...`
              : itemsHeadText}
          </h1>
          <div className="items_main">
            {/* <div className="items_price">₩ {itemsPrice} / </div> */}
            <div className="items_price">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/price.png`}
                alt="items_price"
              />
              <span>{itemsPrice}</span>/
            </div>
            <div className="items_participants">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/participant.png`}
                alt="items_participants"
              />
              <span>{itemsLimitParticipants}</span>
            </div>
            <div className="items_deadline">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/date_range.png`}
                alt="items_deadline"
              />
              {/* 더미데이터 때문에~ */}~{changeDate(itemsDeadline)}
            </div>
          </div>
        </div>
        <div className="items_img_wrapper">
          {itemsImg.length ? (
            <img
              // 더미데이터때문에 만들어놓음
              src={
                itemsImg[0] === '/'
                  ? itemsImg
                  : URL.createObjectURL(itemsImg[0].files)
              }
              alt="items_img"
            />
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="items_footer">
        <img
          className="items_chat"
          alt="chat"
          src={`${process.env.PUBLIC_URL}/assets/images/chat_bubble.png`}
        />
        {itemsCurrentParticipants}명 참여중
        <img
          role="button"
          onKeyDown={() => {}}
          tabIndex={itemId}
          onClick={() => {
            onClickHeart(itemId);
          }}
          className="items_heart"
          src={
            isHeartEmpty
              ? `${process.env.PUBLIC_URL}/assets/images/full_heart.png`
              : `${process.env.PUBLIC_URL}/assets/images/empty_heart.png`
          }
          alt="heart"
        />
        <p>{itemsHeartCount}</p>
        <span>
          {itemsTownLocation} ◦ {itemUserName}
        </span>
      </div>
    </MainItemsContainer>
  );
}, areEqual);

export default MainItems;
