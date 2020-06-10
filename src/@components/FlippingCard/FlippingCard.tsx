import React from 'react';
import { NavLink } from 'react-router-dom';

import { useStyles } from './styles';

interface IFlippingCardProps {
  userName: string;
  userRole: string;
  children: string;
  userProfileLink: string;
  avatarUrl: string;
  profileLinkTitle: string;
}

export const FlippingCard = ({
  userName,
  userRole,
  children,
  userProfileLink,
  avatarUrl,
  profileLinkTitle,
}: IFlippingCardProps) => {
  const {
    flipCard,
    flipCardInner,
    flipCardFront,
    flipCardBack,
    flipCardBackDescription,
    imageWrap,
    linkWrapper,
    userAvatar,
    name,
    role,
  } = useStyles();
  return (
    <div className={flipCard}>
      <div className={flipCardInner}>
        <div className={flipCardFront}>
          <div className={imageWrap}>
            <img src={avatarUrl} alt="Avatar" className={userAvatar} />
          </div>
          <h2 className={name}>{userName}</h2>
          <p className={role}>{userRole}</p>
        </div>
        <div className={flipCardBack}>
          <p />
          <p className={flipCardBackDescription}>{children}</p>
          <h2 className={name}>{userName}</h2>
          <p className={role}>{userRole}</p>
          <p>
            <NavLink className={linkWrapper} to={userProfileLink}>
              {profileLinkTitle}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
