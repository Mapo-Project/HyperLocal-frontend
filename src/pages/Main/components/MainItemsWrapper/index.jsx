import React from 'react';
import { changeTagFormat } from '../../../../utils/changeFormat';
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
  noticeId, //
  townData,
  category,
  title,
  deadline,
  noticeImg,
  personnel,
  price,
  onClickToDetailPage,
}) {
  return (
    <MainItemsContainer>
      <div className="items_header">
        <div className="items_tag_wrapper">
          <div className="items_tag">{changeTagFormat(category)}</div>
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
          onClickToDetailPage(noticeId);
        }}
      >
        <div className="items_text_wrapper">
          <h1>{title.length > 30 ? `${title.slice(0, 30)}...` : title}</h1>
          <div className="items_main">
            {/* <div className="items_price">₩ {itemsPrice} / </div> */}
            <div className="items_price">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/price.png`}
                alt="items_price"
              />
              <span>{price}</span>/
            </div>
            <div className="items_participants">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/participant.png`}
                alt="items_participants"
              />
              <span>{personnel}</span>
            </div>
            <div className="items_deadline">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/date_range.png`}
                alt="items_deadline"
              />
              ~{deadline.slice(5, 10).replace('-', '.')}
            </div>
          </div>
        </div>
        <div className="items_img_wrapper">
          {false ? <img src={noticeImg} alt="items_img" /> : <div />}
        </div>
      </div>
      <div className="items_footer">
        <img
          className="items_chat"
          alt="chat"
          src={`${process.env.PUBLIC_URL}/assets/images/chat_bubble.png`}
        />
        {/* {itemsCurrentParticipants}명 참여중 */}
        1명 참여중
        <img
          role="button"
          onKeyDown={() => {}}
          tabIndex={noticeId}
          className="items_heart"
          src={
            // isHeartEmpty
            false
              ? `${process.env.PUBLIC_URL}/assets/images/full_heart.png`
              : `${process.env.PUBLIC_URL}/assets/images/empty_heart.png`
          }
          alt="heart"
        />
        <p>4</p>
        {/* <p>{itemsHeartCount}</p> */}
        <span>
          {
            townData?.data.filter((towns) => towns.choiceYN === 'Y')[0]
              .neighborhoodName
          }{' '}
          ◦ 유저이름
        </span>
      </div>
    </MainItemsContainer>
  );
}, areEqual);

export default MainItems;
