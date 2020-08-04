import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

import { LinkButton } from '#/@common/link-button';

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
    quotesWrap,
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
          <div className={quotesWrap}>
            <SvgIcon htmlColor="#fafafa" fontSize="large">
              <title>quotes</title>
              <path d="M8.31,1.85H2.77a2.69,2.69,0,0,0-2,.8,2.69,2.69,0,0,0-.81,2v5.53a2.69,2.69,0,0,0,.81,2,2.69,2.69,0,0,0,2,.8H6a1.34,1.34,0,0,1,1,.41,1.32,1.32,0,0,1,.4,1v.46A3.56,3.56,0,0,1,6.3,17.38a3.56,3.56,0,0,1-2.61,1.08H2.77a.86.86,0,0,0-.65.28.87.87,0,0,0-.27.64v1.85a.92.92,0,0,0,.92.92h.92a7.13,7.13,0,0,0,2.86-.58A7.46,7.46,0,0,0,8.91,20a7.3,7.3,0,0,0,1.58-2.36,7.18,7.18,0,0,0,.59-2.86V4.62A2.75,2.75,0,0,0,8.31,1.85Z" />
              <path d="M23.19,2.65a2.69,2.69,0,0,0-2-.8H15.69a2.75,2.75,0,0,0-2.77,2.77v5.53a2.75,2.75,0,0,0,2.77,2.77h3.23a1.4,1.4,0,0,1,1.39,1.39v.46a3.56,3.56,0,0,1-1.08,2.61,3.59,3.59,0,0,1-2.62,1.08h-.92a.88.88,0,0,0-.65.28.87.87,0,0,0-.27.64v1.85a.89.89,0,0,0,.27.65.91.91,0,0,0,.65.27h.92a7.22,7.22,0,0,0,2.87-.58A7.58,7.58,0,0,0,21.84,20a7.46,7.46,0,0,0,1.58-2.36A7.35,7.35,0,0,0,24,14.77V4.62A2.69,2.69,0,0,0,23.19,2.65Z" />
            </SvgIcon>
          </div>
          <p className={flipCardBackDescription}>{children}</p>
          <h2 className={name}>{userName}</h2>
          <p className={role}>{userRole}</p>
          <p>
            <LinkButton className={linkWrapper} to={userProfileLink}>
              {profileLinkTitle}
            </LinkButton>
          </p>
        </div>
      </div>
    </div>
  );
};
