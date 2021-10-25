import React from 'react';

import ProfileHandler from 'Components/ProfileFinder/ProfileHandler';
import yourGithub from 'Assets/yourGithub.png';

import './index.scss';

function ProfileFinder() {
  return (
    <main className="profileFinder">
      <h1>니 깃허브 쩔더라?</h1>
      <ProfileHandler />
      <img src={yourGithub} alt="telescope-man" />
    </main>
  );
}

export default ProfileFinder;
