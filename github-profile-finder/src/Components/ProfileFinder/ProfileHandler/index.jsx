import React, { useState } from 'react';

import './index.scss';

function ProfileHandler() {
  const [isResultShown, setIsResultShown] = useState(false);
  return (
    <div className="profileHandler">
      {isResultShown && (
        <div className="profileHandler__result">
          <button type="button" onClick={() => setIsResultShown(false)}>X</button>
        </div>
      )}
      {!isResultShown && (
        <input type="text" placeholder="훔쳐보고 싶은 프로필을 입력해보세요." />
      )}
    </div>
  );
}

export default ProfileHandler;
