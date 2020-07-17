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
  userId: number;
}

export const StatisticTable = memo(({ members, unit = '', unitTitle, userId }: IStatisticTableProps) => {
  const {
    currentUserCell,
    tableContainer,
    tableWrap,
    tableCell,
    noBorder,
    light,
    bold,
    tableRow,
    tableCellInHeader,
  } = useStyles();
  const tableHeadCells = classNames(tableCell, noBorder, light, tableCellInHeader);

  return (
    <TableContainer className={tableContainer}>
      <Table className={tableWrap} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow className={tableRow}>
            <TableCell className={tableHeadCells}>№</TableCell>
            <TableCell align="left" className={tableHeadCells}>
              Имя участника
            </TableCell>
            <TableCell align="right" className={tableHeadCells}>
              {unitTitle}
            </TableCell>
            <TableCell align="right" className={tableHeadCells}>
              Доля
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((row, i) => {
            const isCurrentUser = row.id === userId;
            return (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classNames({
                    [tableCell]: true,
                    [light]: true,
                    [currentUserCell]: isCurrentUser,
                  })}
                >
                  <b>{i + 1}.</b>
                </TableCell>
                <TableCell
                  align="left"
                  className={classNames({
                    [tableCell]: true,
                    [currentUserCell]: isCurrentUser,
                    [light]: !isCurrentUser,
                    [bold]: isCurrentUser,
                  })}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  className={classNames({
                    [tableCell]: true,
                    [bold]: true,
                    [currentUserCell]: isCurrentUser,
                  })}
                >
                  {row.units} {unit}
                </TableCell>
                <TableCell
                  align="right"
                  className={classNames({
                    [tableCell]: true,
                    [bold]: true,
                    [currentUserCell]: isCurrentUser,
                  })}
                >
                  {row.percentage}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
