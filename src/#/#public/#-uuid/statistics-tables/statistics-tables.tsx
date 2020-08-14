import React, { memo, useCallback, useMemo, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';
import { GroupFooter, GroupHeader, StatisticTable } from './table-group/';

interface IMember {
  name: string;
  y: number;
  id?: number;
}

interface IStatisticsTablesProps {
  timeStatistic: IMember[];
  worthPoints: IMember[];
  userId: number;
}

const getMembersToDisplay = (usersList: IMember[], totalUnitsValue: number) =>
  usersList
    .map(({ name, id, y = 0 }) => {
      return {
        id,
        name,
        percentage: ((100 * y) / totalUnitsValue).toFixed(2),
        units: y,
      };
    })
    .sort((a, b) => b.units - a.units);

const calculateUnitsSum = (members: IMember[]) => {
  return members.reduce((acum: number, member: IMember) => member.y + acum, 0);
};

export const StatisticTablesTsx = memo(({ timeStatistic, worthPoints, userId }: IStatisticsTablesProps) => {
  const timePointsSum = useMemo(() => {
    return calculateUnitsSum(timeStatistic);
  }, [timeStatistic]);

  const worthPointsSum = useMemo(() => {
    return calculateUnitsSum(worthPoints);
  }, [worthPoints]);

  const membersForTimeTable = useMemo(() => {
    return getMembersToDisplay(timeStatistic, timePointsSum);
  }, [timeStatistic, timePointsSum]);

  const membersForPointsTable = useMemo(() => {
    return getMembersToDisplay(worthPoints, worthPointsSum);
  }, [worthPoints, worthPointsSum]);

  const [filteredTimeTableMembers, setfilteredTimeTableMembers] = useState(membersForTimeTable);

  const [filteredPointsTableMembers, setfilteredPointsTableMembers] = useState(membersForPointsTable);

  const handleTimeTableMembers = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setfilteredTimeTableMembers(membersForTimeTable.filter(member => member.name.includes(value)));
    },
    [membersForTimeTable]
  );

  const handlePointsTableMembers = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setfilteredPointsTableMembers(membersForPointsTable.filter(member => member.name.includes(value)));
    },
    [membersForPointsTable]
  );

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <div className={classes.tableGroupWrap}>
        <GroupHeader headerTitle="СТАТИСТИКА ПО ВРЕМЕНИ" buttonTitle="Редактировать" buttonRoutePath="/" />
        <StatisticTable members={filteredTimeTableMembers} unit="h" unitTitle="Время" userId={userId} />
        <GroupFooter members={filteredTimeTableMembers} searchCallback={handleTimeTableMembers} />
      </div>

      <div className={classes.tableGroupWrap}>
        <GroupHeader headerTitle="СТАТИСТИКА ПО ЦЕННОСТИ" buttonTitle="Редактировать" buttonRoutePath="/" />
        <StatisticTable members={filteredPointsTableMembers} unitTitle="Ценность" userId={userId} />
        <GroupFooter members={membersForTimeTable} searchCallback={handlePointsTableMembers} />
      </div>
    </Grid>
  );
});
