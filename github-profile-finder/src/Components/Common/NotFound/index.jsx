import React from 'react';
import './index.scss';

import gitCat from 'Assets/gitCat.png';

function NotFound() {
  return (
    <div className="notFound">
      <img src={gitCat} alt="gitcat" />
      <p>404 낫 파운드</p>
      <a href="/">돌아가기</a>
    </div>
  );
}

export default NotFound;
