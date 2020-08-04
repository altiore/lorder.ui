import React from 'react';

import classNames from 'classnames';

import { useStyles } from '../styles';
import TableRow from './table-row';

interface CurrentUserBlockProps {
  index: number;
  user: any;
  hide: boolean;
  direction: 'top' | 'bottom';
  unit: any;
}

const CurrentUserBlock: React.FC<CurrentUserBlockProps> = ({ index, user, hide = true, direction, unit }) => {
  const { currentUserWrap, currentUserWrapTop } = useStyles();
  if (!user || hide) {
    return null;
  }
  return (
    <div
      key={user.name}
      className={classNames(currentUserWrap, {
        [currentUserWrapTop]: direction === 'top',
      })}
    >
      <TableRow member={user} isCurrentUser={true} style={{}} index={index} unit={unit} />
    </div>
  );
};

export default CurrentUserBlock;
