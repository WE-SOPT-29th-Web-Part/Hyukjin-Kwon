import React from 'react';

import ProfileHandler from 'Components/ProfileFinder/ProfileHandler';
import bgTop from 'Assets/telescope-bg-top.png';
import bgBottom from 'Assets/telescope-bg-bottom.png';

import './index.scss';

function ProfileFinder() {
  return (
    <main className="profileFinder">
      <h1>니 깃허브 쩔더라?</h1>
      <ProfileHandler />
      <img src={bgBottom} alt="bg-telescope-bottom" />
      <img src={bgTop} alt="bg-telescope-top" />
    </main>
  );
}

export default ProfileFinder;
