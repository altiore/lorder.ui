import React, { useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { IProjectMetric } from '@types';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

export const MetricTableTsx: React.FC<IProjectMetric & { title: string }> = ({
  count,
  days,
  membersCount,
  timeSumIn8hoursDays,
  title,
  value,
}) => {
  const classes = useStyles();

  const timeProductivity = useMemo(() => {
    if (!membersCount || !days || !timeSumIn8hoursDays) {
      return 0;
    }

    return Math.round((timeSumIn8hoursDays * 100) / membersCount / days) / 100;
  }, [days, membersCount, timeSumIn8hoursDays]);

  const valueProductivity = useMemo(() => {
    if (!membersCount || !days || !value) {
      return 0;
    }

    return Math.round((value * 100) / days) / 100;
  }, [days, value]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Задач выполнено
            </TableCell>
            <TableCell align="right">{count}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Загруженность
            </TableCell>
            <TableCell align="right">{timeProductivity} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Продуктивность
            </TableCell>
            <TableCell align="right">{valueProductivity} sp/day</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Ценность
            </TableCell>
            <TableCell align="right">{value * 45} $</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
