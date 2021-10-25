import React, { useRef } from 'react';

import ProfileHandler from 'Components/ProfileFinder/ProfileHandler';
import bgTop from 'Assets/telescope-bg-top.png';
import bgBottom from 'Assets/telescope-bg-bottom.png';

import './index.scss';

function ProfileFinder() {
  const containerRef = useRef();
  return (
    <main className="profileFinder" ref={containerRef}>
      <h1>니 깃허브 쩔더라?</h1>
      <ProfileHandler containerRef={containerRef} />
      <img src={bgBottom} alt="bg-telescope-bottom" />
      <img src={bgTop} alt="bg-telescope-top" />
    </main>
  );
}

export default ProfileFinder;
