import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';

import Profile from 'Components/ProfileFinder/Profile';
import ProfileHistory from 'Components/ProfileFinder/ProfileHistory';
import NotFound from 'Components/Common/NotFound';
import Loader from 'Components/Common/Loader';

import { GITHUB_API, USER_URI } from 'Constants/api-uri';

import './index.scss';
interface IProfileHandlerProps {
  containerRef: React.RefObject<HTMLElement>;
}

export interface IUserInfo {
  thumbnail: string;
  githubUrl: string;
  userId: string;
  nickname: string;
  introduce: string;
  followers: string;
  following: string;
}

function ProfileHandler({ containerRef }: IProfileHandlerProps) {
  const userInfo = useRef<IUserInfo>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResultShown, setIsResultShown] = useState<boolean>(false);
  const [isHistoryShown, setIsHistoryShown] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const isRedundant = (list: Set<string>, target: string) => new Set(list).has(target);

  const addHistory = (queryUsername: string) => {
    const ls = window.localStorage;
    try {
      const historyList = ls.getItem('profile-history');
      if (historyList) {
        const parsedHistoryList = JSON.parse(historyList);
        if (!isRedundant(parsedHistoryList, queryUsername)) {
          const addedHistory = [...parsedHistoryList, queryUsername].slice(-3).reverse();
          ls.setItem('profile-history', JSON.stringify(addedHistory));
        }
      } else {
        ls.setItem('profile-history', JSON.stringify([queryUsername]));
      }
    } catch (err) {
      setIsError(true);
    }
  };

  const searchUser = async (queryUsername: string) => {
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

  const showProfile = async (queryUsername: string) => {
    setIsLoading(true);
    await searchUser(queryUsername);
    setIsLoading(false);
    setIsResultShown(true);
    addHistory(queryUsername);
  };

  const handleUsername = (e: ChangeEvent) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    setUsername(target?.value);
  };
  const handleEnterPress = (e: KeyboardEvent) => {
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
    function handleClickOutside(e: Event) {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const closestInput = target && target.closest('input');
      const closestHistory = target && target.closest('ul');
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
      {isResultShown && !isError && userInfo.current && <Profile toggle={closeResult} userInfo={userInfo.current} />}
      {!isResultShown && isLoading && <Loader />}
      {!isResultShown && !isLoading && (
        <div className="profileHandler__inputWrapper" onFocus={() => setIsHistoryShown(true)}>
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

export default ProfileHandler;
