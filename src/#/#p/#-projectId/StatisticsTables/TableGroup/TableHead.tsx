import React from 'react';

import classNames from 'classnames';

import { useStyles } from '../styles';

const TableHead: React.FC<{ unitTitle: string }> = ({ unitTitle }) => {
  const { tableCell, noBorder, light, tableRow, tableCellInHeader } = useStyles();

  const tableHeadCells = classNames(tableCell, noBorder, light, tableCellInHeader);
  return (
    <div className={tableRow}>
      <div className={tableHeadCells} style={{ width: '10%' }}>
        №
      </div>
      <div className={`${tableHeadCells}`} style={{ width: '70%' }}>
        Имя участника
      </div>
      <div className={tableHeadCells}>{unitTitle}</div>
      <div className={tableHeadCells}>Доля</div>
    </div>
  );
};

export default TableHead;
