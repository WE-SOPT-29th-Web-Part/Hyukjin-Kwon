import React, { useState, useRef } from 'react';
import axios from 'axios';

import Profile from 'Components/ProfileFinder/Profile';

import { GITHUB_API, USER_URI } from 'Constants/api-uri';

import './index.scss';

function ProfileHandler() {
  const userInfo = useRef();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultShown, setIsResultShown] = useState(false);
  const [username, setUsername] = useState('');
  const searchUser = async () => {
    try {
      const result = await axios.get(`${GITHUB_API}${USER_URI}/${username}`);
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
      }
    } catch {
      setIsError(true);
    }
  };
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEnterPress = async (e) => {
    if (e.key === 'Enter' && username) {
      setIsLoading(true);
      await searchUser();
      setIsLoading(false);
      setIsResultShown(true);
    }
  };

  const closeResult = () => {
    setIsError(false);
    setIsResultShown(false);
    setIsLoading(false);
    setUsername('');
  };

  return (
    <div className="profileHandler">
      {isResultShown && isError && <div>Error!</div>}
      {isResultShown && !isError && <Profile toggle={closeResult} userInfo={userInfo.current} />}
      {!isResultShown && isLoading && (
        <div>Loading...</div>
      )}
      {!isResultShown && !isLoading && (
        <input
          type="text"
          value={username}
          onChange={handleUsername}
          onKeyPress={handleEnterPress}
          placeholder="훔쳐보고 싶은 프로필을 입력해보세요."
        />
      )}
    </div>
  );
}

export default ProfileHandler;
