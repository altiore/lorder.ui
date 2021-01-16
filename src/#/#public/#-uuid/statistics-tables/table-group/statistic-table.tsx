import React, { memo, useCallback, useMemo, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

import { useStyles } from '../styles';
import CurrentUserBlock from './current-user-block';
import TableHead from './table-head';
import TableRow from './table-row';

interface IStatisticTableProps {
  members: any[];
  unit?: JSX.Element | string;
  unitTitle: string;
  userId: number;
  showUserAchievementIcon?: boolean;
  userAchievementTitle: string;
}

const USERS_TO_DISPLAY = 8;
type userBlockPosition = 'top' | 'bottom';

export const StatisticTable = memo(
  ({ members, showUserAchievementIcon, unit = '', unitTitle, userId, userAchievementTitle }: IStatisticTableProps) => {
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

    const { tableContainer, listWrap } = useStyles();

    const Row = ({ index, style }) => {
      const row = members[index];
      const isCurrentUser = currentUserIndex === index;
      return <TableRow member={row} isCurrentUser={isCurrentUser} style={style} index={index} unit={unit} />;
    };
    return (
      <div className={tableContainer}>
        <TableHead
          unitTitle={unitTitle}
          showUserAchievementIcon={showUserAchievementIcon}
          userAchievementTitle={userAchievementTitle}
        />
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
  }
);
