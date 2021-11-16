import { useEffect, useState } from 'react';

import { FaTrash } from 'react-icons/fa';

import './index.scss';

interface IProfileHistoryProps {
  showProfile: (queryUsername: string) => Promise<void>;
}

function ProfileHistory({ showProfile }: IProfileHistoryProps) {
  const ls = window.localStorage;
  const [historyList, setHistoryList] = useState<string[]>([]);

  const getProfileHistory = () => ls.getItem('profile-history');
  const isStringArray = (arr: any[]): arr is string[] => arr.every((elem) => typeof elem === 'string');
  const safeJSONparseWithStringArr = (json: string): string[] => {
    try {
      const parseResult = JSON.parse(json);
      if (!(parseResult instanceof Array)) return [];
      if (!isStringArray(parseResult)) return [];
      return parseResult;
    } catch (error) {
      throw Error('failed to parse JSON');
    }
  };

  const removeHistory = (removeTarget: string) => {
    const currentHistory = getProfileHistory();
    if (!currentHistory) return;
    const removedHistory = safeJSONparseWithStringArr(currentHistory).filter((history) => removeTarget !== history);
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
    const currentHistory = getProfileHistory();
    if (!currentHistory) return;

    if (ls) setHistoryList(safeJSONparseWithStringArr(currentHistory) || []);
  }, [ls]);

  return <>{showHistory()}</>;
}

export default ProfileHistory;
