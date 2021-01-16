import React, { memo, useCallback, useMemo, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import DiamondIcon from '@components/@icons/Diamond';

import { millisecondsToHours } from '#/@store/@common/helpers';

import { useStyles } from './styles';
import { GroupFooter, GroupHeader, StatisticTable } from './table-group/';

import { IMember } from '@types';

interface ITimeTableMember {
  name: string;
  y: number;
  id?: number;
  timeSpent: number;
  totalPointsEarned: number;
}

interface IPointsTableMember {
  name: string;
  y: number;
  id?: number;
}

interface IStatisticsTablesProps {
  members: IMember[];
  userId: number;
}

const getPointsTableMembers = (usersList: IPointsTableMember[], totalUnitsValue: number) =>
  usersList
    .map(({ name, id, y = 0 }) => ({
      id,
      name,
      percentage: totalUnitsValue ? ((100 * y) / totalUnitsValue).toFixed(2) : 0,
      units: y,
    }))
    .sort((a, b) => b.units - a.units);

const getTimeTableMembers = (usersList: ITimeTableMember[]) =>
  usersList
    .map(({ name, id, y = 0, totalPointsEarned, timeSpent }) => ({
      id,
      name,
      percentage: timeSpent ? Math.floor((totalPointsEarned / timeSpent) * 100) || '<1' : '0',
      units: y,
    }))
    .sort((a, b) => b.units - a.units);

const calculateUnitsSum = (members: IPointsTableMember[]) =>
  members.reduce((acum: number, member: IPointsTableMember) => member.y + acum, 0);

export const StatisticTablesTsx = memo(({ members, userId }: IStatisticsTablesProps) => {
  const timeTableMembers = useMemo(() => {
    return members.map(el => ({
      id: el.member.id,
      name: el.member.userName,
      timeSpent: millisecondsToHours(el.timeSum) || 0,
      totalPointsEarned: el.valueSum || 0,
      y: millisecondsToHours(el.timeSum) || 0,
    }));
  }, [members]);

  const pointsTableMembers = useMemo(() => {
    return members.map(el => ({
      id: el.member.id,
      name: el.member.userName,
      y: el.valueSum || 0,
    }));
  }, [members]);

  const worthPointsSum = useMemo(() => {
    return calculateUnitsSum(pointsTableMembers);
  }, [pointsTableMembers]);

  const getTimeTable = useMemo(() => {
    return getTimeTableMembers(timeTableMembers);
  }, [timeTableMembers]);

  const getPointsTable = useMemo(() => {
    return getPointsTableMembers(pointsTableMembers, worthPointsSum);
  }, [pointsTableMembers, worthPointsSum]);

  const [filteredTimeTable, setFilteredTimeTable] = useState(getTimeTable);

  const [filteredPointsTable, setFilteredPointsTable] = useState(getPointsTable);

  const handleSearch = useCallback(
    (curMembers: any, setFilteredMembers) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      /*
         Механизм фильтрации работает следующим образом:
         1.на вход получаем всех пользователей и set-колбек
         2.при вводе мы фильтруем копию members ,которая как-раз и отображается в таблице
         3.Когда пользователь удаляет поисковую строку ,мы опять отображаем все данные 
         работает благодаря специфике строк ,любая строка включает в себе пустую ->  'b'.includes('')// true
         */
      setFilteredMembers(curMembers.filter(member => member.name.toLowerCase().includes(value.toLowerCase())));
    },
    []
  );
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <div className={classes.tableGroupWrap}>
        <GroupHeader headerTitle="СТАТИСТИКА ПО ВРЕМЕНИ" buttonTitle="Редактировать" buttonRoutePath={undefined} />
        <StatisticTable
          members={filteredTimeTable}
          unit="h"
          unitTitle="Время"
          userId={userId}
          showUserAchievementIcon
          userAchievementTitle="Продуктивность"
        />
        <GroupFooter members={filteredTimeTable} searchCallback={handleSearch(getTimeTable, setFilteredTimeTable)} />
      </div>

      <div className={classes.tableGroupWrap}>
        <GroupHeader headerTitle="СТАТИСТИКА ПО ЦЕННОСТИ" buttonTitle="Редактировать" buttonRoutePath={undefined} />
        <StatisticTable
          members={filteredPointsTable}
          unit={<DiamondIcon className={classes.diamondStyle} />}
          unitTitle="Ценность"
          userId={userId}
          userAchievementTitle="Доля"
        />
        <GroupFooter members={getTimeTable} searchCallback={handleSearch(getPointsTable, setFilteredPointsTable)} />
      </div>
    </Grid>
  );
});
