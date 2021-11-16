import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FaTrash } from 'react-icons/fa';

import './index.scss';

function ProfileHistory({ showProfile }) {
  const ls = window.localStorage;
  const [historyList, setHistoryList] = useState([]);

  const removeHistory = (removeTarget) => {
    const removedHistory = JSON.parse(ls.getItem('profile-history')).filter((history) => removeTarget !== history);
    setHistoryList(removedHistory);
    if (!removedHistory.length) ls.removeItem('profile-history');
    else ls.setItem('profile-history', JSON.stringify(removedHistory));
  };

  const showHistory = () => {
    if (historyList.length) {
      return (
        <ul className="profileHistory">
          {historyList.map((history) => (
            <li key={history}>
              <button type="button" onClick={() => showProfile(history)}>
                <span>{history}</span>
              </button>
              <button type="button" onClick={() => removeHistory(history)}>
                <span>
                  <FaTrash />
                </span>
              </button>
            </li>
          ))}
        </ul>
      );
    }
    return '';
  };

  useEffect(() => {
    if (ls) setHistoryList(JSON.parse(ls.getItem('profile-history')) || []);
  }, [ls]);

  return <>{showHistory()}</>;
}

ProfileHistory.propTypes = {
  showProfile: PropTypes.func.isRequired,
};

export default ProfileHistory;
