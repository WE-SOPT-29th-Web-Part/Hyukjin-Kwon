import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Profile from 'Components/ProfileFinder/Profile';
import ProfileHistory from 'Components/ProfileFinder/ProfileHistory';
import NotFound from 'Components/Common/NotFound';
import Loader from 'Components/Common/Loader';

import { GITHUB_API, USER_URI } from 'Constants/api-uri';

import './index.scss';

function ProfileHandler({ containerRef }) {
  const userInfo = useRef();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultShown, setIsResultShown] = useState(false);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  const [username, setUsername] = useState('');

  const addHistory = (queryUsername) => {
    const ls = window.localStorage;
    try {
      const historyList = ls.getItem('profile-history');
      if (historyList) {
        const addedHistory = [...JSON.parse(historyList), queryUsername];
        ls.setItem('profile-history', JSON.stringify(addedHistory));
      } else {
        ls.setItem('profile-history', JSON.stringify([queryUsername]));
      }
    } catch (err) {
      setIsError(err);
    }
  };

  const searchUser = async (queryUsername) => {
    try {
      const result = await axios.get(`${GITHUB_API}${USER_URI}/${queryUsername}`);
      if (result.status === 200) {
        const {
          avatar_url: thumbnail,
          html_url: githubUrl,
          login: userId,
          name: nickname,
          bio: introduce,
          followers,
          following,
        } = result.data;

        userInfo.current = {
          thumbnail,
          githubUrl,
          userId,
          nickname,
          introduce,
          followers,
          following,
        };
      } else setIsError(true);
    } catch {
      setIsError(true);
    }
  };

  const showProfile = async (queryUsername) => {
    setIsLoading(true);
    await searchUser(queryUsername);
    setIsLoading(false);
    setIsResultShown(true);
    addHistory(queryUsername);
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEnterPress = async (e) => {
    if (e.key === 'Enter' && username) showProfile(username);
  };

  const closeResult = () => {
    setIsError(false);
    setIsResultShown(false);
    setIsHistoryShown(false);
    setIsLoading(false);
    setUsername('');
  };

  useEffect(() => {
    function handleClickOutside(e) {
      const closestInput = e.target && e.target.closest('input');
      const closestHistory = e.target && e.target.closest('ul');
      if (closestInput && closestInput.className === 'profileHandler__input') return false;
      if (closestHistory && closestHistory.className === 'profileHistory') return false;

      setIsHistoryShown(false);
      return true;
    }

    const container = containerRef.current;

    if (container) container.addEventListener('click', handleClickOutside);
    return () => {
      if (container) container.removeEventListener('click', handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className="profileHandler">
      {isError && <NotFound />}
      {isResultShown && !isError && <Profile toggle={closeResult} userInfo={userInfo.current} />}
      {!isResultShown && isLoading && <Loader />}
      {!isResultShown && !isLoading && (
        <div
          className="profileHandler__inputWrapper"
          onFocus={() => setIsHistoryShown(true)}
        >
          <input
            className="profileHandler__input"
            type="text"
            value={username}
            onChange={handleUsername}
            onKeyPress={handleEnterPress}
            placeholder="훔쳐보고 싶은 프로필을 입력해보세요."
          />
          {isHistoryShown && <ProfileHistory showProfile={showProfile} />}
        </div>
      )}
    </div>
  );
}

ProfileHandler.propTypes = {
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default ProfileHandler;
