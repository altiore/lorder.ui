import React, { memo, useCallback, useMemo, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

import classNames from 'classnames';

import { useStyles } from '../styles';
import CurrentUserBlock from './CurrentUserBlock';
import TableHead from './TableHead';

interface IStatisticTableProps {
  members: any[];
  unit?: string;
  unitTitle: string;
  userId: number;
}

const USERS_TO_DISPLAY = 8;
type userBlockPosition = 'top' | 'bottom';

export const StatisticTable = memo(({ members, unit = '', unitTitle, userId }: IStatisticTableProps) => {
  const currentUserIndex = useMemo(() => {
    return members.map(m => m.id).indexOf(userId);
  }, [userId, members]);

  const hideCurrentUserBlock: boolean =
    members.length < USERS_TO_DISPLAY || (currentUserIndex < USERS_TO_DISPLAY && members.length < USERS_TO_DISPLAY);

  const [UserBlockPosition, setPosition] = useState<userBlockPosition>('bottom');
  const [IsHidden, setIsHidden] = useState(hideCurrentUserBlock);

  const onItemsRendered = useCallback(
    ({ visibleStartIndex, visibleStopIndex }) => {
      if (hideCurrentUserBlock) {
        return;
      }
      setIsHidden(false);
      if (visibleStartIndex + 1 > currentUserIndex) {
        setPosition('top');
      }
      if (visibleStopIndex < currentUserIndex) {
        setPosition('bottom');
      }
      if (visibleStartIndex < currentUserIndex && visibleStopIndex > currentUserIndex) {
        setIsHidden(true);
      }
    },
    [currentUserIndex, hideCurrentUserBlock]
  );

  const { currentUserCell, tableContainer, tableCell, light, bold, listWrap, listRowWrap } = useStyles();

  const Row = ({ index, style }) => {
    const row = members[index];
    const isCurrentUser = currentUserIndex === index;

    return (
      <div
        key={row.name}
        className={listRowWrap}
        style={{
          ...style,
        }}
      >
        <div
          style={{ width: '10%' }}
          className={classNames(tableCell, light, {
            [currentUserCell]: isCurrentUser,
          })}
        >
          <b>{index + 1}.</b>
        </div>
        <div
          style={{ width: '70%' }}
          className={classNames({
            [tableCell]: true,
            [currentUserCell]: isCurrentUser,
            [light]: !isCurrentUser,
            [bold]: isCurrentUser,
          })}
        >
          {row.name}
        </div>
        <div
          className={classNames(tableCell, bold, {
            [currentUserCell]: isCurrentUser,
          })}
        >
          {row.units} {unit}
        </div>
        <div
          className={classNames(tableCell, bold, {
            [currentUserCell]: isCurrentUser,
          })}
        >
          {row.percentage}%
        </div>
      </div>
    );
  };

  return (
    <div className={tableContainer}>
      <TableHead unitTitle={unitTitle} />
      <List
        height={440}
        itemCount={members.length}
        itemSize={49}
        width={530}
        className={listWrap}
        onItemsRendered={onItemsRendered}
      >
        {Row}
      </List>
      <CurrentUserBlock
        index={currentUserIndex}
        user={members[currentUserIndex]}
        hide={IsHidden}
        direction={UserBlockPosition}
        unit={unit}
      />
    </div>
  );
});
