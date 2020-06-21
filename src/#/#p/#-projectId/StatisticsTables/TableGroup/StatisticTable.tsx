import React, { memo } from 'react';

import classNames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from '../styles';

interface IStatisticTableProps {
  members: any[];
  unit?: string;
  unitTitle: string;
}

export const StatisticTable = memo(({ members, unit = '', unitTitle }: IStatisticTableProps) => {
  const { tableContainer, tableWrap, tableCell, noBorder, light, bold, tableRow } = useStyles();
  return (
    <TableContainer className={tableContainer}>
      <Table className={tableWrap} aria-label="simple table">
        <TableHead>
          <TableRow className={tableRow}>
            <TableCell className={classNames(tableCell, noBorder, light)}>№</TableCell>
            <TableCell align="left" className={classNames(tableCell, noBorder, light)}>
              Имя участника
            </TableCell>
            <TableCell align="right" className={classNames(tableCell, noBorder, light)}>
              {unitTitle}
            </TableCell>
            <TableCell align="right" className={classNames(tableCell, noBorder, light)}>
              Доля
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((row, i) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" className={classNames(tableCell, light)}>
                <b>{i + 1}.</b>
              </TableCell>
              <TableCell align="left" className={classNames(tableCell, light)}>
                {row.name}
              </TableCell>
              <TableCell align="right" className={classNames(tableCell, bold)}>
                {row.units} {unit}
              </TableCell>
              <TableCell align="right" className={classNames(tableCell, bold)}>
                {row.percentage}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
