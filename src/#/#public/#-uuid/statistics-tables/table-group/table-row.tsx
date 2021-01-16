import React from 'react';

import сn from 'classnames';

import { useStyles } from '../styles';

interface ITableRowProps {
  index: number;
  member: any;
  unit: JSX.Element | string;
  style?: any;
  isCurrentUser: boolean;
}

const TableRow = ({ index, member, unit, style, isCurrentUser }: ITableRowProps) => {
  const { rowWrap, light, bold, rowCell, currentUserRow } = useStyles();

  return (
    <div
      key={member.name}
      className={сn(rowWrap, { [currentUserRow]: isCurrentUser })}
      style={{
        ...style,
      }}
    >
      <div className={rowCell}>{index + 1}.</div>
      <div
        className={сn(rowCell, {
          [light]: !isCurrentUser,
          [bold]: isCurrentUser,
        })}
      >
        {member.name}
      </div>
      <div className={rowCell}>
        {member.units} {unit}
      </div>
      <div className={rowCell}>{member.percentage}%</div>
    </div>
  );
};

export default TableRow;
