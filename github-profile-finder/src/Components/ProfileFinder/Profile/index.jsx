import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

function Profile(props) {
  const { toggle, userInfo } = props;
  const {
    thumbnail, nickname, userId, following, followers,
  } = userInfo;

  return (
    <article className="profile">
      <div className="profile__thumbnail">
        <img src={thumbnail} alt="user-thumbnail" />
      </div>
      <div className="profile__username">
        <h2>{nickname}</h2>
        <h3>{userId}</h3>
      </div>

      <ul className="profile__followInfo">
        <li>{`팔로잉: ${following}`}</li>
        <li>{`팔로워: ${followers}`}</li>
      </ul>

      <button type="button" onClick={toggle} className="profile__closeBtn">X</button>
    </article>
  );
}

Profile.propTypes = {
  toggle: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    thumbnail: PropTypes.string,
    nickname: PropTypes.string,
    userId: PropTypes.string,
    following: PropTypes.number,
    followers: PropTypes.number,
  }).isRequired,
};

export default Profile;
