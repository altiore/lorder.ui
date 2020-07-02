import React from 'react';

import { useStyles } from './style';
import { UserCard } from './UserCard/UserCard';

export const UsersBoard = () => {
  const classes = useStyles();
  return (
    <div className={classes.board}>
      <h2 className={classes.boardTitle}>ПОСЛЕДНИЕ ДЕЙСТВИЯ УЧАСТНИКОВ</h2>
      <div className={classes.cardsWrap}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};
