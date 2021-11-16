import { IUserInfo } from '../ProfileHandler';
import './index.scss';
interface IProfileProps {
  toggle: () => void;
  userInfo: IUserInfo;
}

function Profile(props: IProfileProps) {
  const { toggle, userInfo } = props;
  const { thumbnail, nickname, userId, following, followers, githubUrl, introduce } = userInfo;

  return (
    <article className="profile">
      <div className="profile__thumbnail">
        <img src={thumbnail} alt="user-thumbnail" />
      </div>
      <div className="profile__username">
        <h2>{nickname}</h2>
        <h3>{userId}</h3>
      </div>

      <div className="profile__intro">{introduce}</div>

      <hr />

      <ul className="profile__followInfo">
        <li>{`팔로우가 무려 ${followers}명`}</li>
        <li>{`팔로워가 벌써 ${following}명`}</li>
      </ul>

      <div className="profile__footer">
        <a href={githubUrl} className="profile__visit">
          구경하기
        </a>
        <button type="button" onClick={toggle} className="profile__dislike">
          별로에요
        </button>
      </div>
      <button type="button" onClick={toggle} className="profile__closeBtn">
        X
      </button>
    </article>
  );
}

export default Profile;
