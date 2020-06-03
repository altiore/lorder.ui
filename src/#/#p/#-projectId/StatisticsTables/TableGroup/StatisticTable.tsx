import React, { memo } from 'react';

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
}

export const StatisticTable = memo(({ members, unit = '' }: IStatisticTableProps) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.tableWrap} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="left">Имя участника</TableCell>
            <TableCell align="right">Время</TableCell>
            <TableCell align="right">Доля</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((row, i) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <b>{i + 1}.</b>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">
                {row.units} {unit}
              </TableCell>
              <TableCell align="right">{row.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
