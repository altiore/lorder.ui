import React, { useCallback, useState } from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import { Button, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { ActivityTimeline } from '../activity-time-line';
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
    id: 1,
    isActive: false,
    title: 'Месяц',
  },
  {
    id: 2,
    isActive: false,
    title: 'Неделю',
  },
  {
    id: 3,
    isActive: false,
    title: 'Вчера',
  },
  {
    id: 4,
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

  const [activeIndex, setActiveIndex] = useState(3);
  const handleClick = useCallback(
    (clickedBtnInd: number) => () => {
      BUTTONS[activeIndex].isActive = false;
      setActiveIndex(clickedBtnInd);
      BUTTONS[clickedBtnInd].isActive = true;
    },
    [activeIndex]
  );
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
            <Grid item lg={6} md={4} sm={12} container justify="center">
              <p className={infoBlock}>
                <span className={infoBlockInner}>Времени затрачено за {BUTTONS[activeIndex].title.toLowerCase()}:</span>
                {hoursWorkedToday}
              </p>
            </Grid>
            <Grid item lg={6} md={4} container alignItems="center" justify="center" wrap="nowrap" direction="column">
              <p className={infoBlockInner}>Просмотр трудовой нагрузки за:</p>
              <div>
                {BUTTONS.map(({ title, isActive }, i) => (
                  <Button
                    key={title}
                    className={button}
                    color={isActive ? 'primary' : 'default'}
                    variant="contained"
                    onClick={handleClick(i)}
                  >
                    {title}
                  </Button>
                ))}
              </div>
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
