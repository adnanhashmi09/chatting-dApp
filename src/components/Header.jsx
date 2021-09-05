import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../features/user';
import { user } from '../auth/userAuth';

function Header() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value.username);

  const signOut = (e) => {
    user.leave();
    dispatch(updateUsername({ username: '' }));
    console.log(user);
  };

  return (
    <div className="header">
      <div className="Logo">🎭📧</div>
      {username && (
        <div className="user-bio">
          <span>
            Hello, <strong>{username}</strong>
          </span>
          <img
            src={`https://avatars.dicebear.com/api/micah/${username}.svg`}
            alt="avatar"
          />
        </div>
      )}
      {username && (
        <div className="btn signout" onClick={signOut}>
          Signout
        </div>
      )}
    </div>
  );
}

export default Header;
