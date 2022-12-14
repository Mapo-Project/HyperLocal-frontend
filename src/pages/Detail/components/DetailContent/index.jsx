import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { getDate } from 'date-fns';
import { changeTagFormat } from '../../../../utils/changeFormat';
import { DetailContentWrapper } from './style';

const DetailContent = React.memo(function DetailContent({
  itemsTag,

  itemsHeadText,
  itemsText,
  itemsLink,
  itemsConfidence,
  itemsPrice,
  itemRegistDate,
  itemsDeadline,
  itemUserImg,
  itemUserName,
  itemsTownLocation,
  changeDate,
  itemsLimitParticipants,
  itemsCurrentParticipants,
  itemsHomemade,
}) {
  return (
    <Scrollbars autoHide style={{ height: '530px' }}>
      <DetailContentWrapper>
        <div className="item_tag_wrapper">
          {changeTagFormat(itemsTag, itemsHomemade).map((tag, idx) => (
            <div key={idx} className="item_tag">
              {tag}
            </div>
          ))}
        </div>

        <h1 className="item_title">{itemsHeadText}</h1>
        <div className="item_text_wrapper wrapper">
          <img
            alt="text"
            src={`${process.env.PUBLIC_URL}/assets/images/detail/short_text.png`}
          />
          <p>{itemsText}</p>
        </div>
        {itemsLink && (
          <div className="item_link_wrapper wrapper">
            <img
              alt="link"
              src={`${process.env.PUBLIC_URL}/assets/images/detail/shopping_basket.png`}
            />
            <a href={itemsLink} target="_blank" rel="noreferrer">
              {itemsLink.length > 28
                ? `${itemsLink.slice(0, 28)}...`
                : itemsLink}
            </a>
          </div>
        )}
        {itemsConfidence && (
          <div className="item_confidence_wrapper wrapper">
            <img
              alt="chore"
              src={`${process.env.PUBLIC_URL}/assets/images/detail/shopping_basket.png`}
            />
            <p>๋น์ ์ ๐งบ์ฉ๊ธฐ๊ฐ ํ์ํด์</p>
          </div>
        )}
        <div className="item_price_wrapper wrapper">
          <img
            alt="price"
            src={`${process.env.PUBLIC_URL}/assets/images/price.png`}
          />
          <p>{itemsPrice}</p>
        </div>
        <div className="item_participant_wrapper wrapper">
          <img
            alt="participant"
            src={`${process.env.PUBLIC_URL}/assets/images/participant.png`}
          />
          <p>
            {`${itemsLimitParticipants} / 
        ${itemsCurrentParticipants}๋ช ์ฐธ์ฌ์ค`}
          </p>
        </div>
        <div className="item_duedate_wrapper wrapper">
          <img
            alt="duedate"
            src={`${process.env.PUBLIC_URL}/assets/images/date_range.png`}
          />
          <p>{changeDate(itemsDeadline)}</p>
        </div>
        <div className="item_user_wrapper">
          {itemUserImg ? (
            <img className="userImg" alt="userData" src={itemUserImg} />
          ) : (
            <div className="user_dummy_img" />
          )}

          <div className="user_name_wrapper">
            <div>
              {itemsTownLocation} โฆ {itemUserName || '๋๋ค์ด์001'}
            </div>
            <div>์๋นต์ง์</div>
          </div>
          <div className="user_create_date">
            {itemRegistDate
              ? `${
                  getDate(new Date() - itemRegistDate) - 1 === 0
                    ? '์ค๋ ์์ฑ'
                    : `${getDate(new Date() - itemRegistDate) - 1}์ผ์  ์์ฑ`
                }`
              : '1์ผ์  ์์ฑ'}
          </div>
        </div>
      </DetailContentWrapper>
    </Scrollbars>
  );
});

export default DetailContent;
