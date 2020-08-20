import React, { memo, useCallback, useMemo, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';
import { GroupFooter, GroupHeader, StatisticTable } from './table-group/';

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
  timeTableMembers: ITimeTableMember[];
  pointsTableMembers: IPointsTableMember[];
  userId: number;
}

const getPointsTableMembers = (usersList: IPointsTableMember[], totalUnitsValue: number) =>
  usersList
    .map(({ name, id, y = 0 }) => ({
      id,
      name,
      percentage: ((100 * y) / totalUnitsValue).toFixed(2),
      units: y,
    }))
    .sort((a, b) => b.units - a.units);

const getTimeTableMembers = (usersList: ITimeTableMember[]) =>
  usersList
    .map(({ name, id, y = 0, totalPointsEarned, timeSpent }) => ({
      id,
      name,
      percentage: Math.floor((totalPointsEarned / timeSpent) * 100) || '<1',
      units: y,
    }))
    .sort((a, b) => b.units - a.units);

const calculateUnitsSum = (members: IPointsTableMember[]) =>
  members.reduce((acum: number, member: IPointsTableMember) => member.y + acum, 0);

export const StatisticTablesTsx = memo(({ timeTableMembers, pointsTableMembers, userId }: IStatisticsTablesProps) => {
  const worthPointsSum = useMemo(() => {
    return calculateUnitsSum(pointsTableMembers);
  }, [pointsTableMembers]);

  const getTimeTable = useMemo(() => {
    return getTimeTableMembers(timeTableMembers);
  }, [timeTableMembers]);

  const getPointsTable = useMemo(() => {
    return getPointsTableMembers(pointsTableMembers, worthPointsSum);
  }, [pointsTableMembers, worthPointsSum]);

  const [filteredTimeTable, setfilteredTimeTable] = useState(getTimeTable);

  const [filteredPointsTable, setfilteredPointsTable] = useState(getPointsTable);

  const handleSearch = useCallback(
    (members: any, setFilteredMembers) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      /*
         Механизм фильтрации работает следующим образом:
         1.на вход получаем всех пользователей и set-колбек
         2.при вводе мы фильтруем копию members ,которая как-раз и отображается в таблице
         3.Когда пользователь удаляет поисковую строку ,мы опять отображаем все данные 
         работает благодаря специфике строк ,любая строка включает в себе пустую ->  'b'.includes('')// true
         */
      setFilteredMembers(members.filter(member => member.name.toLowerCase().includes(value.toLowerCase())));
    },
    []
  );
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <div className={classes.tableGroupWrap}>
        <GroupHeader headerTitle="СТАТИСТИКА ПО ВРЕМЕНИ" buttonTitle="Редактировать" buttonRoutePath="/" />
        <StatisticTable
          members={filteredTimeTable}
          unit="h"
          unitTitle="Время"
          userId={userId}
          showUserAchievementIcon
          userAchievementTitle="Продуктивность"
        />
        <GroupFooter members={filteredTimeTable} searchCallback={handleSearch(getTimeTable, setfilteredTimeTable)} />
      </div>

      <div className={classes.tableGroupWrap}>
        <GroupHeader headerTitle="СТАТИСТИКА ПО ЦЕННОСТИ" buttonTitle="Редактировать" buttonRoutePath="/" />
        <StatisticTable
          members={filteredPointsTable}
          unitTitle="Ценность"
          userId={userId}
          userAchievementTitle="Доля"
        />
        <GroupFooter members={getTimeTable} searchCallback={handleSearch(getPointsTable, setfilteredPointsTable)} />
      </div>
    </Grid>
  );
});
