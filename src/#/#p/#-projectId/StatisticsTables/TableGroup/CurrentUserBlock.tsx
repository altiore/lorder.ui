import React from 'react';

import classNames from 'classnames';

import { useStyles } from '../styles';

interface CurrentUserBlockProps {
  index: number;
  user: any;
  hide: boolean;
  direction: 'top' | 'bottom';
  unit: any;
}

const CurrentUserBlock: React.FC<CurrentUserBlockProps> = ({ index, user, hide = true, direction, unit }) => {
  const { currentUserCell, tableCell, light, bold, listRowWrap, currentUserWrap, currentUserWrapTop } = useStyles();
  if (!user || hide) {
    return null;
  }
  return (
    <div
      key={user.name}
      className={classNames(listRowWrap, currentUserWrap, {
        [currentUserWrapTop]: direction === 'top',
      })}
    >
      <div style={{ width: '10%' }} className={classNames(tableCell, light, currentUserCell)}>
        <b>{index + 1}.</b>
      </div>
      <div style={{ width: '70%' }} className={classNames(tableCell, currentUserCell, bold)}>
        {user.name}
      </div>
      <div className={classNames(tableCell, bold, currentUserCell)}>
        {user.units} {unit}
      </div>
      <div className={classNames(tableCell, bold, currentUserCell)}>{user.percentage}%</div>
    </div>
  );
};

export default CurrentUserBlock;
