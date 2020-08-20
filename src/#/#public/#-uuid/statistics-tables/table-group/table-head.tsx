import React from 'react';

import classNames from 'classnames';

import Tooltip from '@material-ui/core/Tooltip';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { useStyles } from '../styles';

const TableHead: React.FC<{
  unitTitle: string;
  showUserAchievementIcon?: boolean;
  userAchievementTitle: string;
}> = ({ showUserAchievementIcon, unitTitle, userAchievementTitle }) => {
  const { tableCell, light, tableRow, tableCellInHeader, trendingIcon } = useStyles();
  const tableHeadCells = classNames(tableCell, light, tableCellInHeader);
  // TODO: Переписать чтобы не было стыдно.Убрать лишний css.
  // Заменить хардкод icon/tooltip только если таблица будет переиспользована где-то еще
  return (
    <div className={tableRow}>
      <div className={tableHeadCells} style={{ width: '10%' }}>
        №
      </div>
      <div className={`${tableHeadCells}`} style={{ width: '70%' }}>
        Имя участника
      </div>
      <div className={tableHeadCells}>{unitTitle}</div>
      <div className={tableHeadCells}>
        {showUserAchievementIcon ? (
          <Tooltip title={userAchievementTitle} placement="top">
            <TrendingUpIcon className={trendingIcon} />
          </Tooltip>
        ) : (
          userAchievementTitle
        )}
      </div>
    </div>
  );
};

export default TableHead;
