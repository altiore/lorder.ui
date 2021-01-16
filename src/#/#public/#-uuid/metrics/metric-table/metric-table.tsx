import React, { useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DiamondIcon from '@components/@icons/Diamond';

import { IProjectMetric } from '@types';

const valueFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'decimal',
});

const percentFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'percent',
});

const DAYS_IN_MONTH = 30.4375;

export const MetricTableTsx: React.FC<IProjectMetric & { title: string }> = ({
  count,
  days,
  membersCount,
  timeSumIn8hoursDays,
  title,
  value,
}) => {
  const timeProductivity = useMemo(() => {
    if (!membersCount || !days || !timeSumIn8hoursDays) {
      return 0;
    }

    return percentFormatter.format(Math.round((timeSumIn8hoursDays * 100) / membersCount / days) / 100);
  }, [days, membersCount, timeSumIn8hoursDays]);

  const valueProductivity = useMemo(() => {
    if (!days || !value) {
      return 0;
    }

    return valueFormatter.format((Math.round((value * 100) / days) * DAYS_IN_MONTH) / 100);
  }, [days, value]);

  const addedValue = useMemo(() => {
    return valueFormatter.format(value);
  }, [value]);

  const { tableStyle, valueStyle } = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={tableStyle} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Активных пользователей
            </TableCell>
            <TableCell align="right">{membersCount}</TableCell>
          </TableRow>
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
            <TableCell align="right">{timeProductivity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Продуктивность
            </TableCell>
            <TableCell align="right">
              &asymp; {valueProductivity} <DiamondIcon className={valueStyle} /> / мес
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Добавленная Ценность
            </TableCell>
            <TableCell align="right">
              &asymp; {addedValue} <DiamondIcon className={valueStyle} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles({
  tableStyle: {
    width: '100%',
  },
  valueStyle: {
    fontSize: 11,
  },
});
