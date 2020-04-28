import React, { useMemo } from 'react';

import uniqBy from 'lodash/uniqBy';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IUserWork } from '@types';
import { pluralRu } from '@utils/plural-ru';

interface IToday {
  total: string;
  todayUserWorks?: IUserWork[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    padding: theme.spacing(0, 1),
  },
}));

export const TodayTsx: React.FC<IToday> = ({ total, todayUserWorks = [] }): JSX.Element => {
  const { root } = useStyles();

  const differentTasksCount: string = useMemo(() => {
    const count = uniqBy(todayUserWorks, el => el.taskId).length;
    return pluralRu(count, '%d задач', '%d задача', '%d задачи', '%d задач');
  }, [todayUserWorks]);

  const differentProjectsCount: string = useMemo(() => {
    const count = uniqBy(todayUserWorks, el => el.projectId).length;
    return pluralRu(count, 'в %d проектов', 'в %d-ом проекте', 'в %d-х проектах', 'в %d-ти проектах');
  }, [todayUserWorks]);

  const text: string = useMemo(() => {
    if (differentProjectsCount === 'в 0 проектов') {
      return '[не задач сегодня]';
    }

    return differentTasksCount + ' ' + differentProjectsCount;
  }, [differentProjectsCount, differentTasksCount]);

  return (
    <div className={root}>
      <span>Сегодня:&nbsp;</span>
      <div>
        <Typography variant="h5">{total}</Typography>
        <Typography variant="subtitle2">({text})</Typography>
      </div>
    </div>
  );
};
