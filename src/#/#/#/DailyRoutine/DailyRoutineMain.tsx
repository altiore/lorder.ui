import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import { Button, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { ActivityTimeline } from '../ActivityTimeline';
import { useStyles } from './style';

interface DailyRoutineMainProps {
  hoursWorkedToday: string;
  currentTask: any;
  open: boolean;
  onClose: () => void;
}

const Transition = React.forwardRef(function TransitionInner(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BUTTONS = [
  {
    isActive: false,
    title: 'Месяц ',
  },
  {
    isActive: false,
    title: 'Неделя',
  },
  {
    isActive: false,
    title: 'Вчера',
  },
  {
    isActive: true,
    title: 'Сегодня',
  },
];

const DailyRoutineMain = ({ currentTask, hoursWorkedToday, onClose, open }: DailyRoutineMainProps) => {
  const {
    button,
    currentDate,
    currentTaskInfo,
    currentTaskInfoInner,
    dialogContentWrap,
    infoBlock,
    infoBlockInner,
  } = useStyles();
  return (
    <Dialog open={open} style={{ maxHeight: 400 }} fullScreen TransitionComponent={Transition} onClose={onClose}>
      <div className={dialogContentWrap}>
        <div>
          <h2 className={currentDate}>
            {moment()
              .locale('ru')
              .format('D MMMM YYYY')}
          </h2>
          <Grid container justify="space-around">
            <Grid item lg={4} md={4} container justify="space-around">
              {/* TODO: Придумать какие даты отображать в двух нижних параграфах
               *  ,склоняюсь ко дню рождению пользователя
               *  и дню рождения того кто разрешил писать комменты в jsx   */}
              <p className={infoBlock}>
                <span className={infoBlockInner}>Начало:</span>
                Чт 02.05.2019 1:00
              </p>
              <p className={infoBlock}>
                <span className={infoBlockInner}>Конец:</span>
                Чт 02.05.2019 3:20
              </p>
            </Grid>
            <Grid item lg={3} md={4} sm={12} container justify="center">
              <p className={infoBlock}>
                <span className={infoBlockInner}>Трудовая нагрузка за сегодня:</span>
                {hoursWorkedToday}
              </p>
            </Grid>
            <Grid item lg={4} md={4} container alignItems="center" justify="center" wrap="nowrap">
              {/*Добавить обработчик переключения активной кнопки */}
              {BUTTONS.map(({ title, isActive }) => (
                <Button key={title} className={button} color={isActive ? 'primary' : 'default'} variant="contained">
                  {title}
                </Button>
              ))}
            </Grid>
          </Grid>
          <hr />
          <h2 className={currentTaskInfo}>
            Текущая задача:
            <span className={currentTaskInfoInner}>{currentTask && currentTask.title}</span>
          </h2>
        </div>
        <ActivityTimeline fullSize={true} />
      </div>
    </Dialog>
  );
};

export default DailyRoutineMain;
