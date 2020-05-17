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
  firstLine: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    height: theme.spacing(6),
    padding: theme.spacing(0, 2),
  },
  freeSpace: {
    height: theme.spacing(2),
  },
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: 0,
    width: '100%',
  },
  secondLine: {
    alignItems: 'center',
    backgroundColor: theme.palette.default.light,
    color: theme.palette.secondary.light,
    display: 'flex',
    flexFlow: 'row nowrap',
    height: theme.spacing(4),
    padding: theme.spacing(0, 2),
    width: '100%',
  },
  todayStyle: {
    alignItems: 'center',
    display: 'flex',
    height: theme.spacing(6),
    textTransform: 'uppercase',
    width: theme.spacing(10),
  },
  totalStyle: {
    alignItems: 'center',
    display: 'flex',
    height: theme.spacing(6),
  },
}));

export const TodayTsx: React.FC<IToday> = ({ total, todayUserWorks = [] }): JSX.Element => {
  const { firstLine, freeSpace, root, secondLine, todayStyle, totalStyle } = useStyles();

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
      return '[нет начатых задач]';
    }

    return differentTasksCount + ' ' + differentProjectsCount;
  }, [differentProjectsCount, differentTasksCount]);

  return (
    <div className={root}>
      <div className={firstLine}>
        <Typography className={todayStyle}>Сегодня:&nbsp;</Typography>
        <Typography className={totalStyle} variant="h5">
          {total}
        </Typography>
      </div>
      <div className={secondLine}>
        <div className={todayStyle} />
        <Typography variant="h6">{text}</Typography>
      </div>
      <div className={freeSpace} />
    </div>
  );
};
